import { useParams } from 'react-router-dom';
import ProductPageCard from '../../components/ProductPageCard/ProductPageCard.tsx';

const ProductPage = () => {
  const { id } = useParams();

  return (
    <div>
      <ProductPageCard id={id!} />
    </div>
  );
};

export default ProductPage;
