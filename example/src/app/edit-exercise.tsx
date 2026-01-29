import { View, Platform, StyleSheet } from 'react-native';
import { EditExercise } from 'gymsense-rn';
import type { ExerciseUpdatedPayload } from 'gymsense-rn';

export default function EditExerciseExample() {
  return (
    <View style={styles.safeArea}>
      <EditExercise
        token="your_token_here"
        exerciseId={123}
        theme="light"
        onExerciseUpdated={(result: ExerciseUpdatedPayload) => {
          console.log('Exercise Updated Successfully!');
          console.log('Exercise ID:', result.exerciseId);
          console.log('Exercise Name:', result.exerciseName);
          console.log('Exercise Type:', result.exerciseType);
          console.log('Author ID:', result.authorId);
          console.log('Author Name:', result.authorName);
          console.log('Video URL:', result.videoUrl);
          console.log('Icon URL:', result.iconUrl);
          console.log('Updated At:', result.updatedAt);
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
