import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { StyledLogo, StyledToolbar } from './AppBar.styled';
import { Link } from 'react-router-dom';

// TODO: Navigation
const pages = [
  {
    title: 'People',
    path: 'people',
  },
  {
    title: 'Films',
    path: 'films',
  },
];

const ResponsiveAppBar = () => {
  return (
    <AppBar position="static">
      <Container>
        <StyledToolbar disableGutters>
          <StyledLogo />
          <Box>
            {pages.map((page) => (
              // TODO: Move styles.
              // TODO: Active link.
              <Button component={Link} to={page.path} key={page.title} sx={{ color: 'white' }}>
                {page.title}
              </Button>
            ))}
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
