import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { supabase } from '../../supabase/supabase';
import { usePlayerStore } from '../../store/usePlayerStore';
import { useAuth } from '../../context/AuthProvider';

export default function LibraryScreen() {
  const [recent, setRecent] = useState<any[]>([]);
  const { play } = usePlayerStore();
  const { session } = useAuth();
  const userId = session?.user.id;

  useEffect(() => {
    const fetchRecent = async () => {
      if (!userId) return;

      const { data, error } = await supabase
        .from('listening_history')
        .select('*, songs(*)')
        .eq('user_id', userId)
        .order('played_at', { ascending: false });

      if (!error && data) {
        // Filter to only show unique songs
        const seen = new Set();
        const unique = data.filter((entry) => {
          if (seen.has(entry.song_id)) return false;
          seen.add(entry.song_id);
          return true;
        });
        setRecent(unique);
      }
    };

    fetchRecent();
  }, [userId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recently Played</Text>

      {recent.length === 0 ? (
        <Text style={styles.empty}>You haven’t played anything yet.</Text>
      ) : (
        <FlatList
          data={recent}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const song = item.songs;
            return (
              <TouchableOpacity
                style={styles.item}
                onPress={() =>
                  play({
                    id: song.id,
                    title: song.title,
                    artist: song.artist,
                    artwork: song.artwork,
                    url: song.audio_url,
                  })
                }
              >
                <Image source={{ uri: song.artwork }} style={styles.artwork} />
                <View>
                  <Text style={styles.songTitle}>{song.title}</Text>
                  <Text style={styles.songArtist}>{song.artist}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
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
    marginBottom: 16,
  },
  empty: {
    color: '#777',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
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
});