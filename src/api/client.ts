import type { AppNotification, ElumStatus, PageInfo, SearchInput, SearchPage, Session, SignInInput, SignUpInput, User } from './types';

/** The contract every Browse backend fulfils: Supabase in production, the browser when unconnected. */
export interface BrowseApi {
  /** `remote` for the ELUM platform on Supabase, `local` for the browser only (development). */
  readonly mode: 'remote' | 'local';

  // Accounts: the same ELUM account as every other app. Browse works signed out too.
  restoreSession(): Promise<Session | null>;
  signUp(input: SignUpInput): Promise<Session>;
  signIn(input: SignInInput): Promise<Session>;
  signOut(): Promise<void>;
  updateProfile(input: { name: string }): Promise<User>;
  /** The last What's new release this account saw, kept on the account, or null if never recorded. */
  whatsNewSeen(): Promise<string | null>;
  setWhatsNewSeen(id: string): Promise<void>;
  /** Called when the session ends somewhere else. */
  onUnauthorized(handler: () => void): () => void;

  resendConfirmation?(email: string): Promise<void>;
  takeLinkProblem?(): string | null;
  typeDomain?(): Promise<string>;
  handleAvailable?(handle: string): Promise<boolean>;
  handoff?(to: string, next: string): Promise<string>;
  completeHandoff?(tokenHash: string): Promise<Session>;

  readonly notifications?: NotificationsApi;

  /** Web or image results from Google, with AI products left out. */
  search(input: SearchInput): Promise<SearchPage>;
  /** How to show a web page inside Browse, or null without the ELUM platform (then: try a frame). */
  page(url: string): Promise<PageInfo | null>;
  /** How every ELUM service is doing, or null without the ELUM platform. */
  status(): Promise<ElumStatus | null>;
}

export interface NotificationsApi {
  list(options?: { before?: string; unreadOnly?: boolean; limit?: number }): Promise<AppNotification[]>;
  markRead(ids?: string[]): Promise<void>;
  subscribe(onNew: (n: AppNotification) => void): () => void;
}
