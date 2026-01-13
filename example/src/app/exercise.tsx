import { View, Platform, StyleSheet } from 'react-native';
import { Exercise } from 'gymsense-rn';
import type { SessionCompletePayload, SetCompletePayload } from 'gymsense-rn';

export default function ExerciseExample() {
  return (
    <View style={styles.safeArea}>
      <Exercise
        token="your_token_here"
        exerciseId={24}
        target={1}
        sets={1}
        restDuration={45}
        bodyWeight={70}
        theme="light"
        onSetComplete={(result: SetCompletePayload) => {
          console.log('Set Completed');
          console.log('Set Number:', result.setNumber);
          console.log('Count:', result.count);
          console.log('Accuracy:', result.accuracy);
          console.log('Duration:', result.duration);
          console.log('Target:', result.target);
          if (result.rom !== undefined) {
            console.log('ROM:', result.rom);
          }
          if (result.stability !== undefined) {
            console.log('Stability:', result.stability);
          }
        }}
        onSessionComplete={(result: SessionCompletePayload) => {
          console.log('Exercise Session Completed');
          console.log('Exercise ID:', result.exerciseId);
          console.log('Exercise Name:', result.exerciseName);
          console.log('Type:', result.type);
          console.log('Total Sets:', result.totalSets);
          console.log('Sets Data:', result.sets);
          console.log('Total Count:', result.count);
          console.log('Average Accuracy:', result.accuracy);
          if (result.rom !== undefined) {
            console.log('Average ROM:', result.rom);
          }
          if (result.stability !== undefined) {
            console.log('Average Stability:', result.stability);
          }
          if (result.calories !== undefined) {
            console.log('Calories Burned:', result.calories);
          }
        }}
        onSessionCanceled={() => {
          console.log('Exercise Session Canceled');
        }}
        debug={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingBottom: Platform.OS === 'android' ? 50 : 0,
  },
});
