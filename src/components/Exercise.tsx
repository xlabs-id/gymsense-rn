import CrossPlatformWebView from './CrossPlatformWebView';
import type { SessionCompletePayload, SetCompletePayload } from '../models/GymSenseMessage';

const ROOT_URI = 'https://gymsense.xlabs.id';

type Props = {
  token: string;
  exerciseId: number;
  target: number;
  theme?: 'light' | 'dark';
  sets?: number; // Number of target sets (default: 1)
  restDuration?: number; // Rest duration between sets in seconds (default: 30)
  onSessionComplete?: (result: SessionCompletePayload) => void;
  onSetComplete?: (result: SetCompletePayload) => void;
  onSessionCanceled?: () => void;
  debug?: boolean;
};

function GymSenseLogHandler(message: string) {
  console.log('[GymSense]', message);
}

export const Exercise = ({
  token,
  exerciseId,
  target,
  theme = 'light',
  sets = 1,
  restDuration = 30,
  onSessionComplete,
  onSetComplete,
  onSessionCanceled,
  debug = false,
}: Props) => {
  const uri = `${ROOT_URI}/bootstrap?destination=exercise&exercise_id=${exerciseId}&target=${target}&sets=${sets}&rest_duration=${restDuration}&theme=${theme}&auth_token=${token}${debug ? '&debug=true' : ''}`;

  return (
    <CrossPlatformWebView
      onSessionComplete={onSessionComplete}
      onSetComplete={onSetComplete}
      onSessionCanceled={onSessionCanceled}
      onLog={GymSenseLogHandler}
      uri={uri}
    />
  );
};
