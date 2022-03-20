import { atom, selector } from 'recoil';

export const currentUserIDState = atom({
  key: 'CurrentUserID',
  default: 1,
});

// const currentUserNameState = selector({
//   key: 'CurrentUserName',
//   get: ({ get }) => {
//     return tableOfUsers[get(currentUserIDState)].name;
//   },
// });
