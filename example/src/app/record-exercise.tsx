import { View, Platform, StyleSheet } from 'react-native';
import { RecordExercise } from 'gymsense-rn';
import type { ExerciseCreatedPayload } from 'gymsense-rn';

export default function RecordExerciseExample() {
  return (
    <View style={styles.safeArea}>
      <RecordExercise
        token="your_token_here"
        authorId={1}
        authorName="Demo User"
        theme="light"
        onExerciseCreated={(result: ExerciseCreatedPayload) => {
          console.log('Exercise Created Successfully!');
          console.log('Exercise ID:', result.exerciseId);
          console.log('Exercise Name:', result.exerciseName);
          console.log('Exercise Type:', result.exerciseType);
          console.log('Author ID:', result.authorId);
          console.log('Author Name:', result.authorName);
          console.log('Video URL:', result.videoUrl);
          console.log('Created At:', result.createdAt);
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
