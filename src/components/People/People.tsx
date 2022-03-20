import { ChangeEvent } from 'react';
import { Grid, Pagination } from '@mui/material';
import ListCard, { ListCardProps } from '../ListCard';

type PeopleProps = {
  people: ListCardProps[];
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
          <Grid item xs={12} sm={6} lg={4} key={char.id}>
            <ListCard {...char} />
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
