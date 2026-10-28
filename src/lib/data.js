import { resolve } from 'node:path';
import { existsSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

// Content data is loaded from DATA_DIR (default src/data). config.js always comes from src/data.
const dir = process.env.DATA_DIR ? resolve(process.cwd(), process.env.DATA_DIR) : resolve(process.cwd(), 'src/data');
const load = (name) => import(pathToFileURL(resolve(dir, `${name}.js`)).href);

const [c, p, k] = await Promise.all([load('categories'), load('products'), load('cities')]);

export const categories = c.categories;
export const products = p.products;
export const cities = k.cities;

export const categoryBy = Object.fromEntries(categories.map((x) => [x.slug, x]));
export const productBy = Object.fromEntries(products.map((x) => [x.slug, x]));
export const cityBy = Object.fromEntries(cities.map((x) => [x.slug, x]));

export const productsIn = (category) => products.filter((x) => x.category === category);
export const present = (slugs, by) => (slugs || []).filter((s) => by[s]);
export const portfolioDir = resolve(process.cwd(), 'src/assets/portfolio');
export const hasPortfolioImage = (slug) => existsSync(resolve(portfolioDir, `${slug}.webp`));
