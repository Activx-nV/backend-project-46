import fs from 'fs';
import path from 'path';
import process from 'process';

import parseFile from './parsers.js';
import createTree from './createTree.js';
import formatter from './formatters/index.js';

const getFilePath = (pathToFile) => path.resolve(process.cwd(), pathToFile);

export const getFileExtension = (filePath) => path.extname(filePath);

export const readFileData = (filePath) => fs.readFileSync(filePath, 'utf-8');

const genDiff = (filePathOne, filePathTwo, formatType = 'stylish') => {
  const pathToFileOne = getFilePath(filePathOne);
  const pathToFileTwo = getFilePath(filePathTwo);

  const path1Exists = fs.existsSync(pathToFileOne);
  const path2Exists = fs.existsSync(pathToFileTwo);

  if (!path1Exists || !path2Exists) {
    throw new Error('One or two file paths were not found.\n');
  }

  const fileData1 = parseFile(getFileExtension(pathToFileOne), readFileData(pathToFileOne));
  const fileData2 = parseFile(getFileExtension(pathToFileTwo), readFileData(pathToFileTwo));

  const tree = createTree(fileData1, fileData2);

  return formatter(tree, formatType);
};

export default genDiff;
