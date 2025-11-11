import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './MediaPlayer.module.css';

// Import and initialize i18n
import './i18n';

// Declare shaka-player types since they're not properly exported
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    shaka: any;
  }
}

export type SourceKind = 'dash' | 'hls' | 'mp4';

export interface MediaSourceConfig {
  url: string;
  kind: SourceKind;
}

export interface LicenseCfg {
  licenseUrl: string;
  headers?: Record<string, string>;
}

export interface FairplayCfg extends LicenseCfg {
  certificateUrl: string;
}

export interface DrmConfig {
  widevine?: LicenseCfg;
  playready?: LicenseCfg;
  fairplay?: FairplayCfg;
}

export interface StreamingStats {
  bitrateKbps?: number;
  estimatedKbps?: number;
  bufferingSec?: number;
  playSec?: number;
  pauseSec?: number;
  decodedFrames?: number;
  droppedFrames?: number;
  corruptedFrames?: number;
  bytesDownloaded?: number;
  lastLoadLatencyMs?: number;
  width?: number;
  height?: number;
}

export interface MediaPlayerProps {
  source: MediaSourceConfig;
  drm?: DrmConfig;
  autoplay?: boolean;
  muted?: boolean;
  poster?: string;
  preload?: 'none' | 'metadata' | 'auto';
  playsInline?: boolean;
  startTime?: number;
  controls?: 'shaka' | 'native';
  theme?: 'light' | 'dark' | 'auto';
  debug?: boolean;
  onReady?: () => void;
  onPlaybackError?: (error: unknown) => void;
  onPlaybackEnded?: () => void;
  onTimeUpdate?: (currentTime: number) => void;
}

export interface MediaPlayerRef {
  play(): void;
  pause(): void;
  seek(seconds: number): void;
  setMuted(muted: boolean): void;
  setVolume(volume: number): void;
  togglePlay(): void;
  skip(deltaSeconds: number): void;
  setPlaybackRate(rate: number): void;
  getPlaybackRate(): number;

  getIsReady(): boolean;
  getIsPlaying(): boolean;
  getIsLive(): boolean;
  getCurrentTime(): number;
  getDuration(): number;
}

