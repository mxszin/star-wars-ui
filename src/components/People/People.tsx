import { ChangeEvent } from 'react';
import { Grid, Pagination } from '@mui/material';
import FilmCard, { FilmShortInfo } from '../FilmCard';

type PeopleProps = {
  people: FilmShortInfo[];
  pageCount: number;
  currentPage: number;
  onChangePage: (page: number) => void;
};

function People(props: PeopleProps) {
  const { people, pageCount, currentPage, onChangePage } = props;

  const handleChange = (_: ChangeEvent<unknown>, page: number) => {
    onChangePage(page);
  };

  return (
    // TODO: Move styles
    // TODO: Move Pagination outside?
    <Grid container spacing={2}>
      <Grid container item spacing={2}>
        {people.map((char) => (
          <Grid item xs={4} key={char.id}>
            <FilmCard {...char} />
          </Grid>
        ))}
      </Grid>
      {pageCount > 1 && (
        <Grid item justifyContent="center" flexGrow={1}>
          <Pagination
            size="large"
            count={pageCount}
            page={currentPage}
            onChange={handleChange}
            sx={{ display: 'flex', justifyContent: 'center' }}
          />
        </Grid>
      )}
    </Grid>
  );
}

export default People;
