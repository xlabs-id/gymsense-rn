import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Speech from 'expo-speech';
import type {
  GymSenseMessage,
  SessionCompletePayload,
  SetCompletePayload,
  ExerciseCreatedPayload,
  ExerciseUpdatedPayload,
} from '../../models/GymSenseMessage';

type Props = {
  uri: string;
  onLog?: (message: string) => void;
  onSessionComplete?: (result: SessionCompletePayload) => void;
  onSetComplete?: (result: SetCompletePayload) => void;
  onSessionCanceled?: () => void;
  onExerciseCreated?: (result: ExerciseCreatedPayload) => void;
  onExerciseUpdated?: (result: ExerciseUpdatedPayload) => void;
};

export default function CrossPlatformWebView(props: Props) {
  return (
    <WebView
      source={{ uri: props.uri }}
      style={styles.webview}
      mediaPlaybackRequiresUserAction={false}
      allowsInlineMediaPlayback={true}
      allowsAirPlayForMediaPlayback={true}
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
      sharedCookiesEnabled={true}
      scalesPageToFit={false}
      mixedContentMode="always"
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

          if (data?.type === 'SET_COMPLETE' && data.payload) {
            props.onSetComplete?.(data.payload as SetCompletePayload);
          }

          if (data?.type === 'SESSION_CANCELED') {
            props.onSessionCanceled?.();
          }

          if (data?.type === 'EXERCISE_CREATED' && data.payload) {
            props.onExerciseCreated?.(data.payload as ExerciseCreatedPayload);
          }

          if (data?.type === 'EXERCISE_UPDATED' && data.payload) {
            props.onExerciseUpdated?.(data.payload as ExerciseUpdatedPayload);
          }

          // Handle TTS requests from the web app
          if (data?.type === 'TTS_SPEAK' && data.payload) {
            const { text, lang, rate, pitch, volume } = data.payload as {
              text: string;
              lang?: string;
              rate?: number;
              pitch?: number;
              volume?: number;
            };

            Speech.speak(text, {
              language: lang || 'en-US',
              rate: rate || 1.0,
              pitch: pitch || 1.0,
              volume: volume || 1.0,
            });
          }

          // Handle TTS stop requests
          if (data?.type === 'TTS_STOP') {
            Speech.stop();
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
          // Polyfill for window.parent.postMessage
          const origPostMessage = window.parent?.postMessage;
          window.parent = { postMessage: function(data) {
            window.ReactNativeWebView.postMessage(JSON.stringify(data));
            origPostMessage && origPostMessage.call(window, data, "*");
          }};

          // Polyfill for Web Speech API
          if (!window.speechSynthesis) {
            window.speechSynthesis = {
              speak: function(utterance) {
                window.ReactNativeWebView.postMessage(JSON.stringify({
                  source: 'gymsense',
                  type: 'TTS_SPEAK',
                  payload: {
                    text: utterance.text,
                    lang: utterance.lang,
                    rate: utterance.rate,
                    pitch: utterance.pitch,
                    volume: utterance.volume
                  }
                }));
              },
              cancel: function() {
                window.ReactNativeWebView.postMessage(JSON.stringify({
                  source: 'gymsense',
                  type: 'TTS_STOP',
                  payload: {}
                }));
              },
              pause: function() {},
              resume: function() {},
              getVoices: function() { return []; },
              speaking: false,
              pending: false,
              paused: false
            };

            // Create SpeechSynthesisUtterance constructor
            window.SpeechSynthesisUtterance = function(text) {
              this.text = text || '';
              this.lang = 'en-US';
              this.voice = null;
              this.volume = 1.0;
              this.rate = 1.0;
              this.pitch = 1.0;
              this.onstart = null;
              this.onend = null;
              this.onerror = null;
              this.onpause = null;
              this.onresume = null;
              this.onmark = null;
              this.onboundary = null;
            };
          }
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
