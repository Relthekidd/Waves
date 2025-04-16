import { View, Text, StyleSheet } from 'react-native';
import SignOutButton from '../../components/SignOutButton';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Profile</Text>
      <Text style={styles.subtitle}>Manage account settings and preferences.</Text>

      {/* Sign out button */}
      <SignOutButton />
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
    fontWeight: '700',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 16,
    color: '#bbbbbb',
    marginTop: 8,
    marginBottom: 32,
  },
});
