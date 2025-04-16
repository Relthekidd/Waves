import { create } from 'zustand';
import { Audio, AVPlaybackStatusSuccess } from 'expo-av';
import { supabase } from '../supabase/supabase';
import { Session } from '@supabase/supabase-js';

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
  queue: Track[];
  currentIndex: number;
  session: Session | null;
  setSession: (session: Session | null) => void;
  play: (track: Track, queue?: Track[]) => Promise<void>;
  playNext: () => Promise<void>;
  playPrevious: () => Promise<void>;
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
  queue: [],
  currentIndex: 0,
  session: null,

  setSession: (session) => set({ session }),

  play: async (track, queue = []) => {
    if (sound) {
      await sound.unloadAsync();
      sound = null;
    }

    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: track.url },
      { shouldPlay: true }
    );

    sound = newSound;

    set({
      currentTrack: track,
      isPlaying: true,
      currentTime: 0,
      duration: 0,
      progress: 0,
      queue: queue.length ? queue : [track],
      currentIndex: 0,
    });

    // Track listening history
    const userId = get().session?.user.id;
    if (userId) {
      await supabase.from('listening_history').insert({
        user_id: userId,
        song_id: track.id,
      });
    }

    newSound.setOnPlaybackStatusUpdate((status) => {
      if (!status.isLoaded) return;

      const s = status as AVPlaybackStatusSuccess;

      set({
        currentTime: s.positionMillis,
        duration: s.durationMillis ?? 0,
        progress: s.durationMillis ? s.positionMillis / s.durationMillis : 0,
      });

      if (s.didJustFinish) get().playNext();
    });
  },

  playNext: async () => {
    const { queue, currentIndex } = get();
    const nextIndex = currentIndex + 1;
    if (nextIndex < queue.length) {
      const nextTrack = queue[nextIndex];
      await get().play(nextTrack, queue);
      set({ currentIndex: nextIndex });
    } else {
      get().stop(); // reached end of queue
    }
  },

  playPrevious: async () => {
    const { queue, currentIndex } = get();
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      const prevTrack = queue[prevIndex];
      await get().play(prevTrack, queue);
      set({ currentIndex: prevIndex });
    }
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
      queue: [],
      currentIndex: 0,
    });
  },
}));