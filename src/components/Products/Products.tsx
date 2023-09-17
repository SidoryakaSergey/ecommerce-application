import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import getProducts from '../../fetchs/getProducts.ts';
import { ProductsArr, ResponseProducts } from '../../interfaces/productsI.ts';
import styles from './Products.module.css';
import ProductCard from '../ProductCard/ProductCard.tsx';

type ProductsProps = {
  catalogValue?: string;
};

const Products: React.FC<ProductsProps> = (props) => {
  const [products, setProducts] = useState<ProductsArr[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [activePage, setActivePage] = useState(1);

  function calculateLimit() {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 1351) {
      return 10;
    }
    if (windowWidth >= 801) {
      return 9;
    }
    if (windowWidth >= 516) {
      return 6;
    }
    return 4;
  }

  const [limit, setLimit] = useState(calculateLimit());

  useEffect(() => {
    const updateLimit = () => setLimit(calculateLimit());

    updateLimit();
    window.addEventListener('resize', updateLimit);

    return () => {
      window.removeEventListener('resize', updateLimit);
    };
  }, []);

  useEffect(() => {
    const fetchProducts = () => {
      if (props.catalogValue) {
        getProducts(props.catalogValue, activePage, limit)
          .then((response: ResponseProducts) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
            setProducts(response.results);
            setTotalPages(Math.ceil(response.total / limit));
          })
          .catch((error: Error) => {
            return error.message;
          });
      } else {
        getProducts(undefined, activePage, limit)
          .then((response: ResponseProducts) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
            setProducts(response.results);
            setTotalPages(Math.ceil(response.total / limit));
          })
          .catch((error: Error) => {
            return error.message;
          });
      }
    };
    fetchProducts();
  }, [props.catalogValue, activePage, limit]);

  const handlePageClick = (e: { selected: number }) => {
    setActivePage(e.selected + 1);
  };

  return (
    <div className={styles.mainBox}>
      <div className={styles.productsBox} style={{ padding: '15px 0' }}>
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
      <div className="flex items-center justify-center w-full">
        <ReactPaginate
          previousLabel={
            <button
              onClick={() => handlePageClick({ selected: activePage - 1 })}
              className={`w-[20px] h-[20px] text-blue-500 hover:text-blue-700 ${
                activePage === 1 ? 'cursor-not-allowed opacity-50' : ''
              }`}
              disabled={activePage === 1}
            >
              <ArrowLeftIcon />
            </button>
          }
          nextLabel={
            <button
              onClick={() => handlePageClick({ selected: activePage })}
              className={`w-[20px] h-[20px] text-blue-500 hover:text-blue-700 ${
                activePage === totalPages ? 'cursor-not-allowed opacity-50' : ''
              }`}
              disabled={activePage === totalPages}
            >
              <ArrowRightIcon />
            </button>
          }
          nextLinkClassName="h-[30px] w-[30px] flex items-center justify-center rounded-md border border-gray-300 hover:bg-gray-200" // a
          previousLinkClassName="h-[30px] w-[30px] flex items-center justify-center rounded-md border border-gray-300 hover:bg-gray-200" // a
          previousClassName="" // li
          nextClassName="" // li
          breakLabel={'...'}
          pageCount={totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName="flex justify-center w-full gap-1 mt-5" // контейнер цыфр
          pageClassName="h-[30px] w-[30px] flex items-center justify-center " // class li
          pageLinkClassName="h-[30px] w-[30px] flex items-center justify-center hover:bg-blue-200 text-blue-700 rounded-full" // class a
          activeClassName="bg-blue-500 text-white rounded-full"
        />
      </div>
    </div>
  );
};
export default Products;
