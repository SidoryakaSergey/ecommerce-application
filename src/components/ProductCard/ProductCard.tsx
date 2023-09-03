import { useNavigate } from 'react-router-dom';
import styles from './ProductCard.module.css';
import { ProductsArr } from '../../interfaces/productsI.ts';

const ProductCard = (product: ProductsArr) => {
  const navigate = useNavigate();
  let productMasterVarian;
  let productName;
  if (product.masterVariant && product.name) {
    productMasterVarian = product.masterVariant;
    productName = product.name['en-US'];
  } else {
    productMasterVarian = product.masterData.current.masterVariant;
    productName = product.masterData.current.name['en-US'];
  }

  function openCard() {
    navigate(`/card/${product.id}`);
  }
  let prices;
  if (productMasterVarian.prices[0].discounted) {
    prices = (
      <div className={`${styles.bookSpanBox}`}>
        <span className={styles.bookItemMoney}>
          {productMasterVarian.prices[0].discounted.value.centAmount / 100}$ &nbsp;
        </span>
        <span className={`${styles.bookItemMoney} ${styles.bookItemMoneyWithDiscount}`}>
          {productMasterVarian.prices[0].value.centAmount / 100}$
        </span>
      </div>
    );
  } else {
    prices = (
      <div className={styles.bookSpanBox}>
        <span className={styles.bookItemMoney}>
          {productMasterVarian.prices[0].value.centAmount / 100}$
        </span>
      </div>
    );
  }

  return (
    <div className={styles.productCard} onClick={openCard}>
      <div className={styles.productCard__imgWr}>
        <div className={styles.productCard__imgWr__imgBox}>
          <a>
            <img
              className={styles.productCard__imgWr__imgBox__img}
              src={productMasterVarian.images[0].url}
              alt={productMasterVarian.images[0].label}
            />
          </a>
        </div>
      </div>
      <div>
        {prices}
        <div className={styles.bookSpanBox}>
          <a>
            <span className={styles.bookName} style={{ fontSize: '14px' }}>
              {productName}
            </span>
          </a>
        </div>
        <div className={styles.bookSpanBox}>
          <a>
            <span className={styles.bookItemMoney} style={{ color: '#949599', fontSize: '14px' }}>
              {productMasterVarian.attributes[0].value}
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
