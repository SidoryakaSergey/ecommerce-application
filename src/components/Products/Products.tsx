import React, { useEffect, useState } from 'react';
import getProducts from '../../fetchs/getProducts.ts';
import { ProductsArr, ResponseProducts } from '../../interfaces/productsI.ts';
import styles from './Products.module.css';
import ProductCard from '../ProductCard/ProductCard.tsx';

type ProductsProps = {
  catalogValue?: string;
};

const Products: React.FC<ProductsProps> = (props) => {
  const [products, setProducts] = useState<ProductsArr[]>([]);
  useEffect(() => {
    const fetchProducts = () => {
      if (props.catalogValue) {
        getProducts(props.catalogValue)
          .then((response: ResponseProducts) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
            setProducts(response.results);
          })
          .catch((error: Error) => {
            return error.message;
          });
      } else {
        getProducts()
          .then((response: ResponseProducts) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
            setProducts(response.results);
          })
          .catch((error: Error) => {
            return error.message;
          });
      }
    };
    fetchProducts();
  }, [props.catalogValue]);

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
            masterVariant={product.masterVariant}
            name={product.name}
          />
        ))}
      </div>
    </div>
  );
};
export default Products;
