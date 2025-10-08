import CrossPlatformWebView from "./components/CrossPlatformWebView";
import type { GymSenseResult } from "./models/GymSenseMessage";

const ROOT_URI = 'https://gymsense.xlabs.id';

type Props = {
  token: string;
  activity: string;
  target: number;
  onResult?: (result: GymSenseResult) => void;
  debug?: boolean;
};

function GymSenseLogHandler(message: string) {
  console.log("[GymSense]", message);
}

export const GymSense = ({ token, activity, target, onResult, debug }: Props) => {
  const uri = `${ROOT_URI}/bootstrap?auth_token=${token}&activity=${activity}&target=${target}&debug=${debug}`;

  return (
    <CrossPlatformWebView
      onResult={onResult}
      onLog={GymSenseLogHandler}
      uri={uri}
    />

  )
}

export type { GymSenseResult } from "./models/GymSenseMessage";
