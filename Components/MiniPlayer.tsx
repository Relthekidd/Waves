import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { usePlayerStore } from '../store/usePlayerStore';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function MiniPlayer() {
  const router = useRouter();
  const { currentTrack, isPlaying, togglePlay } = usePlayerStore();

  if (!currentTrack) return null;

  return (
    <TouchableOpacity style={styles.container} onPress={() => router.push('/player')}>
      <Image source={{ uri: currentTrack.artwork }} style={styles.artwork} />

      <View style={styles.trackInfo}>
        <Text style={styles.title} numberOfLines={1}>{currentTrack.title}</Text>
        <Text style={styles.artist} numberOfLines={1}>{currentTrack.artist}</Text>
      </View>

      <TouchableOpacity onPress={(e) => {
        e.stopPropagation();
        togglePlay();
      }}>
        <Ionicons
          name={isPlaying ? 'pause-circle' : 'play-circle'}
          size={36}
          color="#00ffcc"
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a1a',
    padding: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#333',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 10,
  },
  artwork: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 12,
  },
  trackInfo: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  artist: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 2,
  },
});
