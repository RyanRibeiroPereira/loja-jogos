import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Substitua com os dados do seu projeto no Supabase
const supabaseUrl = 'https://SEU_PROJETO.supabase.co';
const supabaseAnonKey = 'SUA_CHAVE_ANONIMA_AQUI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});