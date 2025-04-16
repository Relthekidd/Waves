import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../../context/AuthProvider';
import { supabase } from '../../supabase/supabase';
import { usePlayerStore } from '../../store/usePlayerStore';

export default function ProfileScreen() {
  const { session } = useAuth();
  const user = session?.user;
  const setSession = usePlayerStore((state) => state.setSession);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert('Error', error.message);
    } else {
      setSession(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Profile</Text>

      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{user?.email || 'Unknown'}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
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
    marginBottom: 32,
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
});