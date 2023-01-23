import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return _.isString(value) ? `'${value}'` : String(value);
};

const plain = (tree) => {
  const iter = (data, path = '') => {
    const formattedTree = data
      .filter((item) => item.type !== 'unchanged')
      .flatMap((item) => {
        switch (item.type) {
          case 'added':
            return `Property '${path}${item.key}' was added with value: ${stringify(
              item.value,
            )}`;
          case 'deleted':
            return `Property '${path}${item.key}' was removed`;
          case 'changed':
            return `Property '${path}${item.key}' was updated. From ${stringify(item.valueOne)} to ${stringify(item.valueTwo)}`;
          case 'nested':
            return iter(item.children, `${path}${item.key}.`);
          default:
            throw new Error(`'${item.type}' type is an unknown type`);
        }
      });
    return formattedTree;
  };
  return iter(tree).join('\n');
};

export default plain;
