import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatter = (tree, format) => {
  switch (format) {
    case 'stylish':
      return stylish(tree);
    case 'plain':
      return plain(tree);
    case 'json':
      return json(tree);
    default:
      throw new Error(`${format} is an unknown format`);
  }
};

export default formatter;
