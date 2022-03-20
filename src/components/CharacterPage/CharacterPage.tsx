import { CardMedia, Container, Grid, Typography } from '@mui/material';
import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { characterQuery } from '../../store/character';
import Loader from '../Loader';

export type CharacterDetailsProps = {
  name: string;
  height: string;
  mass: string;
  birthYear: string;
  gender: string;
};

function CharacterDetails(props: CharacterDetailsProps) {
  const { name, height, mass, birthYear, gender } = props;

  return (
    <Grid container spacing={2}>
      <Grid item>
        <Typography variant="h4" component="h1" color="primary">
          {name}
        </Typography>
      </Grid>
      <Grid container item spacing={2}>
        <Grid item xs={12} sm={5} lg={5}>
          <CardMedia
            component="img"
            image="https://api.lorem.space/image/movie?w=400&h=600"
            alt={name}
          />
        </Grid>
        <Grid item xs={12} sm={7} lg={7}>
          <Typography>Height: {height}</Typography>
          <Typography>Mass: {mass}</Typography>
          <Typography>Gender: {gender}</Typography>
          <Typography>Birth year: {birthYear}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

type CharacterPageContainerProps = {
  id: string;
};

function CharacterPageContainer(props: CharacterPageContainerProps) {
  const char = useRecoilValue(characterQuery(props.id));

  return (
    <CharacterDetails
      name={char.name}
      gender={char.gender}
      height={char.height}
      mass={char.mass}
      birthYear={char.birth_year}
    />
  );
}

function CharacterPage() {
  const { peopleId } = useParams();

  if (!peopleId) {
    return <div>Not Found</div>;
  }
  return (
    <Container>
      <Suspense fallback={<Loader />}>
        <CharacterPageContainer id={peopleId} />
      </Suspense>
    </Container>
  );
}

export default CharacterPage;
