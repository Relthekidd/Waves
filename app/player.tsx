import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { usePlayerStore } from '../store/usePlayerStore';
import { Ionicons } from '@expo/vector-icons';

export default function PlayerScreen() {
  const { currentTrack, isPlaying, togglePlay } = usePlayerStore();

  if (!currentTrack) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No song is playing</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: currentTrack.artwork }} style={styles.artwork} />

      <View style={styles.trackInfo}>
        <Text style={styles.title} numberOfLines={1}>{currentTrack.title}</Text>
        <Text style={styles.artist} numberOfLines={1}>{currentTrack.artist}</Text>
      </View>

      {/* Static progress bar for now */}
      <View style={styles.progressBar}>
        <View style={styles.progressFill} />
      </View>

      <TouchableOpacity onPress={togglePlay} style={styles.playButton}>
        <Ionicons
          name={isPlaying ? 'pause' : 'play'}
          size={48}
          color="#00ffcc"
        />
      </TouchableOpacity>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  artwork: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: 20,
    marginBottom: 32,
  },
  trackInfo: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
  },
  artist: {
    fontSize: 16,
    color: '#bbb',
    marginTop: 4,
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: '#333',
    borderRadius: 5,
    overflow: 'hidden',
    marginVertical: 32,
  },
  progressFill: {
    width: '40%', // static for now
    height: '100%',
    backgroundColor: '#00ffcc',
  },
  playButton: {
    padding: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f0f0f',
  },
  emptyText: {
    color: '#aaa',
    fontSize: 16,
  },
});