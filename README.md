# gymsense-rn

XLabs GymSense multiplatform library.

## Installation

```sh
npm install gymsense-rn
```

## Usage

```ts
import { StyleSheet } from 'react-native';
import { GymSense } from 'gymsense-rn'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['right', 'left', 'bottom', 'top']}>
      <GymSense
        token="your_token_here"
        activity="lunges"
        target={8}
        onResult={(result) => {
          console.log("GymSense Activity Completed")
          console.log("Activity:", result.activity)
          console.log("Start:", result.start)
          console.log("End:", result.end)
          console.log("Duration:", result.duration)
          console.log("Accuracy:", result.accuracy)
        debug={false}
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
```

## Parameters

### `activity: string`

- `lunges`
- `pushups`
- `planks`
- `squats`
- `jumping_jacks`

### `target: number`

Will be treated as seconds for time-based and repetitions for rep-based.

### `onResult?: (result: GymSenseResult) => void`

```ts
export interface GymSenseResult {
  start: number; // timestamp in seconds
  end: number; // timestamp in seconds
  duration: number; // duration in seconds
  activity: string; // e.g., "jumping_jacks"
  type: string; // e.g., "repetition" or "duration"
  count: number; // number of repetitions or duration in seconds
  accuracy?: number; // accuracy percentage (0-100)
}
```

## Screenshots

### Web

<img src="images/GymSense-Web.png" alt="Web Screenshot" width="500"/>

### Native

<div style="display: flex; gap: 10px; align-items: flex-start;">
  <img src="images/GymSense-Android.png" alt="Android Screenshot" height="500"/>
  <img src="images/GymSense-iOS.png" alt="iOS Screenshot" height="500"/>
</div>

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
