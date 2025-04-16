import { useAuth } from '../context/AuthProvider';
import { Redirect, Slot } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';

export default function ProtectedLayout() {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0f0f0f' }}>
        <ActivityIndicator size="large" color="#00ffcc" />
      </View>
    );
  }

  if (!session) {
    return <Redirect href="/login" />;
  }

  return <Slot />;
}
