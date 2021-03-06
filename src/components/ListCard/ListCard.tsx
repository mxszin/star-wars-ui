import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export type ListCardProps = {
  id: number;
  title: string;
  shortInfo?: string;
};

function ListCard(props: ListCardProps) {
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

export default ListCard;
