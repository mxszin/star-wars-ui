import { Button, CardMedia, Container, Grid, Typography } from '@mui/material';
import { Suspense, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { characterAtom } from '../../store/character';
import EditCharacterModal from '../EditCharacterModal';
import { EditCharacterFormValues } from '../EditCharacterModal/EditCharacterModal';
import Loader from '../Loader';

export type CharacterDetails = {
  name: string;
  height: string;
  mass: string;
  birthYear: string;
  gender: string;
};

type CharacterDetailsProps = CharacterDetails & {
  onEditClick: () => void;
};
// TODO: Extract to component
function CharacterDetails(props: CharacterDetailsProps) {
  const { name, height, mass, birthYear, gender, onEditClick } = props;

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
          <Button variant="contained" onClick={onEditClick}>
            Edit
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

type CharacterPageContainerProps = {
  id: string;
};

// TODO: Extract to component
function CharacterPageContainer(props: CharacterPageContainerProps) {
  const [char, setChar] = useRecoilState(characterAtom(props.id));
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const openEditForm = () => setIsEditFormOpen(true);
  const closeEditForm = () => setIsEditFormOpen(false);
  const handleSubmit = (values: EditCharacterFormValues) => {
    setChar((currentValue) => ({
      ...currentValue,
      ...values,
    }));
  };

  return (
    <>
      <CharacterDetails
        name={char.name}
        gender={char.gender}
        height={char.height}
        mass={char.mass}
        birthYear={char.birth_year}
        onEditClick={openEditForm}
      />
      <EditCharacterModal
        isOpen={isEditFormOpen}
        close={closeEditForm}
        onSubmit={handleSubmit}
        initialValues={{
          height: char.height,
          mass: char.mass,
        }}
      />
    </>
  );
}

function CharacterPage() {
  const { peopleId } = useParams();

  if (!peopleId) {
    return <div>Not Found</div>;
  }
  return (
    <Suspense fallback={<Loader />}>
      <CharacterPageContainer id={peopleId} />
    </Suspense>
  );
}

export default CharacterPage;
