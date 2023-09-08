import React, { useEffect, useState } from 'react';
import getProducts from '../../fetchs/getProducts.ts';
import { ProductsArr, ResponseProducts } from '../../interfaces/productsI.ts';
import styles from './Products.module.css';

const Products: React.FC = () => {
  const [products, setProducts] = useState<ProductsArr[]>([]);

  useEffect(() => {
    const fetchProducts = () => {
      getProducts()
        .then((response: ResponseProducts) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
          setProducts(response.results);
        })
        .catch((error: Error) => {
          return error.message;
        });
    };

    fetchProducts();
  }, []);

  return (
    <div className={styles.mainBox}>
      <h2>Products</h2>
      <div className={styles.productsBox}>
        {products.map((product, index) => (
          <div className={styles.productCard} key={index}>
            <div className={styles.productCard__imgWr}>
              <div className={styles.productCard__imgWr__imgBox}>
                <a href={product.masterData.current.masterVariant.images[0].url}>
                  <img
                    className={styles.productCard__imgWr__imgBox__img}
                    src={product.masterData.current.masterVariant.images[0].url}
                    alt={product.masterData.current.masterVariant.images[0].label}
                  />
                </a>
              </div>
            </div>
            <div>
              <div className={styles.bookSpanBox}>
                <span className={styles.bookItemMoney}>
                  {product.masterData.current.masterVariant.prices[0].value.centAmount / 100}$
                </span>
              </div>
              <div className={styles.bookSpanBox}>
                <a>
                  <span className={styles.bookItemMoney} style={{ fontSize: '14px' }}>
                    {product.masterData.current.name['en-US']}
                  </span>
                </a>
              </div>
              <div className={styles.bookSpanBox}>
                <a>
                  <span
                    className={styles.bookItemMoney}
                    style={{ color: '#949599', fontSize: '14px' }}
                  >
                    {product.masterData.current.masterVariant.attributes[0].value}
                  </span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Products;
