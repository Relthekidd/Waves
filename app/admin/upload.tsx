import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { supabase } from '../../supabase/supabase';
import { useAuth } from '../../context/AuthProvider';

export default function UploadScreen() {
  const { session } = useAuth();
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [genre, setGenre] = useState('');
  const [mood, setMood] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [artworkUrl, setArtworkUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!title || !artist || !audioUrl || !artworkUrl) {
      Alert.alert('Missing Info', 'Please fill in all required fields.');
      return;
    }

    setUploading(true);

    const { error } = await supabase.from('songs').insert([
      {
        title,
        artist,
        genre,
        mood,
        audio_url: audioUrl,
        artwork: artworkUrl,
      },
    ]);

    setUploading(false);

    if (error) {
      Alert.alert('Upload Failed', error.message);
    } else {
      Alert.alert('Success', 'Track uploaded successfully.');
      setTitle('');
      setArtist('');
      setGenre('');
      setMood('');
      setAudioUrl('');
      setArtworkUrl('');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
      <Text style={styles.heading}>Upload New Song</Text>

      <TextInput
        style={styles.input}
        placeholder="Song Title"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor="#666"
      />

      <TextInput
        style={styles.input}
        placeholder="Artist Name"
        value={artist}
        onChangeText={setArtist}
        placeholderTextColor="#666"
      />

      <TextInput
        style={styles.input}
        placeholder="Genre"
        value={genre}
        onChangeText={setGenre}
        placeholderTextColor="#666"
      />

      <TextInput
        style={styles.input}
        placeholder="Mood"
        value={mood}
        onChangeText={setMood}
        placeholderTextColor="#666"
      />

      <TextInput
        style={styles.input}
        placeholder="Audio File URL"
        value={audioUrl}
        onChangeText={setAudioUrl}
        placeholderTextColor="#666"
      />

      <TextInput
        style={styles.input}
        placeholder="Artwork Image URL"
        value={artworkUrl}
        onChangeText={setArtworkUrl}
        placeholderTextColor="#666"
      />

      <TouchableOpacity style={styles.button} onPress={handleUpload} disabled={uploading}>
        <Text style={styles.buttonText}>{uploading ? 'Uploading...' : 'Upload'}</Text>
      </TouchableOpacity>
    </ScrollView>
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
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  button: {
    backgroundColor: '#00ffcc',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
  },
});
