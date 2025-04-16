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
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const { play } = usePlayerStore();

  const tags = ['All', 'Turn Up', 'Chill', 'Hip-Hop', 'R&B'];

  useEffect(() => {
    const fetchSongs = async () => {
      const { data, error } = await supabase.from('songs').select('*');
      if (!error && data) setSongs(data);
    };

    fetchSongs();
  }, []);

  const getFilteredSongs = () => {
    if (selectedTag === 'All') return songs;

    return songs.filter(
      (s) =>
        s.genre?.toLowerCase() === selectedTag.toLowerCase() ||
        s.mood?.toLowerCase() === selectedTag.toLowerCase()
    );
  };

  const filteredSongs = getFilteredSongs();

  const renderRow = (title: string, filterFn: (s: any) => boolean) => {
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
              onPress={() =>
                play({
                  id: item.id,
                  title: item.title,
                  artist: item.artist,
                  artwork: item.artwork,
                  url: item.audio_url,
                })
              }
              style={({ pressed }) => [
                styles.card,
                { opacity: pressed ? 0.7 : 1 },
              ]}
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

      {/* Trending Row */}
      {renderRow('Trending Now', (s) =>
        s.title.toLowerCase().includes('like') ||
        s.mood?.toLowerCase() === 'turn up'
      )}

      {/* Grid-style tags */}
      <View style={styles.tagGrid}>
        {tags.map((tag) => (
          <TouchableOpacity
            key={tag}
            style={[
              styles.tag,
              selectedTag === tag && styles.activeTag,
            ]}
            onPress={() => setSelectedTag(tag)}
          >
            <Text
              style={[
                styles.tagText,
                selectedTag === tag && styles.activeTagText,
              ]}
            >
              {tag}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Dynamic Results */}
      <Text style={styles.sectionTitle}>
        {selectedTag === 'All' ? 'All Songs' : selectedTag}
      </Text>

      {filteredSongs.length === 0 ? (
        <View style={{ alignItems: 'center', marginTop: 40 }}>
          <Text style={styles.empty}>No songs found for this filter.</Text>
          <Text style={styles.tip}>Try picking a different vibe.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredSongs}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                play({
                  id: item.id,
                  title: item.title,
                  artist: item.artist,
                  artwork: item.artwork,
                  url: item.audio_url,
                })
              }
              style={({ pressed }) => [
                styles.card,
                { opacity: pressed ? 0.7 : 1 },
              ]}
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
      )}
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
  sectionTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    marginTop: 32,
  },
  tagGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 12,
  },
  tag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
  },
  activeTag: {
    backgroundColor: '#00ffcc',
  },
  tagText: {
    color: '#aaa',
    fontSize: 14,
    fontWeight: '600',
  },
  activeTagText: {
    color: '#000',
  },
  section: {
    marginTop: 12,
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
  empty: {
    color: '#777',
    fontSize: 14,
    marginTop: 16,
    textAlign: 'center',
  },
  tip: {
    color: '#444',
    fontSize: 12,
    marginTop: 6,
  },
});