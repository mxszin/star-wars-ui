import { Toolbar } from '@mui/material';
import { styled } from '@mui/system';
import Logo from '../Logo';

export const StyledToolbar = styled(Toolbar)`
  height: 64px;
`;

export const StyledLogo = styled(Logo)(({ theme }) => ({
  width: '80px',
  marginRight: theme.spacing(2),
}));
