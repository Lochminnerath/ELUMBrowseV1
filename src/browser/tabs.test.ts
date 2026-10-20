import { describe, expect, it } from 'vitest';
import { activate, closeGroup, closeTabs, groupTabs, initialState, moveIntoGroup, openTab, toggleGroup, ungroupAll, ungroupTab, type TabsState } from './tabs';

const paths = (s: TabsState) => s.tabs.map((t) => t.path);
const three = () => {
  let s = initialState('/a');
  s = openTab(s, '/b');
  s = openTab(s, '/c');
  return s;
};

describe('tabs', () => {
  it('open after the open tab and become the open tab', () => {
    let s = initialState('/a');
    s = openTab(s, '/b');
    s = activate(s, s.tabs[0].id);
    s = openTab(s, '/c');
    expect(paths(s)).toEqual(['/a', '/c', '/b']);
    expect(s.tabs.find((t) => t.id === s.activeId)!.path).toBe('/c');
  });

  it('closing the open tab opens its neighbour; closing the last leaves a new tab', () => {
    let s = three();
    s = closeTabs(s, [s.activeId]);
    expect(paths(s)).toEqual(['/a', '/b']);
    expect(s.tabs.find((t) => t.id === s.activeId)!.path).toBe('/b');
    s = closeTabs(s, s.tabs.map((t) => t.id));
    expect(paths(s)).toEqual(['/']);
  });
});

describe('groups', () => {
  it('gather their tabs together, with a colour and a symbol', () => {
    let s = three();
    const [a, , c] = s.tabs;
    s = groupTabs(s, [a.id, c.id], { name: 'Trip' });
    expect(paths(s)).toEqual(['/a', '/c', '/b']);
    expect(s.groups).toHaveLength(1);
    expect(s.groups[0]).toMatchObject({ name: 'Trip', color: 'blue', symbol: 'star' });
    const next = groupTabs(s, [s.tabs[2].id]);
    expect(next.groups[1].color).not.toBe('blue');
  });

  it('new tabs opened from a grouped tab join its group', () => {
    let s = three();
    s = groupTabs(s, [s.tabs[0].id]);
    s = activate(s, s.tabs[0].id);
    s = openTab(s, '/d');
    expect(s.tabs[1]).toMatchObject({ path: '/d', groupId: s.groups[0].id });
  });

  it('move tabs in and out, and disappear when empty', () => {
    let s = three();
    s = groupTabs(s, [s.tabs[0].id]);
    const g = s.groups[0].id;
    s = moveIntoGroup(s, [s.tabs[2].id], g);
    expect(paths(s)).toEqual(['/a', '/c', '/b']);
    s = ungroupTab(s, s.tabs[0].id);
    expect(s.tabs.map((t) => t.groupId)).toEqual([g, null, null]);
    s = ungroupAll(s, g);
    expect(s.groups).toEqual([]);
  });

  it('folding the group of the open tab moves to a tab outside it', () => {
    let s = three();
    s = groupTabs(s, [s.tabs[2].id]);
    s = activate(s, s.tabs[2].id);
    s = toggleGroup(s, s.groups[0].id);
    expect(s.groups[0].collapsed).toBe(true);
    expect(s.tabs.find((t) => t.id === s.activeId)!.groupId).toBeNull();
    // Opening a tab inside unfolds it again.
    s = activate(s, s.tabs[2].id);
    expect(s.groups[0].collapsed).toBe(false);
  });

  it('closing a group closes its tabs', () => {
    let s = three();
    s = groupTabs(s, [s.tabs[0].id, s.tabs[1].id]);
    s = closeGroup(s, s.groups[0].id);
    expect(paths(s)).toEqual(['/c']);
    expect(s.groups).toEqual([]);
  });
});
