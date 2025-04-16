import { supabase } from '../supabase/supabase';

export const addFavorite = async (userId: string, songId: string) => {
  const { error } = await supabase
    .from('favorites')
    .insert({ user_id: userId, song_id: songId });

  return error;
};

export const removeFavorite = async (userId: string, songId: string) => {
  const { error } = await supabase
    .from('favorites')
    .delete()
    .match({ user_id: userId, song_id: songId });

  return error;
};

export const isFavorited = async (userId: string, songId: string) => {
  const { data, error } = await supabase
    .from('favorites')
    .select('*')
    .eq('user_id', userId)
    .eq('song_id', songId)
    .single();

  return { isFavorite: !!data, error };
};