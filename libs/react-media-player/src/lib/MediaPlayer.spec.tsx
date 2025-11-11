import { render } from '@testing-library/react';
import { vi } from 'vitest';
import '@testing-library/jest-dom';

import MediaPlayer, { MediaPlayerRef } from './MediaPlayer';

// Mock shaka-player to prevent import errors in tests
vi.mock('shaka-player', () => ({
  default: {
    polyfill: {
      installAll: vi.fn(),
    },
    Player: vi.fn().mockImplementation(() => ({
      attach: vi.fn().mockResolvedValue(undefined),
      destroy: vi.fn().mockResolvedValue(undefined),
      configure: vi.fn(),
      addEventListener: vi.fn(),
      load: vi.fn().mockResolvedValue(undefined),
      isLive: vi.fn().mockReturnValue(false),
      getStats: vi.fn().mockReturnValue({
        streamBandwidth: 1000000,
        estimatedBandwidth: 2000000,
        bufferingTime: 0,
        playTime: 0,
        pauseTime: 0,
        decodedFrames: 100,
        droppedFrames: 0,
        corruptedFrames: 0,
        bytesDownloaded: 1000000,
        loadLatency: 100,
        width: 1920,
        height: 1080,
      }),
    })),
    ui: {
      Overlay: vi.fn(),
    },
  },
}));

// Mock HTMLVideoElement methods for testing
Object.defineProperty(HTMLVideoElement.prototype, 'play', {
  writable: true,
  value: vi.fn().mockResolvedValue(undefined),
});

Object.defineProperty(HTMLVideoElement.prototype, 'pause', {
  writable: true,
  value: vi.fn(),
});

Object.defineProperty(HTMLVideoElement.prototype, 'addEventListener', {
  writable: true,
  value: vi.fn(),
});

Object.defineProperty(HTMLVideoElement.prototype, 'removeEventListener', {
  writable: true,
  value: vi.fn(),
});

describe('MediaPlayer', () => {
  const defaultSource = { url: 'https://example.com/test.mp4', kind: 'mp4' as const };

  it('should render successfully', () => {
    const { baseElement } = render(<MediaPlayer source={defaultSource} />);
    expect(baseElement).toBeTruthy();
  });

  it('should render video element', () => {
    const { container } = render(<MediaPlayer source={defaultSource} />);
    const video = container.querySelector('video');
    expect(video).toBeTruthy();
  });

  it('should render video element with native controls when specified', () => {
    const { container } = render(<MediaPlayer source={defaultSource} controls="native" />);
    const video = container.querySelector('video');
    expect(video).toHaveAttribute('controls');
  });

  it('should not render video element with controls when shaka controls specified', () => {
    const { container } = render(<MediaPlayer source={defaultSource} controls="shaka" />);
    const video = container.querySelector('video');
    expect(video).not.toHaveAttribute('controls');
  });

  it('should apply theme classes', () => {
    const { container } = render(<MediaPlayer source={defaultSource} theme="dark" />);
    expect(container.firstChild).toHaveClass('theme-dark');
  });

  it('should handle different source kinds', () => {
    // Test HLS source
    const { container: hlsContainer, rerender: hlsRerender } = render(
      <MediaPlayer source={{ url: 'https://example.com/test.m3u8', kind: 'hls' }} />
    );
    expect(hlsContainer.querySelector('video')).toBeTruthy();

    // Test DASH source
    hlsRerender(<MediaPlayer source={{ url: 'https://example.com/test.mpd', kind: 'dash' }} />);
    expect(hlsContainer.querySelector('video')).toBeTruthy();
  });

  it('should handle error callbacks', () => {
    const onError = vi.fn();
    const onReady = vi.fn();

    render(
      <MediaPlayer
        source={defaultSource}
        onPlaybackError={onError}
        onReady={onReady}
      />
    );

    // For MP4 sources, onReady is called during initialization
    // onError should not be called during normal rendering
    expect(onError).not.toHaveBeenCalled();
    // onReady may be called during component initialization for MP4
  });

  it('should handle autoplay and muted props', () => {
    const { container } = render(
      <MediaPlayer source={defaultSource} autoplay={true} muted={true} />
    );
    const video = container.querySelector('video');
    expect(video).toBeTruthy();
    // Note: autoplay and muted are handled in useEffect, so we verify rendering
  });

  it('should handle theme variations', () => {
    const { container: lightContainer, rerender } = render(
      <MediaPlayer source={defaultSource} theme="light" />
    );
    expect(lightContainer.firstChild).toHaveClass('theme-light');

    rerender(<MediaPlayer source={defaultSource} theme="auto" />);
    expect(lightContainer.firstChild).toHaveClass('theme-auto');
  });

  it('should expose imperative API via ref', () => {
    const ref = { current: null as MediaPlayerRef | null };
    render(<MediaPlayer ref={ref} source={defaultSource} />);

    expect(ref.current).toBeTruthy();
    expect(typeof ref.current?.play).toBe('function');
    expect(typeof ref.current?.pause).toBe('function');
    expect(typeof ref.current?.seek).toBe('function');
    expect(typeof ref.current?.setMuted).toBe('function');
    expect(typeof ref.current?.setVolume).toBe('function');
    expect(typeof ref.current?.togglePlay).toBe('function');
    expect(typeof ref.current?.getIsReady).toBe('function');
    expect(typeof ref.current?.getIsPlaying).toBe('function');
    expect(typeof ref.current?.getCurrentTime).toBe('function');
    expect(typeof ref.current?.getDuration).toBe('function');
  });

  it('should handle accessibility attributes', () => {
    const { container } = render(<MediaPlayer source={defaultSource} />);
    const video = container.querySelector('video');

    expect(video).toHaveAttribute('role', 'application');
    expect(video).toHaveAttribute('aria-live', 'polite');
  });

  it('should render screen reader announcements', () => {
    const { container } = render(<MediaPlayer source={defaultSource} />);
    const srOnly = container.querySelector('[aria-live="assertive"]');

    expect(srOnly).toBeTruthy();
    expect(srOnly).toHaveAttribute('aria-atomic', 'true');
  });
});
