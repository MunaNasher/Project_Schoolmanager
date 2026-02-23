
import { describe, expect, test } from 'vitest';

describe('Example Test', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(1 + 2).toBe(3);
  });

});

import { describe, expect, test } from 'vitest';
import { parseCommand } from '../src/command-parser.js';

describe('parseCommand Tests', () => {

  // First Test: parses full command with arguments
  test('parses full command correctly', () => {
    const result = parseCommand('TRAINEE ADD John Doe');

    expect(result.command).toBe('TRAINEE');
    expect(result.subcommand).toBe('ADD');
    expect(result.args).toEqual(['John', 'Doe']);
  });

  // Second Test: parses command with no arguments (LIST)
  test('parses course list command', () => {
    const result = parseCommand('COURSE LIST');

    expect(result.command).toBe('COURSE');
    expect(result.subcommand).toBe('LIST');
    expect(result.args).toEqual([]);
  });

  // Third Test: parses delete command with ID
  test('parses delete command with id', () => {
    const result = parseCommand('TRAINEE DELETE 12345');

    expect(result.command).toBe('TRAINEE');
    expect(result.subcommand).toBe('DELETE');
    expect(result.args).toEqual(['12345']);
  });

  // Fourth Test: handles extra spaces in input
  test('handles extra spaces correctly', () => {
    const result = parseCommand('   TRAINEE   UPDATE   12345   John   Doe   ');

    expect(result.command).toBe('TRAINEE');
    expect(result.subcommand).toBe('UPDATE');
    expect(result.args).toEqual(['12345', 'John', 'Doe']);
  });

  // Fifth Test: handles empty string input
  test('returns undefined and empty args for empty string', () => {
    const result = parseCommand('');

    expect(result.command).toBeUndefined();
    expect(result.subcommand).toBeUndefined();
    expect(result.args).toEqual([]);
  });

  // Sixth Test: handles undefined input
  test('returns undefined values for undefined input', () => {
    const result = parseCommand(undefined);

    expect(result.command).toBeUndefined();
    expect(result.subcommand).toBeUndefined();
    expect(result.args).toEqual([]);
  });

  // Seventh Test: handles single word input
  test('handles single word input', () => {
    const result = parseCommand('TRAINEE');

    expect(result.command).toBe('TRAINEE');
    expect(result.subcommand).toBeUndefined();
    expect(result.args).toEqual([]);
  });

});

