import CircularProgress from '@mui/material/CircularProgress';
import * as Styled from './Loader.styles';

const Loader = () => {
  return (
    <Styled.LoaderContainer>
      <CircularProgress size={75} />
    </Styled.LoaderContainer>
  );
};

export default Loader;
