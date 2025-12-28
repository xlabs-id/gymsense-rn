/// <reference lib="dom" />

import { useEffect } from 'react';
import type {
  GymSenseMessage,
  SessionCompletePayload,
  SetCompletePayload,
  ExerciseCreatedPayload,
} from '../../models/GymSenseMessage';

type Props = {
  uri: string;
  onLog?: (message: string) => void;
  onSessionComplete?: (result: SessionCompletePayload) => void;
  onSetComplete?: (result: SetCompletePayload) => void;
  onSessionCanceled?: () => void;
  onExerciseCreated?: (result: ExerciseCreatedPayload) => void;
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
