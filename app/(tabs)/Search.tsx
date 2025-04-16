import { View, TextInput, Text, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function SearchScreen() {
  const [query, setQuery] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find Your Vibe</Text>

      <TextInput
        placeholder="Search tracks, artists, moods..."
        placeholderTextColor="#888"
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />

      {/* Future: Add live search results */}
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
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#1c1c1c',
    color: '#ffffff',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#333',
  },
});
