import { Suspense } from 'react';
import { Grid } from '@mui/material';
import SearchPeopleContainer from '../../containers/SearchPeopleContainer';
import PeopleContainer from '../../containers/PeopleContainer';
import Loader from '../Loader';

function PeoplePage() {
  return (
    <Grid container spacing={2}>
      <Grid item>
        <SearchPeopleContainer />
      </Grid>
      <Grid item sx={{ width: '100%' }}>
        <Suspense fallback={<Loader />}>
          <PeopleContainer />
        </Suspense>
      </Grid>
    </Grid>
  );
}

export default PeoplePage;
