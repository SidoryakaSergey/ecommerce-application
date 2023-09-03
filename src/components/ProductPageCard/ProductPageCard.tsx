import { useEffect, useState } from 'react';
import { ProductsArr } from '../../interfaces/productsI.ts';
import getProduct from '../../fetchs/getProduct.ts';
import styles from './ProductPageCard.module.css';
import DescLabel from './DescLabel/DescLabel.tsx';
import MyButton from '../Button/MyButton.tsx';

interface ProductPageCardProps {
  id: string;
}

const ProductPageCard = (props: ProductPageCardProps) => {
  const { id } = props;
  const [product, setProduct] = useState<ProductsArr>();

  useEffect(() => {
    const fetchProducts = () => {
      getProduct(id)
        .then((response: ProductsArr) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
          setProduct(response);
        })
        .catch((error: Error) => {
          return error.message;
        });
    };
    fetchProducts();
  }, [id]);

  if (product) {
    return (
      <div className={styles.pageBox}>
        <div className={styles.imageBox}>
          <div className={styles.imageWrapper}>
            <img
              className={styles.image}
              src={product.masterData.current.masterVariant.images[0].url}
              alt={'cover'}
            />
          </div>
        </div>
        <div className={styles.descriptionBox}>
          <div>
            <div>
              <div>
                <label
                  className={styles.fontAdaptiveName}
                  style={{ color: 'rgb(13, 12, 34)', fontWeight: 'bold' }}
                >
                  {product.masterData.current.name['en-US']}
                </label>
              </div>
              <div>
                <label className={styles.fontAdaptiveAutor} style={{ color: 'rgb(13, 12, 34)' }}>
                  {product.masterData.current.masterVariant.attributes[0].value}
                </label>
              </div>
            </div>
            <div>
              <DescLabel
                labelName={product.masterData.current.masterVariant.attributes[1].name}
                value={product.masterData.current.masterVariant.attributes[1].value}
              />
              <DescLabel
                labelName={product.masterData.current.masterVariant.attributes[2].name}
                value={product.masterData.current.masterVariant.attributes[2].value}
              />
              <DescLabel
                labelName={product.masterData.current.masterVariant.attributes[3].name}
                value={product.masterData.current.masterVariant.attributes[3].value}
              />
              <DescLabel
                labelName={product.masterData.current.masterVariant.attributes[4].name}
                value={product.masterData.current.masterVariant.attributes[4].value}
              />
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              justifyContent: 'center',
            }}
          >
            <MyButton
              value={product.masterData.current.masterVariant.prices[0].value.centAmount / 100}
            />
          </div>
        </div>
        <div className={styles.annotaion}>
          {product.masterData.current.masterVariant.attributes[5].value}
        </div>
      </div>
    );
  }
  return <div>Wait</div>;
};

export default ProductPageCard;
