
import { StyleSheet, Text, View } from 'react-native';

import TinderSwipeDemo from './Screens/Swipe';

export default function App() {
  return (
    <View style={styles.container}>
      <TinderSwipeDemo/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
