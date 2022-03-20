import { useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import { debounce } from '@mui/material';
import Search from '../../components/Search';
import { peopleSearchQuerySelector } from '../../store/people';

function SearchPeopleContainer() {
  const setSearch = useSetRecoilState(peopleSearchQuerySelector);
  const debouncedHandleChange = debounce(setSearch, 500);

  useEffect(() => {
    return () => {
      // Reset on page leave.
      setSearch('');
    };
  }, [setSearch]);

  return <Search onChange={debouncedHandleChange} />;
}

export default SearchPeopleContainer;
