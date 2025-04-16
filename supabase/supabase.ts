import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mrsfhpuvblujfyiwmsux.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yc2ZocHV2Ymx1amZ5aXdtc3V4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MzIwNTMsImV4cCI6MjA2MDQwODA1M30.CrJVH_5tSq2fV2ENECkUQ0HUrkPuc8LYrdwCYyysiwc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);