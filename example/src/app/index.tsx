import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GymSense Examples</Text>
      <Text style={styles.subtitle}>Choose an example to run:</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/exercise')}
      >
        <Text style={styles.buttonText}>Exercise Component</Text>
        <Text style={styles.buttonDescription}>
          Execute exercises with a specific exercise ID and target
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/record-exercise')}
      >
        <Text style={styles.buttonText}>RecordExercise Component</Text>
        <Text style={styles.buttonDescription}>
          Create new exercises by recording movements
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/edit-exercise')}
      >
        <Text style={styles.buttonText}>EditExercise Component</Text>
        <Text style={styles.buttonDescription}>Edit existing exercises</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 8,
  },
  buttonDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});
