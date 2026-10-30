import { parse } from 'node-html-parser';
import type { LinkRef, PageRefs } from './types';

type Bucket = 'anchors' | 'forms' | 'media';

interface Rule {
  selector: string;
  bucket: Bucket;
  tag: string;
  attr: string;
}

/** Every element and attribute the crawler checks. */
const RULES: Rule[] = [
  { selector: 'a[href]', bucket: 'anchors', tag: 'a', attr: 'href' },
  { selector: 'form[action]', bucket: 'forms', tag: 'form', attr: 'action' },
  { selector: 'img[src]', bucket: 'media', tag: 'img', attr: 'src' },
  { selector: 'source[src]', bucket: 'media', tag: 'source', attr: 'src' },
  { selector: 'video[src]', bucket: 'media', tag: 'video', attr: 'src' },
  { selector: 'video[poster]', bucket: 'media', tag: 'video', attr: 'poster' },
];

/** Pure: collects links, form actions, media URLs and ids from one HTML document. */
export function extractRefs(html: string): PageRefs {
  const root = parse(html);
  const refs: PageRefs = { anchors: [], forms: [], media: [], ids: new Set<string>() };
  for (const el of root.querySelectorAll('[id]')) {
    const id = el.getAttribute('id');
    if (id) refs.ids.add(id);
  }
  for (const rule of RULES) {
    for (const el of root.querySelectorAll(rule.selector)) {
      const ref: LinkRef = { tag: rule.tag, attr: rule.attr, value: el.getAttribute(rule.attr) ?? '' };
      refs[rule.bucket].push(ref);
    }
  }
  return refs;
}
