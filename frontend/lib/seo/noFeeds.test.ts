import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const FEED_NAME = /feed|merchant|shopping|yml|catalog\.xml/i;

function routeFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? routeFiles(join(dir, entry.name)).map((f) => `${entry.name}/${f}`) : [entry.name],
  );
}

describe('study products stay organic', () => {
  it('has no ads or merchant feed route (if you add one, exclude category "education" and update this test)', () => {
    const offenders = routeFiles(join(process.cwd(), 'app')).filter((f) => FEED_NAME.test(f));
    expect(offenders).toEqual([]);
  });
});
