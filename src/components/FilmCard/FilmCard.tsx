import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

// TODO: Think about FilmShortInfo name
export type FilmShortInfo = {
  id: number;
  title: string;
  // TODO: don't need
  detailsUrl: string;
  shortInfo?: string;
};

type FilmCardProps = FilmShortInfo;

// TODO: Make as a common Card
function FilmCard(props: FilmCardProps) {
  const { title, shortInfo, id } = props;

  return (
    <Card>
      <CardActionArea component={Link} to={`${id}`}>
        {
          // TODO: Implement image loader with search by title with cache.
          // https://www.pexels.com/
        }
        <CardMedia
          component="img"
          image="https://api.lorem.space/image/movie?w=540&h=360"
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" color="primary">
            {title}
          </Typography>
          {shortInfo && (
            <Typography variant="body2" color="text.secondary">
              {shortInfo}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default FilmCard;
