import { useAuth } from '../context/AuthProvider';
import { Redirect, Slot } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';

export default function AppLayout() {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0f0f0f' }}>
        <ActivityIndicator size="large" color="#00ffcc" />
      </View>
    );
  }

  // Redirect signed-in users to tab layout
  if (session) {
    return <Redirect href="/(tabs)/home" />;
  }

  // Let unauthenticated users access login, signup, etc.
  return <Slot />;
}
