import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useAuth } from '../../context/AuthProvider';
import { supabase } from '../../supabase/supabase';
import { usePlayerStore } from '../../store/usePlayerStore';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const { session } = useAuth();
  const user = session?.user;
  const setSession = usePlayerStore((state) => state.setSession);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!user?.id) return;

    const fetchData = async () => {
      const { data: favs } = await supabase
        .from('favorites')
        .select('*, songs(*)')
        .eq('user_id', user.id)
        .limit(3);

      const { data: hist } = await supabase
        .from('listening_history')
        .select('*, songs(*)')
        .eq('user_id', user.id)
        .order('played_at', { ascending: false })
        .limit(6);

      if (favs) setFavorites(favs);
      if (hist) {
        const seen = new Set();
        const unique = hist.filter((entry) => {
          if (seen.has(entry.song_id)) return false;
          seen.add(entry.song_id);
          return true;
        });
        setHistory(unique.slice(0, 3));
      }
    };

    fetchData();
  }, [user?.id]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert('Error', error.message);
    } else {
      setSession(null);
    }
  };

  const renderMiniList = (items: any[], label: string, navigateTo: string) => (
    <View style={{ marginTop: 32 }}>
      <View style={styles.rowHeader}>
        <Text style={styles.label}>{label}</Text>
        <TouchableOpacity onPress={() => router.push(navigateTo)}>
          <Text style={styles.link}>View All</Text>
        </TouchableOpacity>
      </View>
      {items.length === 0 ? (
        <Text style={styles.empty}>No {label.toLowerCase()} yet.</Text>
      ) : (
        items.map((entry) => {
          const song = entry.songs;
          return (
            <View key={song.id} style={styles.songRow}>
              <Text style={styles.value}>{song.title}</Text>
              <Text style={styles.songArtist}>{song.artist}</Text>
            </View>
          );
        })
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Profile</Text>

      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{user?.email || 'Unknown'}</Text>

      {renderMiniList(favorites, 'Favorites', '/library')}
      {renderMiniList(history, 'Recently Played', '/library')}

      <TouchableOpacity
        style={[styles.button, { marginTop: 48 }]}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>

      {/* Settings section */}
      <View style={styles.settingsSection}>
        <Text style={styles.label}>App Settings</Text>

        <TouchableOpacity
          style={styles.settingRow}
          onPress={() =>
            Alert.alert('Coming Soon', 'Dark mode toggle will be available soon.')
          }
        >
          <Text style={styles.settingText}>Dark Mode</Text>
          <Text style={styles.settingToggle}>Auto</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingRow}
          onPress={() =>
            Alert.alert('Coming Soon', 'Profile editing is under development.')
          }
        >
          <Text style={styles.settingText}>Edit Profile</Text>
          <Text style={styles.settingToggle}>--</Text>
        </TouchableOpacity>
      </View>
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
  heading: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 30,
  },
  label: {
    color: '#aaa',
    fontSize: 16,
    marginBottom: 4,
  },
  value: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  link: {
    color: '#00ffcc',
    fontSize: 14,
    fontWeight: '600',
  },
  songRow: {
    marginBottom: 12,
  },
  songArtist: {
    color: '#888',
    fontSize: 13,
  },
  empty: {
    color: '#555',
    fontSize: 14,
    marginTop: 4,
  },
  button: {
    backgroundColor: '#00ffcc',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
  },
  settingsSection: {
    marginTop: 48,
    borderTopWidth: 1,
    borderTopColor: '#222',
    paddingTop: 24,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  settingText: {
    color: '#fff',
    fontSize: 16,
  },
  settingToggle: {
    color: '#00ffcc',
    fontSize: 16,
    fontWeight: '600',
  },
});