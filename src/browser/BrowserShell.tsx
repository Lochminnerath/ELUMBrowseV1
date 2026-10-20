import { ChevronDown, Ellipsis, Plus, RotateCw, X } from 'lucide-react';
import { useEffect, useRef, useState, type ComponentType, type CSSProperties, type FormEvent, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Menu, type MenuEntry } from '../components/Menu';
import { Popover } from '../components/Popover';
import * as Icons from '../components/icons/ElumIcons';
import type { IconProps } from '../components/icons/ElumIcons';
import { useFavicon } from '../lib/favicon';
import { openElsewhere } from '../lib/elum';
import { coverAddress, describe, frameUrl, resolveElum } from './places';
import {
  activate,
  closeGroup,
  closeTabs,
  duplicate,
  getTabs,
  GROUP_COLORS,
  GROUP_SYMBOLS,
  groupTabs,
  moveIntoGroup,
  openTab,
  setPath,
  toggleGroup,
  ungroupAll,
  ungroupTab,
  updateGroup,
  updateTabs,
  useTabs,
  type Group,
  type GroupColor,
  type GroupSymbol,
  type Tab,
} from './tabs';
import './browser.css';

export const SYMBOL_ICONS: Record<GroupSymbol, ComponentType<IconProps>> = {
  star: Icons.StarIcon,
  compose: Icons.ComposeIcon,
  archive: Icons.ArchiveIcon,
  share: Icons.ShareIcon,
  send: Icons.SendIcon,
  present: Icons.PresentIcon,
  private: Icons.PrivateIcon,
  verified: Icons.VerifiedIcon,
  saved: Icons.SavedIcon,
  link: Icons.LinkIcon,
  invite: Icons.InviteIcon,
  warning: Icons.WarningIcon,
};

/** Sign-in pages pass through a tab without becoming its page. */
const passing = (path: string) => path.startsWith('/auth/');

/** Searches the web, or opens the ELUM place a search names, in the open tab. */
export function useGo() {
  const navigate = useNavigate();
  return (query: string, opts: { kind?: 'images'; web?: boolean } = {}) => {
    const { kind, web } = opts;
    const q = query.trim();
    if (!q) return;
    const place = kind || web ? null : resolveElum(q);
    navigate(place ?? `/search?q=${encodeURIComponent(q)}${kind ? `&kind=${kind}` : ''}`);
  };
}

/**
 * Browse as a browser: tabs (with groups) above the page. Search and Browse's own pages render
 * through the router as before; ELUM apps open in frames that stay loaded while you switch tabs.
 */
