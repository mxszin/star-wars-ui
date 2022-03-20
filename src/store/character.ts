import { selectorFamily, atomFamily } from 'recoil';
import { getCharacter } from '../api/people';
import { CharacterResponse } from '../models/people';

export const characterAtom = atomFamily({
  key: 'characterAtom',
  default: selectorFamily<CharacterResponse, string>({
    key: 'CharacterQuery',
    get: (id: string) => async () => {
      const response = await getCharacter(id);

      return response.data;
    },
  }),
});
