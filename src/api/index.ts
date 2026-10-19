import type { BrowseApi } from './client';
import { LocalApi } from './local/LocalApi';
import { SupabaseApi } from './supabase/SupabaseApi';

/**
 * The one API instance the app uses:
 * - VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY set: the ELUM platform on Supabase. Accounts are
 *   Supabase Auth users; search runs through the browse-search edge function.
 * - neither: preview mode on your own computer, with accounts kept in this browser. Netlify
 *   builds refuse to run this way (scripts/require-supabase.mjs).
 */
const env = import.meta.env;
const supabaseUrl = env.VITE_SUPABASE_URL?.trim();
const supabaseKey = env.VITE_SUPABASE_ANON_KEY?.trim();

export const api: BrowseApi = supabaseUrl && supabaseKey ? new SupabaseApi(supabaseUrl, supabaseKey) : new LocalApi();

export * from './types';
export type { BrowseApi, NotificationsApi } from './client';
export { ApiError, errorMessage, isApiError } from './errors';
