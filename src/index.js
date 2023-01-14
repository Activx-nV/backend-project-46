import fs from 'fs';
import path from 'path';
import process from 'process';
import _ from 'lodash';

import parseFile from './parser.js';

const getFilePath = (pathToFile) => path.resolve(process.cwd(), pathToFile);

export const getFileExtension = (filePath) => path.extname(filePath);

export const readFileData = (filePath) => fs.readFileSync(filePath, 'utf-8');

const genDiff = (filePathOne, filePathTwo) => {
  const pathToFileOne = getFilePath(filePathOne);
  const pathToFileTwo = getFilePath(filePathTwo);

  const fileExtension1 = getFileExtension(pathToFileOne);
  const fileExtension2 = getFileExtension(pathToFileOne);

  const readFile1 = readFileData(pathToFileOne);
  const readFile2 = readFileData(pathToFileTwo);

  const fileData1 = parseFile(fileExtension1, readFile1);
  const fileData2 = parseFile(fileExtension2, readFile2);

  const firstFileKeys = Object.keys(fileData1);
  const secondFileKeys = Object.keys(fileData2);

  const sortedKeys = _.sortBy(_.union(firstFileKeys, secondFileKeys));

  const tree = sortedKeys.map((key) => {
    if (!_.has(fileData1, key)) {
      return {
        key,
        value: fileData2[key],
        type: 'added',
      };
    }
    if (!_.has(fileData2, key)) {
      return {
        key,
        value: fileData1[key],
        type: 'deleted',
      };
    }
    if (fileData1[key] !== fileData2[key]) {
      return {
        key,
        valueOne: fileData1[key],
        valueTwo: fileData2[key],
        type: 'changed',
      };
    }
    if (fileData1[key] === fileData2[key]) {
      return {
        key,
        value: fileData1[key],
        type: 'unchanged',
      };
    }
  });

  const newLineChar = '\n';
  const doubleSpace = '  ';

  const formattedTree = tree.map((item) => {
    switch (item.type) {
      case 'added':
        return `${doubleSpace}+ ${item.key}: ${item.value}`;
      case 'deleted':
        return `${doubleSpace}- ${item.key}: ${item.value}`;
      case 'changed':
        return `${doubleSpace}- ${item.key}: ${item.valueOne}${newLineChar}${doubleSpace}+ ${item.key}: ${item.valueTwo}`;
      case 'unchanged':
        return `${doubleSpace.repeat(2)}${item.key}: ${item.value}`;
      default:
        throw new Error(`'${item.type}' type is an unknown type`);
    }
  });

  return [`${newLineChar}{`, ...formattedTree, `}${newLineChar}`].join(newLineChar);
};

export default genDiff;
