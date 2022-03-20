import getIdFromUrl from './getIdFromUrl';

// TODO: write more tests
describe('getIdFromUrl', () => {
  test('success', () => {
    expect(getIdFromUrl('https://swapi.dev/api/films/1/')).toBe(1);
  });
});
