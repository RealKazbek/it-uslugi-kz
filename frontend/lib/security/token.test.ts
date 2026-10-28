import { describe, expect, it } from 'vitest';
import { isValidInternalToken } from './token';

describe('isValidInternalToken', () => {
  it('accepts an exact match', () => {
    expect(isValidInternalToken('secret-token-123', 'secret-token-123')).toBe(true);
  });

  it('rejects a wrong token of equal length', () => {
    expect(isValidInternalToken('secret-token-124', 'secret-token-123')).toBe(false);
  });

  it('rejects a token of different length', () => {
    expect(isValidInternalToken('short', 'secret-token-123')).toBe(false);
    expect(isValidInternalToken('secret-token-123-extra', 'secret-token-123')).toBe(false);
  });

  it('denies everything when the configured value is empty', () => {
    expect(isValidInternalToken('', '')).toBe(false);
    expect(isValidInternalToken(null, '')).toBe(false);
    expect(isValidInternalToken('anything', '')).toBe(false);
  });

  it('denies a missing header', () => {
    expect(isValidInternalToken(null, 'secret-token-123')).toBe(false);
  });
});
