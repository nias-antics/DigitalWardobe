import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const userIcon = require('./assets/usei.jpg');

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => router.push('/')}
      >
        <Image source={userIcon} style={styles.icon} />
      </TouchableOpacity>

      <Text style={styles.text}>Profile Saved!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 24 },
  profileButton: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
  icon: {
    width: 50,
    height: 50,
  },
});