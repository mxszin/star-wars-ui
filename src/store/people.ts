import { atom, DefaultValue, selector } from 'recoil';
import { getPeople, GetPeopleQuery } from '../api/people';
import getIdFromUrl from '../lib/getIdFromUrl/getIdFromUrl';
import { ListResponse } from '../models/common';
import { PeopleItemResponse } from '../models/people';

export const peoplePageAtom = atom<number>({
  key: 'PeopleCursor',
  default: 1,
});

const peopleSearchAtom = atom<string>({
  key: 'PeopleSearchAtom',
  default: '',
});

export const peopleSearchQuerySelector = selector<string>({
  key: 'PeopleSearchQuerySelector',
  get: ({ get }) => get(peopleSearchAtom),
  set: ({ set }, newValue) => {
    set(peoplePageAtom, newValue instanceof DefaultValue ? newValue : 1);
    set(peopleSearchAtom, newValue instanceof DefaultValue ? newValue : newValue);
  },
});

const peopleQuerySelector = selector<GetPeopleQuery>({
  key: 'PeopleQuerySelector',
  get: ({ get }) => ({
    page: get(peoplePageAtom),
    search: get(peopleSearchAtom) || undefined,
  }),
});

const peopleState = atom<ListResponse<PeopleItemResponse>>({
  key: 'PeopleState',
  default: selector({
    key: 'PeopleStateQuery',
    get: async ({ get }) => {
      const response = await getPeople(get(peopleQuerySelector));

      return response.data;
    },
  }),
});

export const peopleSelector = selector({
  key: 'PeopleSelector',
  get: ({ get }) => {
    return get(peopleState).results.map((char) => {
      return {
        id: getIdFromUrl(char.url),
        title: char.name,
      };
    });
  },
});

const PAGE_SIZE = 10;
export const peoplePageCountSelector = selector({
  key: 'PeoplePageCountSelector',
  get: ({ get }) => {
    return Math.ceil(get(peopleState).count / PAGE_SIZE);
  },
});
