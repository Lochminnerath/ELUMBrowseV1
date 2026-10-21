import { describe, expect, it } from 'vitest';
import { cleanArticle } from './WebView';

describe('cleanArticle', () => {
  it('keeps the article and drops anything that could run', () => {
    const html = cleanArticle(
      '<h2 onclick="steal()">Diet</h2><p style="color:red" class="x">Foxes eat <a href="https://en.wikipedia.org/wiki/Vole">voles</a>.</p>' +
        '<script>steal()</script><iframe src="https://evil.example"></iframe><img src="https://upload.wikimedia.org/fox.jpg" onerror="steal()">' +
        '<a href="javascript:steal()">click</a><form action="https://evil.example"><input name="pw"></form>',
    );
    expect(html).toContain('<h2>Diet</h2>');
    expect(html).toContain('href="https://en.wikipedia.org/wiki/Vole"');
    expect(html).toContain('src="https://upload.wikimedia.org/fox.jpg"');
    for (const bad of ['<script', 'steal()', '<iframe', 'javascript:', '<form', '<input', 'style=', 'class=']) expect(html).not.toContain(bad);
  });
});
