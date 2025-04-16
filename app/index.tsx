import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1605902711622-cfb43c44367e' }} // swap with your own later
      style={styles.background}
      blurRadius={2}
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.title}>SONIX</Text>
        <Text style={styles.subtitle}>Where Sound Meets Soul</Text>

        <TouchableOpacity style={styles.button} onPress={() => router.push('/login')}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 48,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 4,
  },
  subtitle: {
    fontSize: 18,
    color: '#dddddd',
    marginTop: 10,
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#00ffcc',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    elevation: 5,
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '700',
  },
});