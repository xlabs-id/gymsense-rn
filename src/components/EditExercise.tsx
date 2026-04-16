import CrossPlatformWebView from './CrossPlatformWebView';
import type { ExerciseUpdatedPayload } from '../models/GymSenseMessage';
import { GYMSENSE_URLS, type GymSenseEnv } from './Constants';

type Props = {
  token: string;
  env?: GymSenseEnv;
  exerciseId: number;
  theme?: 'light' | 'dark';
  onExerciseUpdated?: (result: ExerciseUpdatedPayload) => void;
  onSessionCanceled?: () => void;
  debug?: boolean;
  lang?: string;
};

function GymSenseLogHandler(message: string) {
  console.log('[GymSense]', message);
}

export const EditExercise = ({
  token,
  exerciseId,
  env = 'production',
  theme = 'light',
  onExerciseUpdated,
  onSessionCanceled,
  debug = false,
  lang = 'en',
}: Props) => {
  const uri = `${GYMSENSE_URLS[env]}/bootstrap?destination=record-exercise&exercise_id=${exerciseId}&theme=${theme}&auth_token=${token}${debug ? '&debug=true' : '&debug=false'}&lang=${lang}`;

  return (
    <CrossPlatformWebView
      onExerciseUpdated={onExerciseUpdated}
      onSessionCanceled={onSessionCanceled}
      onLog={GymSenseLogHandler}
      uri={uri}
    />
  );
};
