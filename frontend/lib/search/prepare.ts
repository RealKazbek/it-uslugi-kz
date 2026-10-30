import type { SearchDoc } from './types';
import { makeForm, type Form } from './form';
import { normalize, tokenize } from './normalize';
import { STOPWORDS } from './stopwords';
import { expandToken } from './synonyms';
import type { IndexedDoc, QueryTokens } from './score';

function contentForms(text: string): Form[] {
  return tokenize(text)
    .filter((token) => !STOPWORDS.has(token))
    .map(makeForm);
}

export function prepareDoc(doc: SearchDoc): IndexedDoc {
  return {
    doc,
    title: contentForms(doc.title),
    subtitle: contentForms(doc.subtitle ?? ''),
    keywords: contentForms(doc.keywords),
  };
}

/** Stopwords are dropped; each remaining token expands to its synonyms. */
export function buildQuery(query: string): QueryTokens {
  return tokenize(normalize(query))
    .filter((token) => !STOPWORDS.has(token))
    .map((token) => expandToken(token).map(makeForm));
}
