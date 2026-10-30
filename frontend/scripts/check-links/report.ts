import type { Problem } from './types';

interface Row {
  page: string;
  link: string;
  problem: string;
}

/** Renders the problems as a plain-text table: page | link | problem. */
export function formatReport(problems: Problem[]): string {
  if (problems.length === 0) return 'No broken links found.';
  const header: Row = { page: 'page', link: 'link', problem: 'problem' };
  const rows: Row[] = problems.map((p) => ({ page: p.page, link: p.link, problem: p.reason }));
  const all = [header, ...rows];
  const pageWidth = Math.max(...all.map((row) => row.page.length));
  const linkWidth = Math.max(...all.map((row) => row.link.length));
  const line = (row: Row): string => `${row.page.padEnd(pageWidth)} | ${row.link.padEnd(linkWidth)} | ${row.problem}`;
  const rule = `${'-'.repeat(pageWidth + 1)}+${'-'.repeat(linkWidth + 2)}+${'-'.repeat(9)}`;
  return [line(header), rule, ...rows.map(line), '', `${problems.length} problem(s) found.`].join('\n');
}
