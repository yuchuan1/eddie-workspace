import React, { Component, ErrorInfo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './MediaPlayer.module.css';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class MediaPlayerErrorBoundaryClass extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('MediaPlayer Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return <MediaPlayerErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

interface ErrorFallbackProps {
  error?: Error;
}

const MediaPlayerErrorFallback: React.FC<ErrorFallbackProps> = ({ error }) => {
  const { t } = useTranslation();

  return (
    <div className={styles['error-container']}>
      <div className={styles['error-content']}>
        <div className={styles['error-icon']}>
          <span role="img" aria-label="Warning">⚠️</span>
        </div>
        <h3 className={styles['error-title']}>{t('mediaPlayer.error')}</h3>
        <p className={styles['error-message']}>
          {error?.message || 'An unexpected error occurred while loading the video player.'}
        </p>
        <button
          className={styles['error-retry']}
          onClick={() => window.location.reload()}
          aria-label="Retry loading video player"
        >
          {t('mediaPlayer.retry', { defaultValue: 'Retry' })}
        </button>
      </div>
    </div>
  );
};

export const MediaPlayerErrorBoundary: React.FC<Props> = (props) => {
  return <MediaPlayerErrorBoundaryClass {...props} />;
};
