import { Container } from '@mui/material';
import { styled } from '@mui/system';
import { Outlet } from 'react-router-dom';
import AppBar from '../AppBar';

const StyledContainer = styled(Container)(({ theme }) => ({
  padding: `${theme.spacing(2)} 0`,
}));

export default function Layout() {
  return (
    <>
      <AppBar />
      <StyledContainer>
        <Outlet />
      </StyledContainer>
    </>
  );
}
