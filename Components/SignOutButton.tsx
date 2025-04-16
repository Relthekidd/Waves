import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { supabase } from '../supabase/supabase';
import { useRouter } from 'expo-router';

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      router.replace('/login');
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleSignOut}>
      <Text style={styles.buttonText}>Sign Out</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1c1c1c',
    borderColor: '#00ffcc',
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#00ffcc',
    fontWeight: '700',
    fontSize: 16,
  },
});
