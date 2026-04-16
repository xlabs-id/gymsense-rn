import CrossPlatformWebView from './CrossPlatformWebView';
import type { ExerciseCreatedPayload } from '../models/GymSenseMessage';
import { GYMSENSE_URLS, type GymSenseEnv } from './Constants';

type Props = {
  token: string;
  env?: GymSenseEnv;
  authorId: number;
  authorName: string;
  theme?: 'light' | 'dark';
  onExerciseCreated?: (result: ExerciseCreatedPayload) => void;
  onSessionCanceled?: () => void;
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
  env = 'production',
  theme = 'light',
  onExerciseCreated,
  onSessionCanceled,
  debug = false,
  lang = 'en',
}: Props) => {
  const encodedAuthorName = encodeURIComponent(authorName);
  const uri = `${GYMSENSE_URLS[env]}/bootstrap?destination=record-exercise&author_id=${authorId}&author_name=${encodedAuthorName}&theme=${theme}&auth_token=${token}${debug ? '&debug=true' : '&debug=false'}&lang=${lang}`;

  return (
    <CrossPlatformWebView
      onExerciseCreated={onExerciseCreated}
      onSessionCanceled={onSessionCanceled}
      onLog={GymSenseLogHandler}
      uri={uri}
    />
  );
};
