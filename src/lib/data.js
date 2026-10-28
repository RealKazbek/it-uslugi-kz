import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

// Content data is loaded from DATA_DIR (default src/data). config.js always comes from src/data.
const dir = process.env.DATA_DIR ? resolve(process.cwd(), process.env.DATA_DIR) : resolve(process.cwd(), 'src/data');
const load = (name) => import(pathToFileURL(resolve(dir, `${name}.js`)).href);

const [s, c, n] = await Promise.all([load('services'), load('cities'), load('niches')]);

export const services = s.services;
export const cities = c.cities;
export const niches = n.niches;

export const serviceBy = Object.fromEntries(services.map((x) => [x.slug, x]));
export const cityBy = Object.fromEntries(cities.map((x) => [x.slug, x]));
export const nicheBy = Object.fromEntries(niches.map((x) => [x.slug, x]));
