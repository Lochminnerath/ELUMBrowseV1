import { describe, expect, it } from 'vitest';
import { hideAiResults, readOutcome, resultTarget } from './googleElement';

function result(href: string) {
  return `<div class="gsc-webResult gsc-result"><div class="gs-title"><a class="gs-title" href="${href}">x</a></div></div>`;
}

describe('hideAiResults', () => {
  it('leaves out results that lead to AI chat products and counts them', () => {
    const root = document.createElement('div');
    root.innerHTML = [
      result('https://en.wikipedia.org/wiki/Red_fox'),
      result('https://gemini.google.com/app'),
      result('https://www.google.com/search?q=fox&udm=50'),
      result('https://www.google.com/search?q=fox&udm=14'),
    ].join('');
    expect(hideAiResults(root)).toBe(2);
    const shown = Array.from(root.querySelectorAll<HTMLElement>('.gsc-result')).map((r) => !r.hidden);
    expect(shown).toEqual([true, false, false, true]);
  });

  it('counts the same results again without hiding twice', () => {
    const root = document.createElement('div');
    root.innerHTML = result('https://aistudio.google.com/');
    expect(hideAiResults(root)).toBe(1);
    expect(hideAiResults(root)).toBe(1);
  });
});

describe('readOutcome', () => {
  const root = (html: string) => Object.assign(document.createElement('div'), { innerHTML: html });

  it('tells results from nothing found and from errors, and waits otherwise', () => {
    expect(readOutcome(root(result('https://en.wikipedia.org/wiki/Otter')))).toBe('results');
    expect(readOutcome(root('<div class="gs-no-results-result">No results</div>'))).toBe('empty');
    expect(readOutcome(root('<div class="gs-error-result">Error</div>'))).toBe('failed');
    expect(readOutcome(root('<div class="gsc-control-cse"></div>'))).toBeNull();
  });
});

describe('resultTarget', () => {
  const link = (href: string, ctorig?: string) => {
    const a = document.createElement('a');
    a.setAttribute('href', href);
    if (ctorig) a.setAttribute('data-ctorig', ctorig);
    return a;
  };

  it('opens the page itself, unwrapping Google click tracking', () => {
    expect(resultTarget(link('https://en.wikipedia.org/wiki/Red_fox'))).toEqual({ url: 'https://en.wikipedia.org/wiki/Red_fox', external: false });
    expect(resultTarget(link('https://www.google.com/url?client=internal-element-cse&q=https://www.bbc.com/news&sa=U'))).toEqual({ url: 'https://www.bbc.com/news', external: false });
    expect(resultTarget(link('https://www.google.com/url?q=x', 'https://example.com/a'))).toEqual({ url: 'https://example.com/a', external: false });
  });

  it('sends Google itself and ads to a new window, and ignores other schemes', () => {
    expect(resultTarget(link('https://www.google.com/search?q=fox&udm=14'))?.external).toBe(true);
    expect(resultTarget(link('https://www.googleadservices.com/pagead/aclk?x=1'))?.external).toBe(true);
    expect(resultTarget(link('javascript:alert(1)'))).toBeNull();
  });
});
