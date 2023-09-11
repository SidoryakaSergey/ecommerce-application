import { useParams } from 'react-router-dom';
import ProductPageCard from '../../components/ProductPageCard/ProductPageCard.tsx';

const ProductPage = () => {
  const { id } = useParams();

  return (
    <div style={{ background: '#f1f5f9' }}>
      <ProductPageCard id={id!} />
    </div>
  );
};

export default ProductPage;
