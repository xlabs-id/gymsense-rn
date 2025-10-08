import { View, Platform, StyleSheet } from 'react-native';
import { GymSense } from 'gymsense-rn'

export default function Index() {
  return (
    <View style={styles.safeArea}>
      <GymSense
        token="***REMOVED***"
        activity="lunges"
        target={8}
        onResult={(result) => {
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
