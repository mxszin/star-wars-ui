import request from '../lib/request';

type GetPeopleQuery = {
  page: number;
  search?: string;
};

export const getPeople = <T>(query: GetPeopleQuery) => {
  return request.get<T>('/people', {
    params: query,
  });
};
