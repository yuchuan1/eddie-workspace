import { default as React } from 'react';
declare global {
    interface Window {
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
export declare const MediaPlayer: React.ForwardRefExoticComponent<MediaPlayerProps & React.RefAttributes<MediaPlayerRef>>;
export default MediaPlayer;
