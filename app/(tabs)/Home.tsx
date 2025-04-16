import { useEffect, useState } from 'react';
import { supabase } from '../../supabase/supabase';
import { usePlayerStore } from '../../store/usePlayerStore';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [songs, setSongs] = useState<any[]>([]);
  const { play } = usePlayerStore();

  useEffect(() => {
    const fetchSongs = async () => {
      const { data, error } = await supabase.from('songs').select('*');
      if (!error && data) setSongs(data);
    };

    fetchSongs();
  }, []);

  const handlePlayFrom = (index: number) => {
    const queue = songs.map((song) => ({
      id: song.id,
      title: song.title,
      artist: song.artist,
      artwork: song.artwork,
      url: song.audio_url,
    }));

    play(queue[index], queue);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recommended For You</Text>

      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.songCard}
            onPress={() => handlePlayFrom(index)}
          >
            <Image source={{ uri: item.artwork }} style={styles.artwork} />
            <View>
              <Text style={styles.songTitle}>{item.title}</Text>
              <Text style={styles.songArtist}>{item.artist}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
    paddingTop: 100,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 16,
  },
  songCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  artwork: {
    width: 64,
    height: 64,
    borderRadius: 12,
    marginRight: 14,
  },
  songTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  songArtist: {
    color: '#bbbbbb',
    fontSize: 14,
  },
});