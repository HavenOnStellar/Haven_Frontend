import { describe, it, expect } from 'vitest';
import { isValidIMEI, validateIMEI, hashIMEI } from './havenClient';

describe('isValidIMEI', () => {
  it('accepts valid IMEI with correct Luhn checksum', () => {
    expect(isValidIMEI('490154203237518')).toBe(true);
    expect(isValidIMEI('353456789012348')).toBe(true);
  });

  it('rejects IMEI with wrong Luhn checksum', () => {
    expect(isValidIMEI('123456789012345')).toBe(false);
    expect(isValidIMEI('353456789012347')).toBe(false);
  });

  it('rejects non-15-digit strings', () => {
    expect(isValidIMEI('12345678901234')).toBe(false);
    expect(isValidIMEI('1234567890123456')).toBe(false);
    expect(isValidIMEI('')).toBe(false);
  });

  it('rejects strings with non-digit characters', () => {
    expect(isValidIMEI('35345678901234A')).toBe(false);
    expect(isValidIMEI('35-456789-012348')).toBe(false);
    expect(isValidIMEI('35345678901234 ')).toBe(false);
  });
});

describe('validateIMEI', () => {
  it('returns null for valid IMEI', () => {
    expect(validateIMEI('490154203237518')).toBeNull();
    expect(validateIMEI('353456789012348')).toBeNull();
  });

  it('returns specific error for non-digit input', () => {
    expect(validateIMEI('35345678901234A')).toBe('IMEI must contain only digits.');
    expect(validateIMEI('hello')).toBe('IMEI must contain only digits.');
  });

  it('returns specific error for wrong length', () => {
    expect(validateIMEI('1234567890123456')).toBe('IMEI must be exactly 15 digits.');
    expect(validateIMEI('12345678901234')).toBe('IMEI must be exactly 15 digits.');
  });

  it('returns checksum error for 15 digits with bad Luhn', () => {
    expect(validateIMEI('123456789012345')).toBe('Invalid IMEI — checksum verification failed.');
  });
});

describe('hashIMEI', () => {
  it('returns SHA-256 hash for valid IMEI', async () => {
    const hash = await hashIMEI('490154203237518');
    expect(hash).toHaveLength(64);
    expect(hash).toMatch(/^[0-9a-f]{64}$/);
  });

  it('throws for invalid IMEI', async () => {
    await expect(hashIMEI('123456789012345')).rejects.toThrow(
      'Invalid IMEI — checksum verification failed.'
    );
    await expect(hashIMEI('short')).rejects.toThrow('IMEI must contain only digits.');
    await expect(hashIMEI('1234567890123456')).rejects.toThrow('IMEI must be exactly 15 digits.');
  });
});
