import { LogoLink, StyledLogoIcon } from './Logog.styles';

type Props = {
  className?: string;
};

export default function Logo(props: Props) {
  return (
    <LogoLink href="/" className={props.className}>
      <StyledLogoIcon />
    </LogoLink>
  );
}
