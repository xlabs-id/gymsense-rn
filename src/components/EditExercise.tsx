import CrossPlatformWebView from './CrossPlatformWebView';
import type { ExerciseUpdatedPayload } from '../models/GymSenseMessage';
import { GYMSENSE_URI } from './Constants';

type Props = {
  token: string;
  exerciseId: number;
  theme?: 'light' | 'dark';
  onExerciseUpdated?: (result: ExerciseUpdatedPayload) => void;
  debug?: boolean;
  lang?: string;
};

function GymSenseLogHandler(message: string) {
  console.log('[GymSense]', message);
}

export const EditExercise = ({
  token,
  exerciseId,
  theme = 'light',
  onExerciseUpdated,
  debug = false,
  lang = 'en',
}: Props) => {
  const uri = `${GYMSENSE_URI}/bootstrap?destination=record-exercise&exercise_id=${exerciseId}&theme=${theme}&auth_token=${token}${debug ? '&debug=true' : ''}&lang=${lang}`;

  return (
    <CrossPlatformWebView
      onExerciseUpdated={onExerciseUpdated}
      onLog={GymSenseLogHandler}
      uri={uri}
    />
  );
};
