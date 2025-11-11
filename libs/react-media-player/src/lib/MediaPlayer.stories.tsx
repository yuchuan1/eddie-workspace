import type { Meta, StoryObj } from '@storybook/react';
import { MediaPlayer } from './MediaPlayer';

const meta: Meta<typeof MediaPlayer> = {
  component: MediaPlayer,
  title: 'MediaPlayer',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    source: {
      control: { type: 'object' },
      description: 'Media source configuration',
    },
    drm: {
      control: { type: 'object' },
      description: 'DRM configuration for protected content',
    },
    controls: {
      control: { type: 'select' },
      options: ['native', 'shaka'],
      description: 'Type of video controls to use',
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark', 'auto'],
      description: 'Visual theme',
    },
    debug: {
      control: { type: 'boolean' },
      description: 'Show debug overlay with streaming statistics',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MediaPlayer>;

export const Default: Story = {
  args: {
    source: {
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      kind: 'mp4',
    },
    poster: 'https://picsum.photos/640/360?random=1',
    controls: 'native',
    autoplay: false,
    muted: false,
    theme: 'auto',
    debug: false,
  },
};

export const WithShakaControls: Story = {
  args: {
    source: {
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      kind: 'mp4',
    },
    poster: 'https://picsum.photos/640/360?random=2',
    controls: 'shaka',
    autoplay: false,
    muted: false,
    theme: 'auto',
    debug: false,
  },
};

export const AutoplayMuted: Story = {
  args: {
    source: {
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      kind: 'mp4',
    },
    poster: 'https://picsum.photos/640/360?random=3',
    controls: 'native',
    autoplay: true,
    muted: true,
    theme: 'auto',
    debug: false,
  },
};

export const DebugMode: Story = {
  args: {
    source: {
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      kind: 'mp4',
    },
    poster: 'https://picsum.photos/640/360?random=4',
    controls: 'native',
    autoplay: false,
    muted: false,
    theme: 'auto',
    debug: true,
  },
};

export const DarkTheme: Story = {
  args: {
    source: {
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      kind: 'mp4',
    },
    poster: 'https://picsum.photos/640/360?random=5',
    controls: 'native',
    autoplay: false,
    muted: false,
    theme: 'dark',
    debug: false,
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};
