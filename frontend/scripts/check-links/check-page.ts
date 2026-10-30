import { checkExternal } from './check-external';
import { checkInternal } from './check-internal';
import { classifyUrl, isInlineMedia } from './classify';
import { extractRefs } from './extract';
import { describeFailure, isHtmlResponse } from './http';
import type { Fetcher, LinkRef, Problem } from './types';

/** Form actions may answer 405 to a GET: the endpoint exists and only accepts POST. */
const FORM_OK_STATUSES = [200, 405];

export interface PageContext {
  /** Display path of the page being checked, e.g. /ru/products/x. */
  page: string;
  pageUrl: URL;
  base: URL;
  fetcher: Fetcher;
}

export interface PageResult {
  problems: Problem[];
  /** Number of link, form and media references examined. */
  checked: number;
  /** Internal page URLs (fragment dropped) to crawl next. */
  discovered: URL[];
}

/** Fetches one page and checks every reference in it. Non-200 pages are reported and not parsed. */
export async function checkPage(url: string, base: URL, fetcher: Fetcher): Promise<PageResult> {
  const pageUrl = new URL(url);
  const page = pageUrl.pathname + pageUrl.search;
  const result: PageResult = { problems: [], checked: 0, discovered: [] };
  const res = await fetcher(url);
  if (res.status !== 200) {
    result.problems.push({ page, link: page, reason: describeFailure(res) });
    return result;
  }
  if (!isHtmlResponse(res) || res.text === null) return result;
  const ctx: PageContext = { page, pageUrl, base, fetcher };
  const refs = extractRefs(res.text);
  for (const ref of refs.anchors) await checkAnchor(ref, ctx, result);
  for (const ref of refs.forms) await checkForm(ref, ctx, result);
  for (const ref of refs.media) await checkMedia(ref, ctx, result);
  return result;
}

function addProblem(ctx: PageContext, result: PageResult, link: string, reason: string): void {
  result.problems.push({ page: ctx.page, link, reason });
}

async function checkAnchor(ref: LinkRef, ctx: PageContext, result: PageResult): Promise<void> {
  result.checked += 1;
  const target = classifyUrl(ref.value, ctx.pageUrl, ctx.base);
  if (target.kind === 'problem') return addProblem(ctx, result, ref.value, target.reason);
  if (target.kind === 'external') {
    const reason = checkExternal(target.href);
    if (reason) addProblem(ctx, result, ref.value, reason);
    return;
  }
  result.discovered.push(new URL(target.url.href));
  const reason = await checkInternal(target.url, ctx.fetcher);
  if (reason) addProblem(ctx, result, ref.value, reason);
}

async function checkForm(ref: LinkRef, ctx: PageContext, result: PageResult): Promise<void> {
  result.checked += 1;
  const target = classifyUrl(ref.value, ctx.pageUrl, ctx.base);
  if (target.kind === 'problem') return addProblem(ctx, result, ref.value, target.reason);
  if (target.kind === 'external') {
    const reason = checkExternal(target.href);
    if (reason) addProblem(ctx, result, ref.value, reason);
    return;
  }
  const reason = await checkInternal(target.url, ctx.fetcher, FORM_OK_STATUSES);
  if (reason) addProblem(ctx, result, ref.value, `form action: ${reason}`);
}

async function checkMedia(ref: LinkRef, ctx: PageContext, result: PageResult): Promise<void> {
  result.checked += 1;
  if (isInlineMedia(ref)) return;
  const target = classifyUrl(ref.value, ctx.pageUrl, ctx.base);
  if (target.kind === 'problem') return addProblem(ctx, result, ref.value, target.reason);
  if (target.kind === 'external') {
    const reason = checkExternal(target.href);
    if (reason) addProblem(ctx, result, ref.value, reason);
    return;
  }
  const reason = await checkInternal(target.url, ctx.fetcher);
  if (reason) addProblem(ctx, result, ref.value, `<${ref.tag} ${ref.attr}>: ${reason}`);
}
