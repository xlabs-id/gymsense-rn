import { View, Platform, StyleSheet } from 'react-native';
import { Exercise } from 'gymsense-rn';
import type { SessionCompletePayload } from 'gymsense-rn';

export default function ExerciseExample() {
  return (
    <View style={styles.safeArea}>
      <Exercise
        token="your_token_here"
        exerciseId={20}
        target={10}
        theme="light"
        onSessionComplete={(result: SessionCompletePayload) => {
          console.log('Exercise Session Completed');
          console.log('Exercise ID:', result.exerciseId);
          console.log('Exercise Name:', result.exerciseName);
          console.log('Type:', result.type);
          console.log('Count:', result.count);
          console.log('Accuracy:', result.accuracy);
          console.log('ROM:', result.rom);
          console.log('Stability:', result.stability);
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