export function BrowserShell({ children }: { children: ReactNode }) {
  const s = useTabs();
  const location = useLocation();
  const navigate = useNavigate();
  const here = location.pathname + location.search;
  const active = s.tabs.find((t) => t.id === s.activeId) ?? s.tabs[0];
  const shownId = useRef<string | null>(null);
  const [reloads, setReloads] = useState<Record<string, number>>({});

  // The address and the open tab follow each other: switching tabs goes to that tab's page, and
  // going somewhere changes the open tab's page.
  useEffect(() => {
    if (shownId.current === null) {
      // First load: the address wins (a link, a reload), opening a tab for it if none has it.
      shownId.current = active.id;
      if (!passing(here) && active.path !== here) {
        const existing = getTabs().tabs.find((t) => t.path === here);
        updateTabs((st) => (existing ? activate(st, existing.id) : here === '/' ? st : openTab(st, here)));
        if (!existing && here === '/') navigate(active.path, { replace: true });
      }
      return;
    }
    if (shownId.current !== active.id) {
      shownId.current = active.id;
      if (active.path !== here) navigate(active.path);
      return;
    }
    if (!passing(here) && active.path !== here) updateTabs((st) => setPath(st, st.activeId, here));
  }, [active.id, active.path, here, navigate]);

  const place = describe(active.path);
  const onApp = place.kind === 'app';
  // The browser's own tab shows the app open in Browse.
  useFavicon(onApp && place.app ? `/brand/apps/${place.app.id}.svg` : null);
  useEffect(() => {
    if (onApp) document.title = `ELUM ${place.title} · Browse`;
  }, [onApp, place.title]);

  return (
    <div className="browser">
      <TabStrip />
      <div className="browser__body">
        {onApp && <AppToolbar tab={active} onReload={() => setReloads((r) => ({ ...r, [active.id]: (r[active.id] ?? 0) + 1 }))} />}
        <div className="browser__page" hidden={onApp}>
          {children}
        </div>
        <AppFrames activeId={active.id} onApp={onApp} reloads={reloads} />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- the frames

/** Every app tab opened so far keeps its frame; only the open one shows. */
function AppFrames({ activeId, onApp, reloads }: { activeId: string; onApp: boolean; reloads: Record<string, number> }) {
  const { tabs } = useTabs();
  const [opened, setOpened] = useState<Set<string>>(() => new Set());
  useEffect(() => {
    if (onApp && !opened.has(activeId)) setOpened((o) => new Set(o).add(activeId));
  }, [onApp, activeId, opened]);

  return (
    <div className="browser__frames" hidden={!onApp}>
      {tabs.map((t) => {
        const src = frameUrl(t.path);
        if (!src || !(opened.has(t.id) || (onApp && t.id === activeId))) return null;
        const place = describe(t.path);
        return (
          <iframe
            key={`${t.id}:${reloads[t.id] ?? 0}`}
            className="browser__frame"
            src={src}
            title={`ELUM ${place.title}`}
            hidden={t.id !== activeId}
            allow="clipboard-read; clipboard-write; fullscreen"
            allowFullScreen
          />
        );
      })}
    </div>
  );
}

/** Over an app: its elum.services address, reload, and its own window. */
function AppToolbar({ tab, onReload }: { tab: Tab; onReload(): void }) {
  const go = useGo();
  const place = describe(tab.path);
  const address = coverAddress(tab.path);
  const [editing, setEditing] = useState<string | null>(null);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (editing?.trim()) go(editing);
    setEditing(null);
  };
  const real = frameUrl(tab.path);
  return (
    <div className="app-bar" style={{ '--app': place.app?.color } as CSSProperties}>
      <button type="button" className="icon-btn app-bar__btn" aria-label="Reload" data-tip="Reload" onClick={onReload}>
        <RotateCw size={17} strokeWidth={1.75} />
      </button>
      <form className="app-bar__address" onSubmit={submit} role="search">
        <span className="app-bar__lock" aria-hidden="true">
          <Icons.PrivateIcon size={16} />
        </span>
        <input
          aria-label="Address, or search the web"
          value={editing ?? address}
          spellCheck={false}
          onFocus={(e) => {
            // It already shows the address: select it now, so typing replaces it from the first key.
            e.target.select();
            setEditing(address);
          }}
          onChange={(e) => setEditing(e.target.value)}
          onBlur={() => setEditing(null)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') (e.target as HTMLInputElement).blur();
          }}
        />
        <span className="app-bar__badge">ELUM {place.title}</span>
      </form>
      <button
        type="button"
        className="elum-btn elum-btn--secondary elum-btn--sm app-bar__window"
        onClick={() => real && void openElsewhere(real, true)}
        data-tip="Open in a window of its own, signed in"
      >
        <Icons.OpenIcon size={16} />
        <span>Open in new window</span>
      </button>
    </div>
  );
}

// ---------------------------------------------------------------- the strip

function TabSymbol({ path }: { path: string }) {
  const place = describe(path);
  if (place.kind === 'app' && place.app) {
    return (
      <span className="tab__mark" aria-hidden="true">
        <img className="theme-light-only" src={`/brand/apps/${place.app.id}.svg`} alt="" />
        <img className="theme-dark-only" src={`/brand/apps/${place.app.id}-reversed.svg`} alt="" />
      </span>
    );
  }
  if (place.kind === 'search') return <span className="tab__disc tab__disc--search" aria-hidden="true" />;
  if (place.kind === 'docs') return <span className="tab__disc tab__disc--docs" aria-hidden="true" />;
  if (place.kind === 'status') return <span className="tab__disc tab__disc--status" aria-hidden="true" />;
  return (
    <span className="tab__mark" aria-hidden="true">
      <img className="theme-light-only" src="/brand/apps/browse.svg" alt="" />
      <img className="theme-dark-only" src="/brand/apps/browse-reversed.svg" alt="" />
    </span>
  );
}

