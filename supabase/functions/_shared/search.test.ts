import { describe, expect, it } from 'vitest';
import { googleUrl, googleWebUrl, isAiLink, readRequest, toPage } from './search';

describe('reading a search', () => {
  it('cleans the query and keeps paging inside what Google allows', () => {
    expect(readRequest({ q: '  cats   and dogs ' })).toEqual({ q: 'cats and dogs', kind: 'web', start: 1, safe: true });
    expect(readRequest({ q: 'x', start: 500, kind: 'images', safe: false })).toEqual({ q: 'x', kind: 'images', start: 91, safe: false });
    expect(readRequest({ q: 'x', start: -3 })?.start).toBe(1);
    expect(readRequest({ q: '   ' })).toBeNull();
    expect(readRequest(null)).toBeNull();
  });
});

describe('asking Google', () => {
  it('builds the API address with SafeSearch and images', () => {
    const url = new URL(googleUrl({ q: 'red fox', kind: 'images', start: 11, safe: true }, 'KEY', 'CX'));
    expect(url.hostname).toBe('customsearch.googleapis.com');
    expect(url.searchParams.get('q')).toBe('red fox');
    expect(url.searchParams.get('safe')).toBe('active');
    expect(url.searchParams.get('searchType')).toBe('image');
    expect(url.searchParams.get('start')).toBe('11');
  });

  it("links to Google's web-only results, never AI Mode", () => {
    const url = new URL(googleWebUrl('red fox'));
    expect(url.searchParams.get('udm')).toBe('14');
    expect(new URL(googleWebUrl('red fox', 'images')).searchParams.get('udm')).toBe('2');
  });
});

describe('leaving out AI', () => {
  it('spots AI products and AI Mode, and nothing else', () => {
    expect(isAiLink('https://gemini.google.com/app')).toBe(true);
    expect(isAiLink('https://www.gemini.google.com/')).toBe(true);
    expect(isAiLink('https://aistudio.google.com/prompts')).toBe(true);
    expect(isAiLink('https://www.google.com/search?q=x&udm=50')).toBe(true);
    expect(isAiLink('https://www.google.com/search?q=x&udm=14')).toBe(false);
    expect(isAiLink('https://en.wikipedia.org/wiki/Gemini')).toBe(false);
    expect(isAiLink('https://notgemini.google.com.evil.example/')).toBe(false);
    expect(isAiLink('not a url')).toBe(true);
  });

  it('shapes results, drops AI ones and counts them', () => {
    const page = toPage(
      { q: 'gemini', kind: 'web', start: 1, safe: true },
      {
        items: [
          { title: 'Gemini (constellation)', link: 'https://en.wikipedia.org/wiki/Gemini_(constellation)', displayLink: 'en.wikipedia.org', snippet: 'A  zodiac\nconstellation.' },
          { title: 'Gemini', link: 'https://gemini.google.com/', displayLink: 'gemini.google.com', snippet: 'Chat' },
          { title: 'Bad', link: 'javascript:alert(1)' },
        ],
        searchInformation: { totalResults: '1230000' },
        queries: { nextPage: [{ startIndex: 11 }] },
        spelling: { correctedQuery: 'gemini constellation' },
      },
    );
    expect(page.results).toHaveLength(1);
    expect(page.results[0]).toMatchObject({ site: 'en.wikipedia.org', snippet: 'A zodiac constellation.' });
    expect(page.hidden).toBe(1);
    expect(page.total).toBe(1230000);
    expect(page.next).toBe(11);
    expect(page.suggestion).toBe('gemini constellation');
  });

  it('pages stop where the API stops', () => {
    expect(toPage({ q: 'x', kind: 'web', start: 91, safe: true }, { queries: { nextPage: [{ startIndex: 101 }] } }).next).toBeNull();
  });

  it('images link to the page they are on', () => {
    const page = toPage(
      { q: 'fox', kind: 'images', start: 1, safe: true },
      { items: [{ title: 'Fox', link: 'https://img.example/fox.jpg', displayLink: 'example.org', image: { contextLink: 'https://example.org/fox', width: 800, height: 600 } }] },
    );
    expect(page.results[0].url).toBe('https://example.org/fox');
    expect(page.results[0].image).toEqual({ src: 'https://img.example/fox.jpg', width: 800, height: 600, context: 'https://example.org/fox' });
  });
});
