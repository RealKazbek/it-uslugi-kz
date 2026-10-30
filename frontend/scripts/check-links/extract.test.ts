import { describe, expect, it } from 'vitest';
import { extractRefs } from './extract';

describe('extractRefs', () => {
  it('collects anchors, form actions, media and ids', () => {
    const refs = extractRefs(`
      <header id="top"><a href="/ru/faq">FAQ</a></header>
      <a name="legacy">no href</a>
      <form action="/api/lead"></form>
      <form></form>
      <img src="/_next/image?url=x&w=64">
      <picture><source src="/a.webp"></picture>
      <video src="/v.mp4" poster="/p.jpg"></video>
    `);
    expect(refs.anchors).toEqual([{ tag: 'a', attr: 'href', value: '/ru/faq' }]);
    expect(refs.forms).toEqual([{ tag: 'form', attr: 'action', value: '/api/lead' }]);
    expect(refs.media.map((ref) => `${ref.tag} ${ref.attr} ${ref.value}`)).toEqual([
      'img src /_next/image?url=x&w=64',
      'source src /a.webp',
      'video src /v.mp4',
      'video poster /p.jpg',
    ]);
    expect(refs.ids.has('top')).toBe(true);
    expect(refs.ids.has('legacy')).toBe(false);
  });

  it('keeps empty href and src values so they can be reported', () => {
    const refs = extractRefs('<a href="">x</a><img src="">');
    expect(refs.anchors[0]?.value).toBe('');
    expect(refs.media[0]?.value).toBe('');
  });
});
