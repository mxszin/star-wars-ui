import People from '../../components/People';
import { atom, selector, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { getPeople } from '../../api/people';
import getIdFromUrl from '../../lib/getIdFromUrl/getIdFromUrl';
import { ListResponse } from '../../models/common';
import { PeopleItemResponse, PeopleResponse } from '../../models/people';
import { ChangeEventHandler, Suspense, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/system';
import { debounce, Grid, InputBase } from '@mui/material';

type Cursor = {
  page: number;
};

const peopleCursor = atom<Cursor>({
  key: 'PeopleCursor',
  default: {
    page: 1,
  },
});

const peopleSearchAtom = atom<string>({
  key: 'PeopleSearchAtom',
  default: '',
});

const peopleCursorPageSelector = selector<number>({
  key: 'PeopleCursorPageSelector',
  get: ({ get }) => get(peopleCursor).page,
});

const peopleQueryState = atom<{ page: number }>({
  key: 'PeopleQueryState',
  default: selector({
    key: 'PeopleQuerySelector',
    get: ({ get }) => ({
      page: get(peopleCursorPageSelector),
      search: get(peopleSearchAtom) || undefined,
    }),
  }),
});

const peopleState = atom<ListResponse<PeopleItemResponse>>({
  key: 'PeopleState',
  default: selector({
    key: 'PeopleStateQuery',
    get: async ({ get }) => {
      const response = await getPeople<PeopleResponse>(get(peopleQueryState));

      return response.data;
    },
  }),
});

const peopleSelector = selector({
  key: 'PeopleSelector',
  get: ({ get }) => {
    return get(peopleState).results.map((char) => {
      const id = getIdFromUrl(char.url);
      return {
        id,
        title: char.name,
        detailsUrl: `/people/${id}`,
      };
    });
  },
});

const PAGE_SIZE = 10;
const peoplePageCountSelector = selector({
  key: 'PeoplePageCountSelector',
  get: ({ get }) => {
    return Math.ceil(get(peopleState).count / PAGE_SIZE);
  },
});

function List() {
  const [cursor, setCursor] = useRecoilState(peopleCursor);
  const pageCount = useRecoilValue(peoplePageCountSelector);
  const handleChange = (page: number) => {
    setCursor((currVal) => ({
      ...currVal,
      page,
    }));
  };

  const people = useRecoilValue(peopleSelector);

  return (
    <People
      people={people}
      currentPage={cursor.page}
      pageCount={pageCount}
      onChangePage={handleChange}
    />
  );
}
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    // Vertical padding + font size from searchIcon.
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
  },
}));

function SearchPanel() {
  const setSearch = useSetRecoilState(peopleSearchAtom);
  const debouncedSetSearch = debounce(setSearch, 500);
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    debouncedSetSearch(e.target.value);
  };

  useEffect(() => {
    setSearch('');
  }, [setSearch]);

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        // value={search}
        onChange={handleChange}
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
      />
    </Search>
  );
}

// TODO: Rename to PeoplePage
export default function PeopleContainer() {
  return (
    <Grid container spacing={2} flexDirection="column" alignItems="flex-start">
      <Grid item>
        <SearchPanel />
      </Grid>
      <Grid item>
        <Suspense fallback={<div>Loading...</div>}>
          <List />
        </Suspense>
      </Grid>
    </Grid>
  );
}
