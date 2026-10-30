const CYR_TO_LAT: ReadonlyMap<string, string> = new Map([
  ['а', 'a'], ['б', 'b'], ['в', 'v'], ['г', 'g'], ['д', 'd'], ['е', 'e'], ['ё', 'yo'],
  ['ж', 'zh'], ['з', 'z'], ['и', 'i'], ['й', 'y'], ['к', 'k'], ['л', 'l'], ['м', 'm'],
  ['н', 'n'], ['о', 'o'], ['п', 'p'], ['р', 'r'], ['с', 's'], ['т', 't'], ['у', 'u'],
  ['ф', 'f'], ['х', 'h'], ['ц', 'ts'], ['ч', 'ch'], ['ш', 'sh'], ['щ', 'shch'], ['ъ', ''],
  ['ы', 'y'], ['ь', ''], ['э', 'e'], ['ю', 'yu'], ['я', 'ya'],
  ['ә', 'a'], ['ғ', 'g'], ['қ', 'q'], ['ң', 'n'], ['ө', 'o'], ['ү', 'u'], ['ұ', 'u'],
  ['һ', 'h'], ['і', 'i'],
]);

const LAT_DIGRAPHS: readonly (readonly [string, string])[] = [
  ['shch', 'щ'], ['sh', 'ш'], ['ch', 'ч'], ['zh', 'ж'], ['ya', 'я'], ['yu', 'ю'],
  ['yo', 'ё'], ['ph', 'ф'], ['th', 'т'], ['wh', 'в'], ['ts', 'ц'], ['ee', 'и'], ['oo', 'у'],
];

const LAT_TO_CYR: ReadonlyMap<string, string> = new Map([
  ['a', 'а'], ['b', 'б'], ['c', 'к'], ['d', 'д'], ['e', 'е'], ['f', 'ф'], ['g', 'г'],
  ['h', 'х'], ['i', 'и'], ['j', 'ж'], ['k', 'к'], ['l', 'л'], ['m', 'м'], ['n', 'н'],
  ['o', 'о'], ['p', 'п'], ['q', 'к'], ['r', 'р'], ['s', 'с'], ['t', 'т'], ['u', 'у'],
  ['v', 'в'], ['w', 'в'], ['x', 'кс'], ['y', 'и'], ['z', 'з'],
]);

/** Cyrillic (ru/kk) to Latin, lowercase. Non-letters pass through unchanged. */
export function toLatin(text: string): string {
  return [...text.toLowerCase()].map((ch) => CYR_TO_LAT.get(ch) ?? ch).join('');
}

/** Latin to Cyrillic (ru), lowercase. Digraphs are matched before single letters. */
export function toCyrillic(text: string): string {
  const lower = text.toLowerCase();
  let out = '';
  let i = 0;
  while (i < lower.length) {
    const digraph = LAT_DIGRAPHS.find(([src]) => lower.startsWith(src, i));
    if (digraph) {
      out += digraph[1];
      i += digraph[0].length;
    } else {
      const ch = lower.charAt(i);
      out += LAT_TO_CYR.get(ch) ?? ch;
      i += 1;
    }
  }
  return out;
}
