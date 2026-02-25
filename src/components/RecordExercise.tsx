import CrossPlatformWebView from './CrossPlatformWebView';
import type { ExerciseCreatedPayload } from '../models/GymSenseMessage';
import { GYMSENSE_URI } from './Constants';

type Props = {
  token: string;
  authorId: number;
  authorName: string;
  theme?: 'light' | 'dark';
  onExerciseCreated?: (result: ExerciseCreatedPayload) => void;
  debug?: boolean;
  lang?: string;
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
  lang = 'en',
}: Props) => {
  const encodedAuthorName = encodeURIComponent(authorName);
  const uri = `${GYMSENSE_URI}/bootstrap?destination=record-exercise&author_id=${authorId}&author_name=${encodedAuthorName}&theme=${theme}&auth_token=${token}${debug ? '&debug=true' : ''}&lang=${lang}`;

  return (
    <CrossPlatformWebView
      onExerciseCreated={onExerciseCreated}
      onLog={GymSenseLogHandler}
      uri={uri}
    />
  );
};