export const MediaPlayer = React.forwardRef<MediaPlayerRef, MediaPlayerProps>(({
  source,
  drm,
  autoplay = false,
  muted = false,
  poster,
  preload = 'metadata',
  playsInline = true,
  startTime,
  controls = 'native',
  theme = 'auto',
  debug = false,
  onReady,
  onPlaybackError,
  onPlaybackEnded,
  onTimeUpdate,
}, ref) => {
  const { t } = useTranslation();

  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>(null); // Shaka Player instance
  const statsTimerRef = useRef<NodeJS.Timeout | null>(null);

  // State
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLive, setIsLive] = useState(false);
  const [streamingStats, setStreamingStats] = useState<StreamingStats | undefined>();

  // Start collecting streaming statistics
  const startStatsCollection = useCallback((player: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    if (statsTimerRef.current) {
      clearInterval(statsTimerRef.current);
    }

    statsTimerRef.current = setInterval(() => {
      try {
        const stats = player.getStats?.();
        if (stats) {
          const bitrateKbps = stats.streamBandwidth
            ? Math.round(stats.streamBandwidth / 1000)
            : undefined;
          const estimatedKbps = stats.estimatedBandwidth
            ? Math.round(stats.estimatedBandwidth / 1000)
            : undefined;

          setStreamingStats({
            bitrateKbps,
            estimatedKbps,
            bufferingSec: stats.bufferingTime,
            playSec: stats.playTime,
            pauseSec: stats.pauseTime,
            decodedFrames: stats.decodedFrames,
            droppedFrames: stats.droppedFrames,
            corruptedFrames: stats.corruptedFrames,
            bytesDownloaded: stats.bytesDownloaded || stats.totalBytes,
            lastLoadLatencyMs: stats.loadLatency,
            width: stats.width,
            height: stats.height,
          });
        }
      } catch {
        setStreamingStats(undefined);
      }
    }, 1000);
  }, []);

  // Initialize Shaka Player for streaming
  const initializeShakaPlayer = useCallback(async (
    video: HTMLVideoElement,
    src: MediaSourceConfig,
    drmConfig?: DrmConfig
  ) => {
    // Dynamic import for Shaka Player
    let shakaPlayer: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    try {
      shakaPlayer = await import('shaka-player');
    } catch (e) {
      console.error('Shaka Player not available:', e);
      onPlaybackError?.(new Error('Shaka Player not available. Ensure shaka-player is installed.'));
      return;
    }

    try {
      // Install polyfills
      shakaPlayer.polyfill?.installAll?.();

      const useUi = controls === 'shaka';
      const player = new shakaPlayer.Player();

      // Clean up previous player
      if (playerRef.current) {
        await playerRef.current.destroy();
      }

      await player.attach(video);
      playerRef.current = player;

      // Configure UI if needed
      if (useUi && shakaPlayer.ui && shakaPlayer.ui.Overlay) {
        const container = video.parentElement as HTMLElement;
        new shakaPlayer.ui.Overlay(player, container, video);
      }

      // Configure DRM
      if (drmConfig) {
        const cfg: any = { drm: { servers: {} } }; // eslint-disable-line @typescript-eslint/no-explicit-any

        if (drmConfig.widevine) {
          cfg.drm.servers['com.widevine.alpha'] = drmConfig.widevine.licenseUrl;
        }
        if (drmConfig.playready) {
          cfg.drm.servers['com.microsoft.playready'] = drmConfig.playready.licenseUrl;
        }
        if (drmConfig.fairplay) {
          cfg.drm.servers['com.apple.fps.1_0'] = drmConfig.fairplay.licenseUrl;
          cfg.drm.advanced = {
            'com.apple.fps.1_0': {
              serverCertificateUri: drmConfig.fairplay.certificateUrl,
            },
          };
        }

        player.configure(cfg);
      }

      // Error handling
      player.addEventListener('error', (evt: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
        console.error('Shaka error', evt?.detail || evt);
        onPlaybackError?.(evt?.detail || evt);
      });

      // Load media
      await player.load(src.url);

      // Set live status
      try {
        const live = player.isLive?.() ?? false;
        setIsLive(!!live);
      } catch {
        setIsLive(false);
      }

      setIsReady(true);
      onReady?.();

      // Start stats collection if debug enabled
      if (debug) {
        startStatsCollection(player);
      }

    } catch (e) {
      console.error('Shaka Player initialization failed:', e);
      onPlaybackError?.(e);
    }
  }, [controls, onPlaybackError, onReady, debug, startStatsCollection]);

  // Initialize video element
  const initializeVideo = useCallback(async (video: HTMLVideoElement) => {
    video.autoplay = autoplay;
    video.muted = muted;
    video.preload = preload;
    video.crossOrigin = 'anonymous';

    if (playsInline) {
      video.playsInline = true;
    }

    if (poster) {
      video.setAttribute('poster', poster);
    }

    // Attach native events
    video.onended = () => onPlaybackEnded?.();
    video.ontimeupdate = () => {
      const time = video.currentTime;
      setCurrentTime(time);
      setDuration(video.duration || 0);
      onTimeUpdate?.(time);
    };
    video.onplay = () => setIsPlaying(true);
    video.onpause = () => setIsPlaying(false);

    const src = source;
    if (src.kind === 'mp4') {
      video.src = src.url;
      // Skip autoplay in test environments
      if (process.env.NODE_ENV !== 'test') {
        try {
          await video.play().catch(() => undefined); // Ignore autoplay failures
        } catch {
          // Ignore autoplay failures in production
        }
      }
      setIsReady(true);
      onReady?.();
      return;
    }

    // Handle HLS/DASH with Shaka Player
    await initializeShakaPlayer(video, src, drm);
  }, [source, drm, autoplay, muted, preload, playsInline, poster, onReady, onPlaybackEnded, onTimeUpdate, initializeShakaPlayer]);

  // Initialize on mount and when source changes
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !source) return;

    initializeVideo(video);

    return () => {
      // Cleanup
      if (statsTimerRef.current) {
        clearInterval(statsTimerRef.current);
      }
      if (playerRef.current) {
        playerRef.current.destroy?.();
      }
    };
  }, [source, initializeVideo]);

  // Handle theme changes
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const container = video.parentElement;
    if (container) {
      container.classList.remove('theme-light', 'theme-dark', 'theme-auto');
      container.classList.add(`theme-${theme}`);
    }
  }, [theme]);

  // Media controls API
  const play = useCallback(() => {
    videoRef.current?.play();
  }, []);

  const pause = useCallback(() => {
    videoRef.current?.pause();
  }, []);

  const seek = useCallback((seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
    }
  }, []);

  const setMuted = useCallback((muted: boolean) => {
    if (videoRef.current) {
      videoRef.current.muted = muted;
    }
  }, []);

  const setVolume = useCallback((volume: number) => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
  }, []);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }, []);

  const skip = useCallback((deltaSeconds: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = Math.max(0, video.currentTime + deltaSeconds);
  }, []);

  const setPlaybackRate = useCallback((rate: number) => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = rate;
    }
  }, []);

  const getPlaybackRate = useCallback(() => {
    return videoRef.current?.playbackRate ?? 1;
  }, []);

  // Expose API via ref
  React.useImperativeHandle(ref, () => ({
    play,
    pause,
    seek,
    setMuted,
    setVolume,
    togglePlay,
    skip,
    setPlaybackRate,
    getPlaybackRate,
    // State getters
    getIsReady: () => isReady,
    getIsPlaying: () => isPlaying,
    getIsLive: () => isLive,
    getCurrentTime: () => currentTime,
    getDuration: () => duration,
  }), [play, pause, seek, setMuted, setVolume, togglePlay, skip, setPlaybackRate, getPlaybackRate, isReady, isPlaying, isLive, currentTime, duration]);

  // Memoized debug overlay
  const debugOverlay = useMemo(() => {
    if (!debug) return null;

    return (
      <div className={styles['debug-overlay']}>
        <div>URL: {source.url}</div>
        <div>Kind: {source.kind}</div>
        <div>Time: {Math.floor(currentTime)} / {Math.floor(duration)}</div>
        {streamingStats && (
          <>
            <div>Bitrate: {streamingStats.bitrateKbps ?? '-'} kbps (est: {streamingStats.estimatedKbps ?? '-'} kbps)</div>
            <div>Buffering: {streamingStats.bufferingSec?.toFixed(1) ?? 0}s Play: {streamingStats.playSec?.toFixed(1) ?? 0}s Pause: {streamingStats.pauseSec?.toFixed(1) ?? 0}s</div>
            <div>Frames: D={streamingStats.decodedFrames ?? '-'} / drop={streamingStats.droppedFrames ?? '-'} / bad={streamingStats.corruptedFrames ?? '-'}</div>
            <div>Net: {streamingStats.bytesDownloaded ?? 0} B last RTT: {streamingStats.lastLoadLatencyMs ?? '-'} ms</div>
            <div>Res: {streamingStats.width ?? '-'}x{streamingStats.height ?? '-'}</div>
          </>
        )}
        {isLive && <div className={styles['live-indicator']}>{t('mediaPlayer.live')}</div>}
      </div>
    );
  }, [debug, streamingStats, source, currentTime, duration, isLive, t]);

  return (
    <div className={`${styles['container']} theme-${theme}`}>
      <video
        ref={videoRef}
        className={styles['video']}
        controls={controls === 'native'}
        aria-label={t('mediaPlayer.loading')}
        role="application"
        aria-live="polite"
      />
      {/* Screen reader announcements */}
      <div className={styles['sr-only']} aria-live="assertive" aria-atomic="true">
        {isReady ? t('mediaPlayer.loading') : t('mediaPlayer.error')}
        {isLive && ` ${t('mediaPlayer.live')}`}
      </div>
      {debugOverlay}
    </div>
  );
});

export default MediaPlayer;
