import { SpinnerDotted } from 'spinners-react';

type SpinnerProps = {
  size: 'small' | 'big';
  color: 'white' | 'purple';
}

const sizes = {
  small: 15,
  big: 50
};

function Spinner({size, color}: SpinnerProps): JSX.Element {
  const colorCode = color === 'white' ? '#ffffff' : '#7575e2';

  return (
    <SpinnerDotted color={colorCode} size={sizes[size]}/>
  );
}

export default Spinner;
