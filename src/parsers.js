import { load } from 'js-yaml';

const parseFile = (extension, fileData) => {
  switch (extension) {
    case '.json':
      return JSON.parse(fileData);
    case '.yaml':
    case '.yml':
      return load(fileData);
    default:
      throw new Error('Unknown file extension. Supported extensions: .json, .yaml, .yml');
  }
};

export default parseFile;
