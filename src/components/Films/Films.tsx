import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import getIdFromUrl from '../../lib/getIdFromUrl/getIdFromUrl';
import { FilmsResponse } from '../../models/film';
import ListCard, { ListCardProps } from '../ListCard';

const useFilms = () => {
  const [films, setFilms] = useState<ListCardProps[]>([]);
  const getFilms = async () => {
    const response = await fetch('https://swapi.dev/api/films');
    if (response.ok) {
      const json: FilmsResponse = await response.json();
      // TODO: Don't set when leave page.
      setFilms(
        json.results.map((film) => {
          const id = getIdFromUrl(film.url);
          return {
            id,
            // TODO: Add `...` to the and of text.
            shortInfo: `${film.opening_crawl.slice(0, 100)}...`,
            title: film.title,
            detailsUrl: `/films/${id}`,
          };
        }),
      );
    } else {
      alert('Ошибка HTTP: ' + response.status);
    }
  };

  useEffect(() => {
    getFilms();
  }, []);

  return films;
};

function Films() {
  const films = useFilms();
  return (
    // TODO: Move to styles
    <Grid container spacing={2} sx={{ paddingTop: (theme) => theme.spacing(2) }}>
      {films.map((film) => (
        <Grid item xs={12} sm={6} lg={4} key={film.id}>
          <ListCard {...film} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Films;
