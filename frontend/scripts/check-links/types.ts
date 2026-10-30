/** One URL-bearing attribute found in a page's HTML. */
export interface LinkRef {
  /** Lower-case tag name: a, form, img, source or video. */
  tag: string;
  /** Attribute holding the URL: href, action, src or poster. */
  attr: string;
  /** Raw attribute value as written in the HTML ('' when empty). */
  value: string;
}

export interface PageRefs {
  anchors: LinkRef[];
  forms: LinkRef[];
  media: LinkRef[];
  /** Every id attribute value on the page, used for #fragment checks. */
  ids: Set<string>;
}

/** One broken or malformed link, printed as a row of the report. */
export interface Problem {
  page: string;
  link: string;
  reason: string;
}

/** Result of one GET request. Text is kept only for 200 responses. */
export interface FetchResult {
  /** HTTP status after redirects; 0 when the request itself failed. */
  status: number;
  /** Final URL after redirects. */
  finalUrl: string;
  /** Lower-case Content-Type header, '' when absent. */
  contentType: string;
  /** Response body as text for 200 responses, null otherwise. */
  text: string | null;
  /** Network or timeout error message when status is 0. */
  error?: string;
}

export type Fetcher = (url: string) => Promise<FetchResult>;
