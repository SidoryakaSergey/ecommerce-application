import ClipLoader from 'react-spinners/PuffLoader';
import { CSSProperties } from 'react';

const override: CSSProperties = {
  display: 'block',
  margin: '20px auto',
  borderColor: 'red',
};

const Loading = () => {
  return (
    <ClipLoader
      color={'black'}
      loading={true}
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default Loading;
