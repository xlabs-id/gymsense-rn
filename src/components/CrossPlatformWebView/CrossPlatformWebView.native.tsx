import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import type {
  GymSenseMessage,
  SessionCompletePayload,
  ExerciseCreatedPayload,
} from '../../models/GymSenseMessage';

type Props = {
  uri: string;
  onLog?: (message: string) => void;
  onSessionComplete?: (result: SessionCompletePayload) => void;
  onExerciseCreated?: (result: ExerciseCreatedPayload) => void;
};

export default function CrossPlatformWebView(props: Props) {
  return (
    <WebView
      source={{ uri: props.uri }}
      style={styles.webview}
      mediaPlaybackRequiresUserAction={false}
      allowsInlineMediaPlayback={true}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      androidLayerType="hardware"
      allowsProtectedMedia={true}
      scrollEnabled={false}
      androidzoomControlEnabled={false}
      startInLoadingState={true}
      mediaCapturePermissionGrantType="grant"
      textInteractionEnabled={false}
      pullToRefreshEnabled={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      setDisplayZoomControls={false}
      setBuiltInZoomControls={false}
      nestedScrollEnabled={false}
      overScrollMode="never"
      bounces={false}
      thirdPartyCookiesEnabled={true}
      scalesPageToFit={false}
      androidHardwareAccelerationDisabled={false}
      onError={(syntheticEvent) => {
        const { nativeEvent } = syntheticEvent;
        console.warn('WebView error: ', nativeEvent);
      }}
      onMessage={(event) => {
        try {
          const data = JSON.parse(event.nativeEvent.data) as GymSenseMessage;
          if (data?.type === 'LOG' && typeof data.payload === 'string') {
            props.onLog?.(data.payload);
          }

          if (data?.type === 'SESSION_COMPLETE' && data.payload) {
            props.onSessionComplete?.(data.payload as SessionCompletePayload);
          }

          if (data?.type === 'EXERCISE_CREATED' && data.payload) {
            props.onExerciseCreated?.(data.payload as ExerciseCreatedPayload);
          }
        } catch (error) {
          console.error(
            'Failed to process message from GymSense WebView:',
            error
          );
        }
      }}
      injectedJavaScript={`
        (function() {
          const origPostMessage = window.parent?.postMessage;
          window.parent = { postMessage: function(data) {
            window.ReactNativeWebView.postMessage(JSON.stringify(data));
            origPostMessage && origPostMessage.call(window, data, "*");
          }};
        })();
      `}
    />
  );
}

const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
});
