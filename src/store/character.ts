import { atom, selectorFamily } from 'recoil';
import { getCharacter } from '../api/people';
import { CharacterDetailsProps } from '../components/CharacterPage/CharacterPage';
import getIdFromUrl from '../lib/getIdFromUrl/getIdFromUrl';
import { CharacterResponse } from '../models/people';

export const characterQuery = selectorFamily<CharacterResponse, string>({
  key: 'CharacterQuery',
  get: (id: string) => async () => {
    const response = await getCharacter(id);

    return response.data;
  },
});
