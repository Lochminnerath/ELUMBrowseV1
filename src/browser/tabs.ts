import { useSyncExternalStore } from 'react';

/**
 * Browse's tabs and tab groups, kept on this device. Each tab is a Browse path ("/search?q=fox",
 * "/app/write/d/123"); groups gather tabs under a name, a colour and an ELUM symbol. The changes
 * are plain functions on the state (tested in tabs.test.ts); the store saves after each one.
 */

export const GROUP_COLORS = {
  blue: '#7093f8',
  teal: '#3fc4a0',
  orange: '#f59a52',
  pink: '#ec7fa9',
  lavender: '#9b84ee',
  green: '#94c858',
  yellow: '#e9b949',
  red: '#e5484d',
  grey: '#8a93a8',
} as const;
export type GroupColor = keyof typeof GROUP_COLORS;

export const GROUP_SYMBOLS = ['star', 'compose', 'archive', 'share', 'send', 'present', 'private', 'verified', 'saved', 'link', 'invite', 'warning'] as const;
export type GroupSymbol = (typeof GROUP_SYMBOLS)[number];

export interface Tab {
  id: string;
  path: string;
  groupId: string | null;
}

export interface Group {
  id: string;
  name: string;
  color: GroupColor;
  symbol: GroupSymbol;
  collapsed: boolean;
}

export interface TabsState {
  tabs: Tab[];
  groups: Group[];
  activeId: string;
}

const KEY = 'elum.browse.tabs';
const MAX_TABS = 40;

let counter = 0;
const newId = (prefix: string) => `${prefix}-${Date.now().toString(36)}-${(counter++).toString(36)}`;

export function initialState(path = '/'): TabsState {
  const tab = { id: newId('t'), path, groupId: null };
  return { tabs: [tab], groups: [], activeId: tab.id };
}

// ------------------------------------------------------------------- changes

/** Opens a tab after the active one (inside its group), or `after` a given tab. */
export function openTab(s: TabsState, path: string, opts: { activate?: boolean; after?: string } = {}): TabsState {
  if (s.tabs.length >= MAX_TABS) return { ...s, tabs: s.tabs.map((t) => (t.id === s.activeId ? { ...t, path } : t)) };
  const anchorId = opts.after ?? s.activeId;
  const at = s.tabs.findIndex((t) => t.id === anchorId);
  const anchor = s.tabs[at];
  const tab: Tab = { id: newId('t'), path, groupId: anchor?.groupId ?? null };
  const tabs = [...s.tabs];
  tabs.splice(at + 1, 0, tab);
  return { ...s, tabs, activeId: opts.activate === false ? s.activeId : tab.id };
}

export function activate(s: TabsState, id: string): TabsState {
  if (!s.tabs.some((t) => t.id === id) || s.activeId === id) return s;
  // A tab in a collapsed group opens its group.
  const tab = s.tabs.find((t) => t.id === id)!;
  const groups = s.groups.map((g) => (g.id === tab.groupId && g.collapsed ? { ...g, collapsed: false } : g));
  return { ...s, groups, activeId: id };
}

export function setPath(s: TabsState, id: string, path: string): TabsState {
  return { ...s, tabs: s.tabs.map((t) => (t.id === id && t.path !== path ? { ...t, path } : t)) };
}

/** Closes tabs; the last tab is replaced by a new one, as a browser does. */
export function closeTabs(s: TabsState, ids: string[]): TabsState {
  const gone = new Set(ids);
  const left = s.tabs.filter((t) => !gone.has(t.id));
  if (!left.length) return initialState();
  let activeId = s.activeId;
  if (gone.has(activeId)) {
    const at = s.tabs.findIndex((t) => t.id === activeId);
    const next = s.tabs.slice(at + 1).find((t) => !gone.has(t.id)) ?? [...s.tabs.slice(0, at)].reverse().find((t) => !gone.has(t.id));
    activeId = next!.id;
  }
  return dropEmptyGroups({ ...s, tabs: left, activeId });
}

export function duplicate(s: TabsState, id: string): TabsState {
  const tab = s.tabs.find((t) => t.id === id);
  return tab ? openTab(s, tab.path, { after: id }) : s;
}

