import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { supabase } from '../../supabase/supabase';
import { usePlayerStore } from '../../store/usePlayerStore';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [songs, setSongs] = useState<any[]>([]);
  const { play } = usePlayerStore();

  useEffect(() => {
    const fetchSongs = async () => {
      const { data, error } = await supabase.from('songs').select('*');
      if (!error && data) setSongs(data);
    };

    fetchSongs();
  }, []);

  const filtered = songs.filter((song) =>
    song.title.toLowerCase().includes(query.toLowerCase()) ||
    song.artist.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search</Text>

      <TextInput
        style={styles.input}
        placeholder="Search songs or artists..."
        placeholderTextColor="#888"
        value={query}
        onChangeText={setQuery}
      />

      {filtered.length === 0 ? (
        <Text style={styles.empty}>No results found.</Text>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
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
              <View>
                <Text style={styles.songTitle}>{item.title}</Text>
                <Text style={styles.songArtist}>{item.artist}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
    padding: 24,
    paddingTop: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 24,
    borderColor: '#333',
    borderWidth: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  artwork: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 12,
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
  empty: {
    color: '#777',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
  },
});