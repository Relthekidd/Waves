import { useAuth } from '../context/AuthProvider';
import { Redirect, Slot } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';

enableScreens();

export default function AppLayout() {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <SafeAreaProvider>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0f0f0f' }}>
          <ActivityIndicator size="large" color="#00ffcc" />
        </View>
      </SafeAreaProvider>
    );
  }

  if (session) {
    return (
      <SafeAreaProvider>
        <Redirect href="/(tabs)/home" />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <Slot />
    </SafeAreaProvider>
  );
}