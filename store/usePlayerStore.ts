import { create } from 'zustand';

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
  setTrack: (track: Track) => void;
  togglePlay: () => void;
  stop: () => void;
};

export const usePlayerStore = create<PlayerState>((set) => ({
  currentTrack: null,
  isPlaying: false,

  setTrack: (track) => set({ currentTrack: track, isPlaying: true }),

  togglePlay: () =>
    set((state) => ({
      isPlaying: !state.isPlaying,
    })),

  stop: () => set({ isPlaying: false, currentTrack: null }),
}));
