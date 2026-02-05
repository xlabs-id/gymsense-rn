/// <reference lib="dom" />

import { useEffect } from 'react';
import type {
  GymSenseMessage,
  SessionCompletePayload,
  SetCompletePayload,
  ExerciseCreatedPayload,
  ExerciseUpdatedPayload,
  ShareVideoPayload,
} from '../../models/GymSenseMessage';

type Props = {
  uri: string;
  onLog?: (message: string) => void;
  onSessionComplete?: (result: SessionCompletePayload) => void;
  onSetComplete?: (result: SetCompletePayload) => void;
  onSessionCanceled?: () => void;
  onExerciseCreated?: (result: ExerciseCreatedPayload) => void;
  onExerciseUpdated?: (result: ExerciseUpdatedPayload) => void;
};

export default function CrossPlatformWebView(props: Props) {
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== new URL(props.uri).origin) return;

      try {
        const data = event.data as GymSenseMessage;
        if (data?.type === 'LOG' && typeof data.payload === 'string') {
          props.onLog?.(data.payload);
        }

        if (data?.type === 'SESSION_COMPLETE' && data.payload) {
          props.onSessionComplete?.(data.payload as SessionCompletePayload);
        }

        if (data?.type === 'SET_COMPLETE' && data.payload) {
          props.onSetComplete?.(data.payload as SetCompletePayload);
        }

        if (data?.type === 'SESSION_CANCELED') {
          props.onSessionCanceled?.();
        }

        if (data?.type === 'EXERCISE_CREATED' && data.payload) {
          props.onExerciseCreated?.(data.payload as ExerciseCreatedPayload);
        }

        if (data?.type === 'EXERCISE_UPDATED' && data.payload) {
          props.onExerciseUpdated?.(data.payload as ExerciseUpdatedPayload);
        }

        if (data?.type === 'SHARE_VIDEO' && data.payload) {
          const { videoBase64, mimeType } = data.payload as ShareVideoPayload;
          const byteChars = atob(videoBase64);
          const byteArray = new Uint8Array(byteChars.length);
          for (let i = 0; i < byteChars.length; i++) {
            byteArray[i] = byteChars.charCodeAt(i);
          }
          const blob = new Blob([byteArray], { type: mimeType });
          const ext = mimeType.split('/')[1] || 'mp4';
          const file = new File([blob], `gymsense-video.${ext}`, {
            type: mimeType,
          });

          if (navigator.canShare?.({ files: [file] })) {
            navigator.share({ files: [file] });
          } else {
            // Fallback: trigger download
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = file.name;
            a.click();
            URL.revokeObjectURL(url);
          }
        }
      } catch (error) {
        console.error(
          'Failed to process message from GymSense WebView:',
          error
        );
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [props]);

  return (
    <iframe
      src={props.uri}
      style={{
        width: '100%',
        height: '100%',
        border: 'none',
      }}
      allow="camera"
    />
  );
}
