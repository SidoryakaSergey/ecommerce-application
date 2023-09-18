import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from '@heroicons/react/24/outline';
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
  const [isLoading, setIsLoading] = useState(true);
  const [isAscendingName, setIsAscendingName] = useState(true);
  const [isAscendingPrice, setIsAscendingPrice] = useState(false);
  const [priceColor, setPriceColor] = useState('bg-blue-200');
  const [nameColor, setNameColor] = useState('bg-blue-500');
  const [sortByName, setSortByName] = useState(true);

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
      setIsLoading(true);
      if (props.catalogValue) {
        getProducts(
          activePage,
          limit,
          sortByName,
          isAscendingName,
          isAscendingPrice,
          props.catalogValue,
        )
          .then((response: ResponseProducts) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
            setProducts(response.results);
            setTotalPages(Math.ceil(response.total / limit));
            setIsLoading(false);
          })
          .catch((error: Error) => {
            setIsLoading(false);
            return error.message;
          });
      } else {
        getProducts(activePage, limit, sortByName, isAscendingName, isAscendingPrice)
          .then((response: ResponseProducts) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
            setProducts(response.results);
            setTotalPages(Math.ceil(response.total / limit));
            setIsLoading(false);
          })
          .catch((error: Error) => {
            setIsLoading(false);
            return error.message;
          });
      }
    };
    fetchProducts();
  }, [props.catalogValue, activePage, limit, sortByName, isAscendingName, isAscendingPrice]);

  const handlePageClick = (e: { selected: number }) => {
    setActivePage(e.selected + 1);
  };

  const handelePriceClick = () => {
    setIsAscendingPrice((prevIsAscending) => !prevIsAscending);
    setPriceColor('bg-blue-500');
    setNameColor('bg-blue-200');
    setSortByName(false);
  };

  const handeleNameClick = () => {
    setIsAscendingName((prevIsAscending) => !prevIsAscending);
    setNameColor('bg-blue-500');
    setPriceColor('bg-blue-200');
    setSortByName(true);
  };

  return (
    <div className={styles.mainBox}>
      <div className="flex mt-2 gap-2">
        <button
          className={`flex items-center space-x-1 px-2 py-1 ${nameColor} text-black rounded-md hover:bg-blue-700`}
          onClick={handeleNameClick}
        >
          <span>Name</span>
          {isAscendingName ? (
            <ArrowUpIcon className="w-4 h-4" />
          ) : (
            <ArrowDownIcon className="w-4 h-4" />
          )}
        </button>

        <button
          className={`flex items-center space-x-1 px-2 py-1 ${priceColor} text-black rounded-md hover:bg-blue-700`}
          onClick={handelePriceClick}
        >
          <span>Price</span>
          {isAscendingPrice ? (
            <ArrowUpIcon className="w-4 h-4" />
          ) : (
            <ArrowDownIcon className="w-4 h-4" />
          )}
        </button>
      </div>
      <div className={styles.productsBox} style={{ padding: '15px 0' }}>
        {isLoading ? (
          <div className="flex w-full justify-center">
            <p className="text-gray-500 text-xl mt-4">Loading...</p>
          </div>
        ) : (
          products.map((product) => (
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
          ))
        )}
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
          nextLinkClassName="h-[30px] w-[30px] flex items-center justify-center rounded-md border border-gray-300 hover:bg-gray-200"
          previousLinkClassName="h-[30px] w-[30px] flex items-center justify-center rounded-md border border-gray-300 hover:bg-gray-200"
          previousClassName=""
          nextClassName=""
          breakLabel={'...'}
          pageCount={totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName="flex justify-center w-full gap-1 mt-5"
          pageClassName="h-[30px] w-[30px] flex items-center justify-center "
          pageLinkClassName="h-[30px] w-[30px] flex items-center justify-center hover:bg-blue-200 text-blue-700 rounded-full"
          activeClassName="bg-blue-500 text-white rounded-full"
        />
      </div>
    </div>
  );
};
export default Products;
