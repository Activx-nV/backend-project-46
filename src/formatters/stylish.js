import _ from 'lodash';

const newLineChar = '\n';

const getIndents = (depth, replacer = '  ', spacesCount = 2) => {
  const indentSize = depth * spacesCount;

  const indents = {
    openBracket: replacer.repeat(indentSize - 1),
    closeBracket: replacer.repeat(indentSize - spacesCount),
  };

  return indents;
};

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return String(data);
  }

  const indents = getIndents(depth);
  const keys = Object.keys(data);

  const result = keys.map((key) => {
    if (!_.isObject(data[key])) {
      return `${indents.openBracket}  ${key}: ${data[key]}`;
    }

    return `${indents.openBracket}  ${key}: ${stringify(data[key], depth + 1)}`;
  });

  return ['{', ...result, `${indents.closeBracket}}`].join('\n');
};

const stylish = (tree, depth = 1) => {
  const indents = getIndents(depth);

  const formattedTree = tree.map((item) => {
    const itemValue = stringify(item.value, depth + 1);

    switch (item.type) {
      case 'added':
        return `${indents.openBracket}+ ${item.key}: ${itemValue}`;
      case 'deleted':
        return `${indents.openBracket}- ${item.key}: ${itemValue}`;
      case 'changed':
        return `${indents.openBracket}- ${item.key}: ${stringify(item.valueOne, depth + 1)}${newLineChar}${indents.openBracket}+ ${item.key}: ${stringify(item.valueTwo, depth + 1)}`;
      case 'unchanged':
        return `${indents.openBracket}  ${item.key}: ${itemValue}`;
      case 'nested':
        return `${indents.openBracket}  ${item.key}: ${stylish(item.children, depth + 1)}`;
      default:
        throw new Error(`'${item.type}' type is an unknown type`);
    }
  });

  return ['{', ...formattedTree, `${indents.closeBracket}}`].join(newLineChar);
};

export default stylish;
