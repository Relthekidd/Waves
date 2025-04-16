import { Slot } from 'expo-router';
import { AuthProvider } from './context/AuthProvider';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from './context/AuthProvider';

function AppLayout() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0f0f0f' }}>
        <ActivityIndicator size="large" color="#00ffcc" />
      </View>
    );
  }

  return <Slot />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppLayout />
    </AuthProvider>
  );
}
