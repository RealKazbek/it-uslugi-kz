export const pages = [];

// alternates: { ru: path, kk: path } only when both versions exist.
export function add(path, html, alternates = null, { indexable = true } = {}) {
  pages.push({ path, html, alternates, indexable });
}
