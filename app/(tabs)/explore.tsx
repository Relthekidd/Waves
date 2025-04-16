import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { supabase } from '../../supabase/supabase';
import { usePlayerStore } from '../../store/usePlayerStore';

export default function ExploreScreen() {
  const [songs, setSongs] = useState<any[]>([]);
  const { play } = usePlayerStore();

  useEffect(() => {
    const fetchSongs = async () => {
      const { data, error } = await supabase
        .from('songs')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) setSongs(data);
    };

    fetchSongs();
  }, []);

  const renderRow = (title: string, filterFn: (song: any) => boolean) => {
    const filtered = songs.filter(filterFn);
    if (filtered.length === 0) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <FlatList
          data={filtered}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                play({
                  id: item.id,
                  title: item.title,
                  artist: item.artist,
                  artwork: item.artwork,
                  url: item.audio_url,
                })
              }
            >
              <Image source={{ uri: item.artwork }} style={styles.artwork} />
              <Text style={styles.cardTitle} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.cardArtist} numberOfLines={1}>
                {item.artist}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 120 }}>
      <Text style={styles.title}>Explore</Text>

      {renderRow('New Releases', () => true)}
      {renderRow('Turn Up Vibes', (s) => s.mood?.toLowerCase() === 'turn up')}
      {renderRow('Chill & Smooth', (s) => s.mood?.toLowerCase() === 'chill')}
      {renderRow('Hip-Hop Hits', (s) => s.genre?.toLowerCase() === 'hip-hop')}
      {renderRow('R&B Feels', (s) => s.genre?.toLowerCase() === 'r&b')}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 16,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  card: {
    marginRight: 16,
    width: 120,
  },
  artwork: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginBottom: 6,
  },
  cardTitle: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  cardArtist: {
    color: '#bbb',
    fontSize: 12,
  },
});