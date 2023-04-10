import { Camera } from '../../types/camera';
import ProductCard from '../product-card/product-card';

type CardsListProps = {
  cameras: Camera[];
};

function CardsList ({cameras}: CardsListProps): JSX.Element {

  return (
    <div className="cards catalog__cards">
      {cameras.length > 0 ?
        cameras.map((camera) => (
          <ProductCard
            camera={camera}
            key={camera.id}
          />
        )) :
        <p>по вашему запросу ничего не найдено</p>}
    </div>);
}

export default CardsList;
