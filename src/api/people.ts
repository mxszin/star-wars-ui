import request from '../lib/request';
import { CharacterResponse, PeopleResponse } from '../models/people';

export type GetPeopleQuery = {
  page: number;
  search?: string;
};

export const getPeople = (query: GetPeopleQuery) => {
  return request.get<PeopleResponse>('/people', {
    params: query,
  });
};

export const getCharacter = (id: string) => {
  return request.get<CharacterResponse>(`/people/${id}`);
};
