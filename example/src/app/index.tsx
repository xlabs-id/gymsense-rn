import { View, Platform, StyleSheet } from 'react-native';
import { GymSense } from 'gymsense-rn'
import type { GymSenseResult } from 'gymsense-rn'

export default function Index() {
  return (
    <View style={styles.safeArea}>
      <GymSense
        token="eyJhbGciOiJIUzI1NiJ9.eyJjbGllbnRJZCI6ImdlcmFraW4iLCJleHAiOjE3NTk5MDk0MzV9.fArRIkMkGOIqE7TUSKrseBznV4ybAtTeV0tGl4jY4Xg"
        activity="lunges"
        target={8}
        onResult={(result: GymSenseResult) => {
          console.log("GymSense Activity Completed")
          console.log("Activity:", result.activity)
          console.log("Start:", result.start)
          console.log("End:", result.end)
          console.log("Duration:", result.duration)
          console.log("Accuracy:", result.accuracy)
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
