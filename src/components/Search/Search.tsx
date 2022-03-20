import React from 'react';
import { SearchIconWrapper, StyledInputBase, StyledSearch } from './Search.styles';
import SearchIcon from '@mui/icons-material/Search';

type SearchProps = {
  onChange: (value: string) => void;
};

function Search(props: SearchProps) {
  const { onChange } = props;
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange(e.target.value);
  };

  return (
    <StyledSearch>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        onChange={handleChange}
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
      />
    </StyledSearch>
  );
}

export default Search;
