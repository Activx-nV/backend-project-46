import { test, expect, describe } from '@jest/globals';
import path from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';

import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const fileExtensions = ['.json', '.yaml', '.yml'];

describe('Check difference between two files', () => {
  test.each(fileExtensions)(`Check file extensions: ${fileExtensions.join(' / ')}`, (extension) => {
    expect(genDiff(getFixturePath(`file1${extension}`), getFixturePath(`file2${extension}`), 'stylish')).toEqual(readFile('expected_stylish_result.txt'));
    expect(genDiff(getFixturePath(`file1${extension}`), getFixturePath(`file2${extension}`), 'plain')).toEqual(readFile('expected_plain_result.txt'));
    expect(genDiff(getFixturePath(`file1${extension}`), getFixturePath(`file2${extension}`), 'json')).toEqual(readFile('expected_json_result.txt'));
  });

  test('Get an error when file was not found', () => {
    expect(() => genDiff(getFixturePath('file1.jzon'), getFixturePath('file2.json'))).toThrow('One or two file paths were not found.');
  });

  test('Get an error when file extension was not found', () => {
    expect(() => genDiff(getFixturePath('file1.xml'), getFixturePath('file2.json'))).toThrow('Unknown file extension.');
  });
});
