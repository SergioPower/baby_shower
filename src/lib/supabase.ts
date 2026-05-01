import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Tipado de variables de entorno
const supabaseUrl: string = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey: string = import.meta.env.VITE_SUPABASE_ANON_KEY

// Validación
if (!supabaseUrl || !supabaseAnonKey) {
	throw new Error(`
❌ Faltan variables de entorno de Supabase

Agrega en tu .env:
VITE_SUPABASE_URL=tu_url
VITE_SUPABASE_ANON_KEY=tu_key
`)
}

// Cliente tipado
export const supabase: SupabaseClient = createClient(
	supabaseUrl,
	supabaseAnonKey
)