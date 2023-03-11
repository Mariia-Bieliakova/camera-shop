type IconStarProps = {
  full?: boolean;
}

function IconStar ({full}: IconStarProps): JSX.Element {
  const xlink = full ? '#icon-full-star' : '#icon-star';

  return (
    <svg width="17" height="16" aria-hidden="true" data-testid='svg'>
      <use xlinkHref={xlink} />
    </svg>
  );
}

export default IconStar;
