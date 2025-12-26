import CrossPlatformWebView from './CrossPlatformWebView';
import type { ExerciseCreatedPayload } from '../models/GymSenseMessage';

const ROOT_URI = 'https://gymsense.xlabs.id';

type Props = {
  token: string;
  authorId: number;
  authorName: string;
  theme?: 'light' | 'dark';
  onExerciseCreated?: (result: ExerciseCreatedPayload) => void;
  debug?: boolean;
};

function GymSenseLogHandler(message: string) {
  console.log('[GymSense]', message);
}

export const RecordExercise = ({
  token,
  authorId,
  authorName,
  theme = 'light',
  onExerciseCreated,
  debug = false,
}: Props) => {
  const encodedAuthorName = encodeURIComponent(authorName);
  const uri = `${ROOT_URI}/bootstrap?destination=record-exercise&author_id=${authorId}&author_name=${encodedAuthorName}&theme=${theme}&auth_token=${token}${debug ? '&debug=true' : ''}`;

  return (
    <CrossPlatformWebView
      onExerciseCreated={onExerciseCreated}
      onLog={GymSenseLogHandler}
      uri={uri}
    />
  );
};
