import { create } from 'zustand';
import { Audio, AVPlaybackStatusSuccess } from 'expo-av';

type Track = {
  id: string;
  title: string;
  artist: string;
  artwork: string;
  url: string;
};

type PlayerState = {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  progress: number;
  play: (track: Track) => Promise<void>;
  togglePlay: () => void;
  stop: () => void;
};

let sound: Audio.Sound | null = null;

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentTrack: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  progress: 0,

  play: async (track) => {
    if (sound) {
      await sound.unloadAsync();
      sound = null;
    }

    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: track.url },
      { shouldPlay: true },
    );

    sound = newSound;

    set({
      currentTrack: track,
      isPlaying: true,
      currentTime: 0,
      duration: 0,
      progress: 0,
    });

    newSound.setOnPlaybackStatusUpdate((status) => {
      if (!status.isLoaded) return;

      const s = status as AVPlaybackStatusSuccess;

      set({
        currentTime: s.positionMillis,
        duration: s.durationMillis ?? 0,
        progress: s.durationMillis ? s.positionMillis / s.durationMillis : 0,
      });

      if (s.didJustFinish) get().stop();
    });
  },

  togglePlay: async () => {
    if (!sound) return;

    const status = await sound.getStatusAsync();
    if (!status.isLoaded) return;

    if (status.isPlaying) {
      await sound.pauseAsync();
      set({ isPlaying: false });
    } else {
      await sound.playAsync();
      set({ isPlaying: true });
    }
  },

  stop: async () => {
    if (sound) {
      await sound.unloadAsync();
      sound = null;
    }

    set({
      isPlaying: false,
      currentTrack: null,
      currentTime: 0,
      duration: 0,
      progress: 0,
    });
  },
}));