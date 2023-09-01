import React, { useEffect, useState } from 'react';
import getProducts from '../../fetchs/getProducts.ts';
import { ProductsArr, ResponseProducts } from '../../interfaces/productsI.ts';
import styles from './Products.module.css';
import ProductCard from '../ProductCard/ProductCard.tsx';

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
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            version={product.version}
            versionModifiedAt={product.versionModifiedAt}
            lastMessageSequenceNumber={product.lastMessageSequenceNumber}
            createdAt={product.createdAt}
            lastModifiedAt={product.lastModifiedAt}
            lastModifiedBy={product.lastModifiedBy}
            createdBy={product.createdBy}
            productType={product.productType}
            masterData={product.masterData}
            priceMode={product.priceMode}
            lastVariantId={product.lastVariantId}
          />
        ))}
      </div>
    </div>
  );
};
export default Products;
