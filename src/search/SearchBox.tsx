import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { coverAddress, describe, resolveElum } from '../browser/places';
import { recentSearches } from './local';

interface SearchBoxProps {
  initial?: string;
  size?: 'large' | 'compact';
  autoFocus?: boolean;
  /** `web` is true when someone chose to search the web for words that also name an ELUM app. */
  onSearch(q: string, web?: boolean): void;
}

interface Option {
  key: string;
  text: string;
  hint?: string;
  kind: 'place' | 'web' | 'recent';
  value: string;
}

/**
 * The search box: a glass pill with the Browse discs as its symbol. "/" jumps to it from anywhere;
 * recent searches from this browser show as you type.
 */
export function SearchBox({ initial = '', size = 'large', autoFocus, onSearch }: SearchBoxProps) {
  const [value, setValue] = useState(initial);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const input = useRef<HTMLInputElement>(null);
  const listId = useId();

  useEffect(() => setValue(initial), [initial]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = e.target instanceof HTMLElement && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName);
      if (e.key === '/' && !typing && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        input.current?.focus();
        input.current?.select();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const typed = value.trim().toLowerCase();
  // Words that name an ELUM app open it; the first two options say so, and offer the web instead.
  const place = typed ? resolveElum(typed) : null;
  const placeOptions: Option[] = place
    ? [
        { key: 'place', kind: 'place', value: value.trim(), text: `Open ${describe(place).kind === 'app' ? `ELUM ${describe(place).title}` : describe(place).title}`, hint: coverAddress(place) },
        { key: 'web', kind: 'web', value: value.trim(), text: `Search the web for “${value.trim()}”` },
      ]
    : [];
  const recent: Option[] = recentSearches()
    .filter((q) => q.toLowerCase() !== typed && q.toLowerCase().startsWith(typed))
    .slice(0, 6)
    .map((q) => ({ key: `r-${q}`, kind: 'recent', value: q, text: q }));
  const suggestions = open ? [...placeOptions, ...recent] : [];

  const go = (option: Pick<Option, 'kind' | 'value'>) => {
    const clean = option.value.replace(/\s+/g, ' ').trim();
    if (!clean) return;
    setOpen(false);
    setActive(-1);
    input.current?.blur();
    onSearch(clean, option.kind === 'web');
  };
  const submit = (e: FormEvent) => {
    e.preventDefault();
    go(active >= 0 ? suggestions[active] : { kind: 'recent', value });
  };

  return (
    <form className={`searchbox searchbox--${size}`} role="search" onSubmit={submit}>
      <span className="searchbox__mark" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="22" height="22">
          <circle cx="10" cy="10" r="6.6" fill="none" stroke="currentColor" strokeWidth="1.9" />
          <circle cx="17" cy="17" r="3.6" fill="var(--browse)" />
        </svg>
      </span>
      <input
        ref={input}
        className="searchbox__input"
        type="search"
        name="q"
        value={value}
        placeholder="Search the web"
        aria-label="Search the web"
        autoComplete="off"
        spellCheck={false}
        enterKeyHint="search"
        autoFocus={autoFocus}
        role="combobox"
        aria-expanded={suggestions.length > 0}
        aria-controls={listId}
        aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined}
        onFocus={() => setOpen(true)}
        onBlur={() => window.setTimeout(() => setOpen(false), 120)}
        onChange={(e) => {
          setValue(e.target.value);
          setActive(-1);
          setOpen(true);
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown' && suggestions.length) {
            e.preventDefault();
            setActive((i) => (i + 1) % suggestions.length);
          } else if (e.key === 'ArrowUp' && suggestions.length) {
            e.preventDefault();
            setActive((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
          } else if (e.key === 'Escape') {
            setOpen(false);
          }
        }}
      />
      {value && (
        <button type="button" className="searchbox__clear" aria-label="Clear" onClick={() => (setValue(''), input.current?.focus())}>
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path d="M7 7l10 10M17 7L7 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      )}
      <button type="submit" className="searchbox__go" aria-label="Search">
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path d="M5 12h12M12 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {suggestions.length > 0 && (
        <ul className="searchbox__list" id={listId} role="listbox" aria-label="Suggestions">
          {suggestions.map((o, i) => (
            <li
              key={o.key}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={i === active}
              className="searchbox__option"
              data-kind={o.kind}
              onMouseDown={(e) => {
                e.preventDefault();
                go(o);
              }}
            >
              <span className="searchbox__option-dot" aria-hidden="true" />
              <span className="searchbox__option-text">{o.text}</span>
              {o.hint && <span className="searchbox__option-hint">{o.hint}</span>}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
