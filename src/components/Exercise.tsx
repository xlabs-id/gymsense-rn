import CrossPlatformWebView from './CrossPlatformWebView';
import type { SessionCompletePayload } from '../models/GymSenseMessage';

const ROOT_URI = 'https://gymsense.xlabs.id';

type Props = {
  token: string;
  exerciseId: number;
  target: number;
  theme?: 'light' | 'dark';
  onSessionComplete?: (result: SessionCompletePayload) => void;
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
  onSessionComplete,
  debug = false,
}: Props) => {
  const uri = `${ROOT_URI}/bootstrap?destination=exercise&exercise_id=${exerciseId}&target=${target}&theme=${theme}&auth_token=${token}${debug ? '&debug=true' : ''}`;

  return (
    <CrossPlatformWebView
      onSessionComplete={onSessionComplete}
      onLog={GymSenseLogHandler}
      uri={uri}
    />
  );
};
