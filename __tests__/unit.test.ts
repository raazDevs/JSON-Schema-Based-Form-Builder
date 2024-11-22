import { isValidJSON } from '../src/utils/jsonValidator';

describe('JSON Validator', () => {
  test('isValidJSON function', () => {
    expect(isValidJSON('{}')).toBe(true);
    expect(isValidJSON('{"key": "value"}')).toBe(true);
    expect(isValidJSON('{"nested": {"key": "value"}}')).toBe(true);
    expect(isValidJSON('[]')).toBe(true);
    expect(isValidJSON('[1, 2, 3]')).toBe(true);
    
    expect(isValidJSON('{invalid}')).toBe(false);
    expect(isValidJSON('{"key": value}')).toBe(false);
    expect(isValidJSON('{"key": "unterminated string')).toBe(false);
    expect(isValidJSON('not json')).toBe(false);
  });
});

