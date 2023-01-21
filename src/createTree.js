import _ from 'lodash';

const createTree = (fileData1, fileData2) => {
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
    if (_.isObject(fileData1[key]) && _.isObject(fileData2[key])) {
      return {
        key,
        type: 'nested',
        children: createTree(fileData1[key], fileData2[key]),
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
    return {
      key,
      value: fileData1[key],
      type: 'unchanged',
    };
  });
  return tree;
};

export default createTree;
