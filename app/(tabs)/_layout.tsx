import { Tabs } from 'expo-router';
import MiniPlayer from '../../components/MiniPlayer';
import { View, StyleSheet } from 'react-native';

export default function TabLayout() {
  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#0f0f0f',
            borderTopColor: '#222',
            position: 'absolute',
            bottom: 0,
            height: 60,
          },
          tabBarActiveTintColor: '#00ffcc',
          tabBarInactiveTintColor: '#888',
          headerShown: false,
        }}
      >
        <Tabs.Screen name="home" options={{ title: 'Home' }} />
        <Tabs.Screen name="search" options={{ title: 'Search' }} />
        <Tabs.Screen name="library" options={{ title: 'Library' }} />
        <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
      </Tabs>

      <MiniPlayer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});
