import { describe, expect, it } from 'vitest';
import { hideAiResults } from './googleElement';

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
