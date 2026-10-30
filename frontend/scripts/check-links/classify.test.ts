import { describe, expect, it } from 'vitest';
import { classifyUrl, isInlineMedia } from './classify';

const origin = new URL('http://127.0.0.1:3000');
const page = new URL('http://127.0.0.1:3000/ru/faq');

describe('classifyUrl', () => {
  it('resolves relative and same-origin URLs as internal', () => {
    const target = classifyUrl('../kk/faq#q1', page, origin);
    expect(target).toMatchObject({ kind: 'internal' });
    if (target.kind === 'internal') expect(target.url.href).toBe('http://127.0.0.1:3000/kk/faq#q1');
    expect(classifyUrl('/products/x', page, origin)).toMatchObject({ kind: 'internal' });
  });

  it('treats other hosts and contact schemes as external', () => {
    expect(classifyUrl('https://wa.me/77066620060', page, origin)).toEqual({ kind: 'external', href: 'https://wa.me/77066620060' });
    expect(classifyUrl('tel:+77066620060', page, origin)).toEqual({ kind: 'external', href: 'tel:+77066620060' });
    expect(classifyUrl('mailto:a@b.kz', page, origin)).toEqual({ kind: 'external', href: 'mailto:a@b.kz' });
  });

  it('reports empty values and unusable schemes as problems', () => {
    expect(classifyUrl('  ', page, origin)).toEqual({ kind: 'problem', reason: 'empty URL' });
    expect(classifyUrl('javascript:void(0)', page, origin)).toMatchObject({ kind: 'problem' });
    expect(classifyUrl('ftp://x.kz/a', page, origin)).toMatchObject({ kind: 'problem' });
    expect(classifyUrl('http://[bad', page, origin)).toMatchObject({ kind: 'problem', reason: 'unparseable URL' });
  });
});

describe('isInlineMedia', () => {
  it('skips data and blob URLs', () => {
    expect(isInlineMedia({ tag: 'img', attr: 'src', value: 'data:image/gif;base64,R0lG' })).toBe(true);
    expect(isInlineMedia({ tag: 'img', attr: 'src', value: '/a.png' })).toBe(false);
  });
});
