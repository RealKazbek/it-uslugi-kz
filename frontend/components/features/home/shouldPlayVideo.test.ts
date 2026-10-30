import { describe, expect, it } from 'vitest';
import { shouldPlayVideo } from './shouldPlayVideo';

describe('shouldPlayVideo', () => {
  it('plays with no restrictions', () => {
    expect(shouldPlayVideo({ reducedMotion: false, saveData: false })).toBe(true);
  });
  it('does not play under reduced motion', () => {
    expect(shouldPlayVideo({ reducedMotion: true, saveData: false })).toBe(false);
  });
  it('does not play under save-data', () => {
    expect(shouldPlayVideo({ reducedMotion: false, saveData: true })).toBe(false);
  });
  it('does not play with both', () => {
    expect(shouldPlayVideo({ reducedMotion: true, saveData: true })).toBe(false);
  });
});