/** Puts tabs in a new group, gathered where the first of them is. */
export function groupTabs(s: TabsState, ids: string[], group: Partial<Omit<Group, 'id'>> = {}): TabsState {
  const id = newId('g');
  const used = new Set(s.groups.map((g) => g.color));
  const color = group.color ?? (Object.keys(GROUP_COLORS) as GroupColor[]).find((c) => !used.has(c)) ?? 'blue';
  const made: Group = { id, name: group.name ?? '', color, symbol: group.symbol ?? 'star', collapsed: false };
  return moveIntoGroup({ ...s, groups: [...s.groups, made] }, ids, id);
}

/** Moves tabs into an existing group, next to its other tabs. */
export function moveIntoGroup(s: TabsState, ids: string[], groupId: string): TabsState {
  const moving = new Set(ids);
  const picked = s.tabs.filter((t) => moving.has(t.id)).map((t) => ({ ...t, groupId }));
  const rest = s.tabs.filter((t) => !moving.has(t.id));
  const lastInGroup = rest.map((t) => t.groupId).lastIndexOf(groupId);
  const firstPicked = s.tabs.findIndex((t) => moving.has(t.id));
  const at = lastInGroup >= 0 ? lastInGroup + 1 : Math.min(firstPicked, rest.length);
  rest.splice(at, 0, ...picked);
  return dropEmptyGroups({ ...s, tabs: rest });
}

/** Takes a tab out of its group, just after the group. */
export function ungroupTab(s: TabsState, id: string): TabsState {
  const tab = s.tabs.find((t) => t.id === id);
  if (!tab?.groupId) return s;
  const rest = s.tabs.filter((t) => t.id !== id);
  const after = rest.map((t) => t.groupId).lastIndexOf(tab.groupId);
  rest.splice(after + 1, 0, { ...tab, groupId: null });
  return dropEmptyGroups({ ...s, tabs: rest });
}

export function updateGroup(s: TabsState, id: string, changes: Partial<Omit<Group, 'id'>>): TabsState {
  return { ...s, groups: s.groups.map((g) => (g.id === id ? { ...g, ...changes } : g)) };
}

/** Collapsing the group of the open tab moves to the next tab outside it, as Chrome does. */
export function toggleGroup(s: TabsState, id: string): TabsState {
  const group = s.groups.find((g) => g.id === id);
  if (!group) return s;
  const next = updateGroup(s, id, { collapsed: !group.collapsed });
  const active = s.tabs.find((t) => t.id === s.activeId);
  if (!group.collapsed && active?.groupId === id) {
    const outside = s.tabs.find((t) => t.groupId !== id);
    if (outside) return { ...next, activeId: outside.id };
    return updateGroup(s, id, { collapsed: false });
  }
  return next;
}

export function ungroupAll(s: TabsState, id: string): TabsState {
  return dropEmptyGroups({ ...s, tabs: s.tabs.map((t) => (t.groupId === id ? { ...t, groupId: null } : t)) });
}

export function closeGroup(s: TabsState, id: string): TabsState {
  return closeTabs(s, s.tabs.filter((t) => t.groupId === id).map((t) => t.id));
}

function dropEmptyGroups(s: TabsState): TabsState {
  const used = new Set(s.tabs.map((t) => t.groupId));
  return s.groups.every((g) => used.has(g.id)) ? s : { ...s, groups: s.groups.filter((g) => used.has(g.id)) };
}

// --------------------------------------------------------------------- store

function valid(s: unknown): s is TabsState {
  const v = s as TabsState;
  return !!v && Array.isArray(v.tabs) && v.tabs.length > 0 && Array.isArray(v.groups) && typeof v.activeId === 'string' && v.tabs.every((t) => typeof t.id === 'string' && typeof t.path === 'string' && t.path.startsWith('/'));
}

function load(): TabsState {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) ?? 'null');
    if (valid(saved)) return saved.tabs.some((t) => t.id === saved.activeId) ? saved : { ...saved, activeId: saved.tabs[0].id };
  } catch {
    // Unreadable: start fresh.
  }
  return initialState(location.pathname + location.search);
}

let state: TabsState | null = null;
const listeners = new Set<() => void>();

export function getTabs(): TabsState {
  state ??= load();
  return state;
}

export function updateTabs(change: (s: TabsState) => TabsState) {
  const next = change(getTabs());
  if (next === state) return;
  state = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Tabs still work; they are just not kept.
  }
  listeners.forEach((l) => l());
}

// Each Browse window keeps its own tabs while open; the last one to change saves them.
function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useTabs(): TabsState {
  return useSyncExternalStore(subscribe, getTabs, getTabs);
}

/** For tests: start again from a given state. */
export function resetTabs(s: TabsState | null) {
  state = s;
}
