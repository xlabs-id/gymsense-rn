import CrossPlatformWebView from './CrossPlatformWebView';
import type {
  SessionCompletePayload,
  SetCompletePayload,
} from '../models/GymSenseMessage';
import { GYMSENSE_URI } from './Constants';

type Props = {
  token: string;
  exerciseId: number;
  target: number;
  theme?: 'light' | 'dark';
  sets?: number; // Number of target sets (default: 1)
  restDuration?: number; // Rest duration between sets in seconds (default: 30)
  bodyWeight?: number; // User's body weight in kg (optional)
  resultPostUrl?: string; // URL to POST session results to (optional)
  resultPostToken?: string; // Authentication token for result POST requests (optional)
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
  bodyWeight,
  resultPostUrl,
  resultPostToken,
  onSessionComplete,
  onSetComplete,
  onSessionCanceled,
  debug = false,
}: Props) => {
  const uri = `${GYMSENSE_URI}/bootstrap?destination=exercise&exercise_id=${exerciseId}&target=${target}&sets=${sets}&rest_duration=${restDuration}&theme=${theme}&auth_token=${token}${bodyWeight !== undefined ? `&body_weight=${bodyWeight}` : ''}${resultPostUrl !== undefined ? `&result_post_url=${encodeURIComponent(resultPostUrl)}` : ''}${resultPostToken !== undefined ? `&result_post_token=${resultPostToken}` : ''}${debug ? '&debug=true' : ''}`;

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
