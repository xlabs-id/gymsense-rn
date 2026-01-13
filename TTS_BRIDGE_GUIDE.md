# Native Text-to-Speech Bridge for WebView

## Problem

The embedded web application uses the **Web Speech API** (`SpeechSynthesisUtterance` and `window.speechSynthesis`) for text-to-speech, which is **NOT supported** in mobile WebViews:

- ❌ **iOS WebView (WKWebView)**: Speech Synthesis API is completely unsupported
- ❌ **Android WebView**: Speech Synthesis API support is inconsistent and unreliable

## Solution

We've implemented a **native TTS bridge** that:

1. Polyfills the Web Speech API in the WebView
2. Intercepts `speechSynthesis.speak()` calls
3. Forwards them to React Native's `expo-speech` for native TTS playback

## How It Works

### Architecture

```
Web App (in WebView)
  ↓ calls window.speechSynthesis.speak(utterance)
  ↓ (polyfilled by injected JavaScript)
  ↓ sends message via window.ReactNativeWebView.postMessage()
  ↓
React Native WebView
  ↓ receives message in onMessage handler
  ↓ calls Speech.speak() from expo-speech
  ↓
Native TTS Engine (iOS/Android)
  ↓ plays audio through device speakers
```

### Implementation Details

#### 1. **Injected JavaScript Polyfill**

The WebView injects JavaScript that creates a polyfill for the Web Speech API:

```javascript
window.speechSynthesis = {
  speak: function (utterance) {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        source: 'gymsense',
        type: 'TTS_SPEAK',
        payload: {
          text: utterance.text,
          lang: utterance.lang,
          rate: utterance.rate,
          pitch: utterance.pitch,
          volume: utterance.volume,
        },
      })
    );
  },
  cancel: function () {
    /* stops speech */
  },
  // ... other methods
};

window.SpeechSynthesisUtterance = function (text) {
  this.text = text || '';
  this.lang = 'en-US';
  this.rate = 1.0;
  this.pitch = 1.0;
  this.volume = 1.0;
  // ... other properties
};
```

#### 2. **Message Handler in React Native**

The WebView's `onMessage` handler processes TTS requests:

```typescript
if (data?.type === 'TTS_SPEAK' && data.payload) {
  const { text, lang, rate, pitch, volume } = data.payload;

  Speech.speak(text, {
    language: lang || 'en-US',
    rate: rate || 1.0,
    pitch: pitch || 1.0,
    volume: volume || 1.0,
  });
}

if (data?.type === 'TTS_STOP') {
  Speech.stop();
}
```

## Files Modified

### 1. **CrossPlatformWebView.native.tsx**

- Added `expo-speech` import
- Added TTS message handlers (`TTS_SPEAK`, `TTS_STOP`)
- Injected JavaScript polyfill for Web Speech API

### 2. **GymSenseMessage.tsx**

- Added `TTS_SPEAK` and `TTS_STOP` message types
- Added `TTSSpeakPayload` interface

### 3. **package.json** (root)

- Added `expo-speech` as peer dependency

### 4. **example/package.json**

- Added `expo-speech` as dependency

### 5. **example/app.json**

- Added `MODIFY_AUDIO_SETTINGS` and `INTERNET` permissions for Android
- Added `UIBackgroundModes: ["audio"]` for iOS

## Usage in Web App

The web app can continue using the standard Web Speech API:

```javascript
const utterance = new SpeechSynthesisUtterance(number.toString());
utterance.lang = LANG_CODES[language] || 'en-US';
utterance.rate = 1.0;
utterance.pitch = 1.0;
utterance.volume = 1.0;

// This will now work in the WebView!
window.speechSynthesis.speak(utterance);
```

**No changes needed in the web app code!** The polyfill makes it work transparently.

## Supported Features

✅ **Supported:**

- `speechSynthesis.speak(utterance)` - Speaks text
- `speechSynthesis.cancel()` - Stops speaking
- `SpeechSynthesisUtterance` constructor
- Properties: `text`, `lang`, `rate`, `pitch`, `volume`

⚠️ **Limited Support:**

- Event callbacks (`onstart`, `onend`, etc.) - Not implemented
- `speechSynthesis.pause()` / `resume()` - No-op
- `speechSynthesis.getVoices()` - Returns empty array

❌ **Not Supported:**

- Voice selection (uses system default)
- Real-time voice list updates

