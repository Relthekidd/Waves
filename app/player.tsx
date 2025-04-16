import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { usePlayerStore } from '../store/usePlayerStore';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthProvider';
import {
  addFavorite,
  removeFavorite,
  isFavorited,
} from '../utils/favorites';

const formatTime = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export default function PlayerScreen() {
  const {
    currentTrack,
    isPlaying,
    togglePlay,
    currentTime,
    duration,
    progress,
    playNext,
    playPrevious,
  } = usePlayerStore();

  const { session } = useAuth();
  const userId = session?.user.id;
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    if (currentTrack && userId) {
      isFavorited(userId, currentTrack.id).then((res) => {
        if (!res.error) setFavorited(res.isFavorite);
      });
    }
  }, [currentTrack]);

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

      {/* Favorite Button */}
      <TouchableOpacity
        onPress={async () => {
          if (!currentTrack || !userId) return;

          if (favorited) {
            const error = await removeFavorite(userId, currentTrack.id);
            if (!error) setFavorited(false);
          } else {
            const error = await addFavorite(userId, currentTrack.id);
            if (!error) setFavorited(true);
          }
        }}
        style={styles.heart}
      >
        <Ionicons
          name={favorited ? 'heart' : 'heart-outline'}
          size={32}
          color={favorited ? '#ff3d6f' : '#888'}
        />
      </TouchableOpacity>

      <View style={styles.trackInfo}>
        <Text style={styles.title} numberOfLines={1}>{currentTrack.title}</Text>
        <Text style={styles.artist} numberOfLines={1}>{currentTrack.artist}</Text>
      </View>

      <View style={styles.progressWrapper}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>

        <View style={styles.timeRow}>
          <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
          <Text style={styles.timeText}>{formatTime(duration)}</Text>
        </View>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity onPress={playPrevious}>
          <Ionicons name="play-skip-back" size={40} color="#00ffcc" />
        </TouchableOpacity>

        <TouchableOpacity onPress={togglePlay} style={styles.playPause}>
          <Ionicons name={isPlaying ? 'pause' : 'play'} size={48} color="#00ffcc" />
        </TouchableOpacity>

        <TouchableOpacity onPress={playNext}>
          <Ionicons name="play-skip-forward" size={40} color="#00ffcc" />
        </TouchableOpacity>
      </View>
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
  progressWrapper: {
    width: '100%',
    marginBottom: 24,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#333',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00ffcc',
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  timeText: {
    color: '#aaa',
    fontSize: 12,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 28,
  },
  playPause: {
    paddingHorizontal: 16,
  },
  heart: {
    position: 'absolute',
    top: 60,
    right: 30,
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