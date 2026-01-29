import CrossPlatformWebView from './CrossPlatformWebView';
import type { ExerciseUpdatedPayload } from '../models/GymSenseMessage';

const ROOT_URI = 'https://gymsense.xlabs.id';

type Props = {
  token: string;
  exerciseId: number;
  theme?: 'light' | 'dark';
  onExerciseUpdated?: (result: ExerciseUpdatedPayload) => void;
  debug?: boolean;
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
}: Props) => {
  const uri = `${ROOT_URI}/bootstrap?destination=record-exercise&exercise_id=${exerciseId}&theme=${theme}&auth_token=${token}${debug ? '&debug=true' : ''}`;

  return (
    <CrossPlatformWebView
      onExerciseUpdated={onExerciseUpdated}
      onLog={GymSenseLogHandler}
      uri={uri}
    />
  );
};
