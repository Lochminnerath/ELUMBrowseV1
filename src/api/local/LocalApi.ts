import type { BrowseApi } from '../client';
import { ApiError } from '../errors';
import type { ElumStatus, PageInfo, SearchPage, Session, SignInInput, SignUpInput, User } from '../types';
import { checkSignUp, cleanName } from '../validation';
import { hashPassword, verifyPassword, type PasswordHash } from './passwords';

/**
 * Preview mode: Make without the ELUM platform, for working on the app on your own computer.
 * Everything lives in this browser's localStorage and nothing reaches Supabase, so accounts made
 * here are not real ELUM accounts. Netlify builds refuse to ship this (scripts/require-supabase.mjs).
 */

const KEY = 'elum.browse.local';
const SESSION_KEY = 'elum.browse.local.session';
/** Pictures are kept inline in preview mode, so they stay small. */
const COLORS = ['#f59a52', '#3fc4a0', '#9b84ee', '#ec7fa9', '#e9b949', '#7093f8'];

interface StoredUser extends User {
  password: PasswordHash;
}

interface Store {
  users: StoredUser[];
}

export class LocalApi implements BrowseApi {
  readonly mode = 'local' as const;
  private readonly unauthorizedHandlers = new Set<() => void>();

  private read(): Store {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) return JSON.parse(raw) as Store;
    } catch {
      // Unreadable storage starts fresh.
    }
    return { users: [] };
  }

  private write(store: Store) {
    try {
      localStorage.setItem(KEY, JSON.stringify(store));
    } catch {
      throw new ApiError('storage_full', 'This browser has run out of space for accounts. Connect ELUM.');
    }
  }

  private me(): StoredUser {
    const id = localStorage.getItem(SESSION_KEY);
    const user = id ? this.read().users.find((u) => u.id === id) : undefined;
    if (!user) {
      this.unauthorizedHandlers.forEach((h) => h());
      throw new ApiError('unauthorized', 'Your session has ended. Sign in again.');
    }
    return user;
  }

  onUnauthorized(handler: () => void): () => void {
    this.unauthorizedHandlers.add(handler);
    return () => this.unauthorizedHandlers.delete(handler);
  }

  // ---------------------------------------------------------------- accounts

  async restoreSession(): Promise<Session | null> {
    const id = localStorage.getItem(SESSION_KEY);
    const user = id ? this.read().users.find((u) => u.id === id) : undefined;
    return user ? { user: publicUser(user) } : null;
  }

  async signUp(input: SignUpInput): Promise<Session> {
    if (input.accountType === 'type') throw new ApiError('invalid', 'ELUM Type addresses need the ELUM platform. Use your own email for now.');
    const { name, email, password } = checkSignUp(input);
    const store = this.read();
    if (store.users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      throw new ApiError('email_taken', 'An account with this email already exists. Sign in instead.', { field: 'email' });
    }
    const user: StoredUser = {
      id: crypto.randomUUID(),
      name,
      email,
      color: COLORS[store.users.length % COLORS.length],
      accountType: 'external',
      createdAt: new Date().toISOString(),
      password: await hashPassword(password),
    };
    store.users.push(user);
    this.write(store);
    localStorage.setItem(SESSION_KEY, user.id);
    return { user: publicUser(user) };
  }

  async signIn(input: SignInInput): Promise<Session> {
    const user = this.read().users.find((u) => u.email.toLowerCase() === input.email.trim().toLowerCase());
    if (!user || !(await verifyPassword(input.password, user.password))) {
      throw new ApiError('invalid_credentials', 'That email and password do not match.');
    }
    localStorage.setItem(SESSION_KEY, user.id);
    return { user: publicUser(user) };
  }

  async signOut(): Promise<void> {
    localStorage.removeItem(SESSION_KEY);
  }

  async updateProfile(input: { name: string }): Promise<User> {
    const me = this.me();
    const store = this.read();
    const user = store.users.find((u) => u.id === me.id)!;
    user.name = cleanName(input.name);
    this.write(store);
    return publicUser(user);
  }

  // ------------------------------------------------------------------ search

  /** Unconnected (development): no server to ask Google, so Browse offers Google's own results. */
  async search(): Promise<SearchPage> {
    return { configured: false, results: [], total: 0, next: null, suggestion: null, hidden: 0 };
  }

  async page(): Promise<PageInfo | null> {
    return null;
  }

  async status(): Promise<ElumStatus | null> {
    return null;
  }
}

function publicUser(u: StoredUser): User {
  return { id: u.id, name: u.name, email: u.email, color: u.color, accountType: u.accountType, createdAt: u.createdAt };
}

