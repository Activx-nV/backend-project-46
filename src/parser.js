const parseFile = (extension, fileData) => {
  switch (extension) {
    case '.json':
      return JSON.parse(fileData);
    case '.yaml':
      break;
    default:
      throw new Error(
        `${extension} is an unsupported file extension. Supported file extensions at the moment are: .json`
      );
  }
};

export default parseFile;
