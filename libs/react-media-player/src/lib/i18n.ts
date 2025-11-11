import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  en: {
    translation: {
      mediaPlayer: {
        play: 'Play',
        pause: 'Pause',
        mute: 'Mute',
        unmute: 'Unmute',
        fullscreen: 'Fullscreen',
        exitFullscreen: 'Exit Fullscreen',
        loading: 'Loading video...',
        error: 'Video playback error',
        live: 'LIVE',
        duration: '{{current}} / {{total}}',
        volume: 'Volume',
        settings: 'Settings',
        quality: 'Quality',
        speed: 'Playback Speed',
        subtitles: 'Subtitles',
        audioTrack: 'Audio Track',
      },
    },
  },
  de: {
    translation: {
      mediaPlayer: {
        play: 'Abspielen',
        pause: 'Pausieren',
        mute: 'Stumm',
        unmute: 'Ton an',
        fullscreen: 'Vollbild',
        exitFullscreen: 'Vollbild beenden',
        loading: 'Video wird geladen...',
        error: 'Video-Wiedergabefehler',
        live: 'LIVE',
        duration: '{{current}} / {{total}}',
        volume: 'Lautstärke',
        settings: 'Einstellungen',
        quality: 'Qualität',
        speed: 'Wiedergabegeschwindigkeit',
        subtitles: 'Untertitel',
        audioTrack: 'Tonspur',
      },
    },
  },
  fr: {
    translation: {
      mediaPlayer: {
        play: 'Lire',
        pause: 'Pause',
        mute: 'Muet',
        unmute: 'Activer le son',
        fullscreen: 'Plein écran',
        exitFullscreen: 'Quitter le plein écran',
        loading: 'Chargement de la vidéo...',
        error: 'Erreur de lecture vidéo',
        live: 'EN DIRECT',
        duration: '{{current}} / {{total}}',
        volume: 'Volume',
        settings: 'Paramètres',
        quality: 'Qualité',
        speed: 'Vitesse de lecture',
        subtitles: 'Sous-titres',
        audioTrack: 'Piste audio',
      },
    },
  },
  es: {
    translation: {
      mediaPlayer: {
        play: 'Reproducir',
        pause: 'Pausar',
        mute: 'Silenciar',
        unmute: 'Activar sonido',
        fullscreen: 'Pantalla completa',
        exitFullscreen: 'Salir de pantalla completa',
        loading: 'Cargando video...',
        error: 'Error de reproducción de video',
        live: 'EN VIVO',
        duration: '{{current}} / {{total}}',
        volume: 'Volumen',
        settings: 'Configuración',
        quality: 'Calidad',
        speed: 'Velocidad de reproducción',
        subtitles: 'Subtítulos',
        audioTrack: 'Pista de audio',
      },
    },
  },
};

// Initialize i18n
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    react: {
      useSuspense: false, // Disable suspense for SSR compatibility
    },
  });

export default i18n;