function TabStrip() {
  const s = useTabs();
  const strip = useRef<HTMLDivElement>(null);
  const items: ReactNode[] = [];
  const seen = new Set<string>();
  for (const t of s.tabs) {
    const group = t.groupId ? s.groups.find((g) => g.id === t.groupId) : undefined;
    if (group && !seen.has(group.id)) {
      seen.add(group.id);
      items.push(<GroupChip key={group.id} group={group} count={s.tabs.filter((x) => x.groupId === group.id).length} />);
    }
    if (group?.collapsed) continue;
    items.push(<TabButton key={t.id} tab={t} group={group} active={t.id === s.activeId} />);
  }

  // Keep the open tab in view.
  useEffect(() => {
    strip.current?.querySelector<HTMLElement>('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, [s.activeId]);

  return (
    <div className="tabstrip">
      <div className="tabstrip__tabs" role="tablist" aria-label="Tabs" ref={strip}>
        {items}
      </div>
      <button type="button" className="tabstrip__new" aria-label="New tab" data-tip="New tab" onClick={() => updateTabs((st) => openTab(st, '/'))}>
        <Plus size={18} strokeWidth={2} />
      </button>
    </div>
  );
}

function TabButton({ tab, group, active }: { tab: Tab; group?: Group; active: boolean }) {
  const s = useTabs();
  const [menuOpen, setMenuOpen] = useState(false);
  const place = describe(tab.path);
  const color = group ? GROUP_COLORS[group.color] : undefined;

  const items = (): MenuEntry[] => {
    const others = s.groups.filter((g) => g.id !== tab.groupId);
    return [
      { label: 'New tab to the right', onSelect: () => updateTabs((st) => openTab(st, '/', { after: tab.id })) },
      { label: 'Duplicate', icon: <Icons.DuplicateIcon size={16} />, onSelect: () => updateTabs((st) => duplicate(st, tab.id)) },
      {
        label: 'Move to new window',
        icon: <Icons.OpenIcon size={16} />,
        onSelect: () => {
          window.open(`${location.origin}${tab.path}`, '_blank', 'noopener');
          updateTabs((st) => closeTabs(st, [tab.id]));
        },
      },
      'separator',
      { label: 'Add to new group', icon: <Icons.StarIcon size={16} />, onSelect: () => updateTabs((st) => groupTabs(st, [tab.id])) },
      ...(others.length
        ? [
            {
              label: 'Add to group',
              items: others.map((g) => ({
                label: g.name || 'Unnamed group',
                icon: <span className="menu-dot" style={{ background: GROUP_COLORS[g.color] }} />,
                onSelect: () => updateTabs((st) => moveIntoGroup(st, [tab.id], g.id)),
              })),
            },
          ]
        : []),
      ...(tab.groupId ? [{ label: 'Remove from group', onSelect: () => updateTabs((st) => ungroupTab(st, tab.id)) }] : []),
      'separator',
      { label: 'Close tab', icon: <Icons.DeleteIcon size={16} />, onSelect: () => updateTabs((st) => closeTabs(st, [tab.id])) },
      ...(s.tabs.length > 1
        ? [{ label: 'Close other tabs', onSelect: () => updateTabs((st) => closeTabs(st, st.tabs.filter((t) => t.id !== tab.id).map((t) => t.id))) }]
        : []),
    ];
  };

  return (
    <div
      className="tab"
      data-active={active || undefined}
      data-grouped={group ? true : undefined}
      style={color ? ({ '--group': color } as CSSProperties) : undefined}
      onContextMenu={(e) => {
        e.preventDefault();
        setMenuOpen(true);
      }}
      onAuxClick={(e) => {
        if (e.button === 1) updateTabs((st) => closeTabs(st, [tab.id]));
      }}
    >
      <button type="button" role="tab" aria-selected={active} className="tab__main" title={place.kind === 'app' ? coverAddress(tab.path) : place.title} onClick={() => updateTabs((st) => activate(st, tab.id))}>
        <TabSymbol path={tab.path} />
        <span className="tab__title">{place.title}</span>
      </button>
      <Menu
        label={`${place.title} tab`}
        items={items}
        open={menuOpen}
        onOpenChange={setMenuOpen}
        trigger={(props) => (
          <button type="button" className="tab__more" aria-label={`More for ${place.title}`} {...props}>
            <Ellipsis size={14} strokeWidth={2} />
          </button>
        )}
      />
      <button type="button" className="tab__close" aria-label={`Close ${place.title}`} onClick={() => updateTabs((st) => closeTabs(st, [tab.id]))}>
        <X size={14} strokeWidth={2} />
      </button>
    </div>
  );
}

function GroupChip({ group, count }: { group: Group; count: number }) {
  const [open, setOpen] = useState(false);
  const Symbol = SYMBOL_ICONS[group.symbol];
  return (
    <Popover
      label="Tab group"
      className="group-pop"
      open={open}
      onOpenChange={setOpen}
      trigger={(props) => (
        <button
          type="button"
          {...props}
          className="group-chip"
          data-collapsed={group.collapsed || undefined}
          style={{ '--group': GROUP_COLORS[group.color] } as CSSProperties}
          aria-label={`${group.name || 'Unnamed group'}, ${count} ${count === 1 ? 'tab' : 'tabs'}${group.collapsed ? ', collapsed' : ''}. Right-click to edit.`}
          aria-expanded={!group.collapsed}
          data-tip="Click to fold, right-click to edit"
          onClick={() => updateTabs((st) => toggleGroup(st, group.id))}
          onContextMenu={(e) => {
            e.preventDefault();
            setOpen(true);
          }}
        >
          <span className="group-chip__symbol">
            <Symbol size={15} />
          </span>
          {group.name && <span className="group-chip__name">{group.name}</span>}
          {group.collapsed && <span className="group-chip__count">{count}</span>}
          <ChevronDown size={12} strokeWidth={2.5} className="group-chip__fold" aria-hidden="true" />
        </button>
      )}
    >
      {(close) => <GroupEditor group={group} close={close} />}
    </Popover>
  );
}

/** Name, colour and symbol for a group, and what to do with its tabs. */
function GroupEditor({ group, close }: { group: Group; close(): void }) {
  const [name, setName] = useState(group.name);
  const set = (changes: Partial<Group>) => updateTabs((st) => updateGroup(st, group.id, changes));
  return (
    <div className="group-editor">
      <input
        className="group-editor__name"
        aria-label="Group name"
        placeholder="Name this group"
        value={name}
        maxLength={40}
        autoFocus
        onChange={(e) => {
          setName(e.target.value);
          set({ name: e.target.value });
        }}
        onKeyDown={(e) => e.key === 'Enter' && close()}
      />
      <div className="group-editor__row" role="radiogroup" aria-label="Colour">
        {(Object.keys(GROUP_COLORS) as GroupColor[]).map((c) => (
          <button
            key={c}
            type="button"
            role="radio"
            aria-checked={group.color === c}
            aria-label={c}
            className="group-editor__colour"
            style={{ background: GROUP_COLORS[c] }}
            onClick={() => set({ color: c })}
          />
        ))}
      </div>
      <div className="group-editor__row group-editor__symbols" role="radiogroup" aria-label="Symbol">
        {GROUP_SYMBOLS.map((sym) => {
          const Icon = SYMBOL_ICONS[sym];
          return (
            <button key={sym} type="button" role="radio" aria-checked={group.symbol === sym} aria-label={sym} className="group-editor__symbol" onClick={() => set({ symbol: sym })}>
              <Icon size={18} />
            </button>
          );
        })}
      </div>
      <div className="group-editor__actions">
        <button
          type="button"
          className="group-editor__action"
          onClick={() => {
            updateTabs((st) => {
              const last = [...st.tabs].reverse().find((t) => t.groupId === group.id);
              return last ? openTab(st, '/', { after: last.id }) : st;
            });
            close();
          }}
        >
          <Plus size={15} /> New tab in group
        </button>
        <button
          type="button"
          className="group-editor__action"
          onClick={() => {
            updateTabs((st) => ungroupAll(st, group.id));
            close();
          }}
        >
          Ungroup
        </button>
        <button
          type="button"
          className="group-editor__action group-editor__action--danger"
          onClick={() => {
            updateTabs((st) => closeGroup(st, group.id));
            close();
          }}
        >
          <Icons.DeleteIcon size={15} /> Close group
        </button>
      </div>
    </div>
  );
}
