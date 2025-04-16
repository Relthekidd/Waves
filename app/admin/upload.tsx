import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
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
  const [showPreview, setShowPreview] = useState(false);

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
      setShowPreview(false);
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

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#444' }]}
        onPress={() => setShowPreview(true)}
      >
        <Text style={[styles.buttonText, { color: '#fff' }]}>Preview</Text>
      </TouchableOpacity>

      {showPreview && (
        <View style={styles.previewBox}>
          <Text style={styles.previewTitle}>Preview</Text>
          <Text style={styles.previewText}>Title: {title}</Text>
          <Text style={styles.previewText}>Artist: {artist}</Text>
          <Text style={styles.previewText}>Genre: {genre || '-'}</Text>
          <Text style={styles.previewText}>Mood: {mood || '-'}</Text>
          <Text style={styles.previewText}>Audio URL: {audioUrl || '-'}</Text>
          <Text style={styles.previewText}>Artwork:</Text>

          {artworkUrl ? (
            <Image source={{ uri: artworkUrl }} style={styles.previewImage} />
          ) : (
            <Text style={styles.previewText}>None</Text>
          )}

          <TouchableOpacity
            style={[styles.button, { marginTop: 20 }]}
            onPress={handleUpload}
          >
            <Text style={styles.buttonText}>
              {uploading ? 'Uploading...' : 'Confirm Upload'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
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
  previewBox: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 16,
    marginTop: 24,
  },
  previewTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 12,
  },
  previewText: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 6,
  },
  previewImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginTop: 8,
  },
});