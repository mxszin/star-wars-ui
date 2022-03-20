import logger from '../logger';

// https://swapi.dev/api/films/1/ => 1
const getIdFromUrl = (url: string): number => {
  // Get last part of url.
  const result = /([^/]+)?\/$/gm.exec(url);
  // If url will change structure we need to warn.
  if (!result || !result.length) {
    // TODO: Add a film info for logger if url is empty.
    logger.warn('invalid url:', url);
    return 0;
  }
  const id = result[1];
  return parseInt(id, 10);
};

export default getIdFromUrl;
