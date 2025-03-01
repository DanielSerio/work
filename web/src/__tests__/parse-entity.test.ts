import { describe, expect, test } from 'vitest';
import { parseCodedEntity } from '../lib/utilities/entity';

describe('parseCodedEntity', () => {
  test('Should throw for required code', () => {
    const item = {
      code: '',
      name: 'Name'
    };

    expect(() => parseCodedEntity(item)).toThrow('Code is required.');
  });

  test('Should throw for code too long', () => {
    const item = {
      code: 'XXXXXXXXXXXXX',
      name: 'Name'
    };

    expect(() => parseCodedEntity(item)).toThrow('Code is too long. (max 12)');
  });

  test('Should throw for name too short', () => {
    const item = {
      code: 'CODE',
      name: ''
    };

    expect(() => parseCodedEntity(item)).toThrow('Name must be at least 2 characters.');
  });

  test('Should throw for name too long', () => {
    const item = {
      code: 'CODE',
      name: 'X'.repeat(65)
    };

    expect(() => parseCodedEntity(item)).toThrow('Name is too long. (max 64)');
  });
});