## Installation & Setup

### 1. Install Dependencies

```bash
cd example
yarn add expo-speech
```

### 2. Rebuild the App

Since we modified native configurations and added new dependencies:

```bash
cd example

# Clean rebuild
npx expo prebuild --clean

# Run on device
npx expo run:ios     # For iOS
npx expo run:android # For Android
```

### 3. Test TTS

1. Launch the app on a physical device
2. Navigate to the Exercise screen
3. Start an exercise
4. You should now hear the number counting via native TTS!

## Troubleshooting

### No sound on iOS?

1. **Check device volume**: Ensure volume is up and not on silent mode
2. **Check permissions**: iOS may require microphone permission for some TTS features
3. **Test on physical device**: iOS Simulator TTS may not work properly

### No sound on Android?

1. **Check permissions**: Verify `MODIFY_AUDIO_SETTINGS` permission is granted
2. **Check TTS engine**: Go to Settings > Accessibility > Text-to-speech and ensure a TTS engine is installed
3. **Check volume**: Ensure media volume (not ringer) is turned up
4. **Clear app data**: Settings > Apps > [Your App] > Storage > Clear Data

### Still not working?

1. **Enable debug mode**: Set `debug={true}` on the Exercise component
2. **Check console logs**: Look for TTS-related messages
3. **Test expo-speech directly**: Create a test button that calls `Speech.speak("test")` outside the WebView
4. **Verify polyfill**: In the WebView, check if `window.speechSynthesis` exists

## Testing the Bridge

You can test the bridge directly from React Native:

```typescript
import * as Speech from 'expo-speech';

// Test native TTS
Speech.speak('Hello from native TTS', {
  language: 'en-US',
  rate: 1.0,
  pitch: 1.0,
  volume: 1.0,
});
```

## Performance Considerations

- **Latency**: Native TTS has ~100-300ms latency from call to first audio
- **Queueing**: Multiple `speak()` calls are queued automatically by expo-speech
- **Interruption**: Calling `cancel()` stops current and queued speech
- **Memory**: Minimal overhead, polyfill is ~2KB of injected JavaScript

## Alternative Solutions

If the native bridge doesn't work for your use case:

### Option 1: Pre-recorded Audio Files

```javascript
const audio = new Audio(`https://your-cdn.com/numbers/${number}.mp3`);
audio.play();
```

### Option 2: Cloud TTS Service

```javascript
const audio = new Audio(
  `https://api.elevenlabs.io/v1/text-to-speech?text=${encodeURIComponent(text)}`
);
audio.play();
```

### Option 3: Web Audio API

Generate speech using Web Audio API (more complex, requires synthesis library)

## Language Support

The bridge supports all languages supported by the device's native TTS engine:

- **iOS**: Uses AVSpeechSynthesizer (60+ languages)
- **Android**: Uses TextToSpeech (depends on installed engines)

Common language codes:

- `en-US` - English (US)
- `en-GB` - English (UK)
- `es-ES` - Spanish (Spain)
- `fr-FR` - French
- `de-DE` - German
- `ja-JP` - Japanese
- `zh-CN` - Chinese (Simplified)
- `ko-KR` - Korean

## API Reference

### Message Types

#### `TTS_SPEAK`

Requests native TTS to speak text.

**Payload:**

```typescript
{
  text: string;      // Text to speak
  lang?: string;     // Language code (default: 'en-US')
  rate?: number;     // Speech rate 0.1-2.0 (default: 1.0)
  pitch?: number;    // Voice pitch 0.5-2.0 (default: 1.0)
  volume?: number;   // Volume 0.0-1.0 (default: 1.0)
}
```

#### `TTS_STOP`

Stops current and queued speech.

**Payload:** `{}` (empty object)

## Future Enhancements

Potential improvements for future versions:

1. **Event callbacks**: Implement `onstart`, `onend`, `onerror` events
2. **Voice selection**: Expose native voice list to web app
3. **SSML support**: Support Speech Synthesis Markup Language
4. **Pause/Resume**: Implement proper pause/resume functionality
5. **Word boundaries**: Fire events at word boundaries for highlighting

## References

- [Expo Speech Documentation](https://docs.expo.dev/versions/latest/sdk/speech/)
- [Web Speech API Specification](https://wicg.github.io/speech-api/)
- [React Native WebView](https://github.com/react-native-webview/react-native-webview)
