const parseFile = (extension, fileData) => {
  switch (extension) {
    case '.json':
      return JSON.parse(fileData);
    case '.yaml':
      return;
  }
};

export default parseFile;
