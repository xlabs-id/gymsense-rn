# gymsense-rn

XLabs GymSense multiplatform library.

## Installation

```sh
npm install gymsense-rn
```

## Usage

### Exercise Component

Use the `Exercise` component to execute exercises with a specific exercise ID and target.

```ts
import { View, Platform, StyleSheet } from 'react-native';
import { Exercise } from 'gymsense-rn';
import type { SessionCompletePayload } from 'gymsense-rn';

export default function Index() {
  return (
    <View style={styles.safeArea}>
      <Exercise
        token="your_token_here"
        exerciseId={12}
        target={10}
        theme="light"
        onSessionComplete={(result: SessionCompletePayload) => {
          console.log("Exercise Session Completed");
          console.log("Exercise ID:", result.exerciseId);
          console.log("Exercise Name:", result.exerciseName);
          console.log("Type:", result.type);
          console.log("Count:", result.count);
          console.log("Accuracy:", result.accuracy);
          console.log("ROM:", result.rom);
          console.log("Stability:", result.stability);
        }}
        debug={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "transparent",
    paddingBottom: Platform.OS === 'android' ? 50 : 0,
  },
});
```

### RecordExercise Component

Use the `RecordExercise` component to create new exercises.

```ts
import { View, Platform, StyleSheet } from 'react-native';
import { RecordExercise } from 'gymsense-rn';
import type { ExerciseCreatedPayload } from 'gymsense-rn';

export default function Index() {
  return (
    <View style={styles.safeArea}>
      <RecordExercise
        token="your_token_here"
        authorId={123}
        authorName="John Doe"
        theme="light"
        onExerciseCreated={(result: ExerciseCreatedPayload) => {
          console.log("Exercise Created");
          console.log("Exercise ID:", result.exerciseId);
          console.log("Exercise Name:", result.exerciseName);
          console.log("Exercise Type:", result.exerciseType);
          console.log("Author ID:", result.authorId);
          console.log("Author Name:", result.authorName);
          console.log("Video URL:", result.videoUrl);
          console.log("Created At:", result.createdAt);
        }}
        debug={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "transparent",
    paddingBottom: Platform.OS === 'android' ? 50 : 0,
  },
});
```

## Component Props

### Exercise

| Prop                | Type                                       | Required | Description                          |
| ------------------- | ------------------------------------------ | -------- | ------------------------------------ |
| `token`             | `string`                                   | Yes      | Authentication token                 |
| `exerciseId`        | `number`                                   | Yes      | ID of the exercise to execute        |
| `target`            | `number`                                   | Yes      | Target repetitions or duration       |
| `theme`             | `'light' \| 'dark'`                        | No       | UI theme (default: `'light'`)        |
| `onSessionComplete` | `(result: SessionCompletePayload) => void` | No       | Callback when session completes      |
| `debug`             | `boolean`                                  | No       | Enable debug mode (default: `false`) |

### RecordExercise

| Prop                | Type                                       | Required | Description                          |
| ------------------- | ------------------------------------------ | -------- | ------------------------------------ |
| `token`             | `string`                                   | Yes      | Authentication token                 |
| `authorId`          | `number`                                   | Yes      | ID of the exercise author            |
| `authorName`        | `string`                                   | Yes      | Name of the exercise author          |
| `theme`             | `'light' \| 'dark'`                        | No       | UI theme (default: `'light'`)        |
| `onExerciseCreated` | `(result: ExerciseCreatedPayload) => void` | No       | Callback when exercise is created    |
| `debug`             | `boolean`                                  | No       | Enable debug mode (default: `false`) |

## Message Payloads

### SessionCompletePayload

```ts
{
  start: number;              // Unix timestamp in seconds (session start)
  end: number;                // Unix timestamp in seconds (session end)
  duration: number;           // Duration in seconds
  exerciseId: number;         // Exercise ID number
  exerciseName: string;       // Name of the exercise
  type: "repetition" | "hold"; // Exercise type
  count: number;              // For repetition: totalReps, for hold: totalValidSeconds
  accuracy: number;           // Average score (0-100)
  rom?: number;               // Range of Motion (only for repetition exercises)
  stability?: number;         // Stability score (only for hold exercises)
}
```

### ExerciseCreatedPayload

```ts
{
  exerciseId: number; // Database ID of the newly created exercise
  exerciseName: string; // Name of the exercise
  exerciseType: 'repetition' | 'hold'; // Exercise type
  authorId: string; // ID of the author/trainer
  authorName: string; // Name of the author/trainer
  videoUrl: string; // URL to the reference video
  createdAt: string; // ISO timestamp of creation
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
