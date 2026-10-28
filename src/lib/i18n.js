import { ru } from '../content/ru.js';
import { kk } from '../content/kk.js';

export const T = { ru, kk };
export const other = (lang) => (lang === 'ru' ? 'kk' : 'ru');
