// Single entry point for the catalog. The objects live in src/data/products/{category}.js
// (each file: export default [ ...products ]). Adding a product = one object in the right file.
import websites from './products/websites.js';
import ecommerce from './products/ecommerce.js';
import bots from './products/bots.js';
import ai from './products/ai.js';
import automation from './products/automation.js';
import seoMaps from './products/seo-maps.js';
import support from './products/support.js';
import education from './products/education.js';

export const products = [...websites, ...ecommerce, ...bots, ...ai, ...automation, ...seoMaps, ...support, ...education];
