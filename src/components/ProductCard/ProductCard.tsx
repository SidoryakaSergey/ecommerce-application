import { useNavigate } from 'react-router-dom';
import styles from './ProductCard.module.css';
import { ProductsArr } from '../../interfaces/productsI.ts';

const ProductCard = (product: ProductsArr) => {
  const navigate = useNavigate();

  function openCard() {
    navigate(`/card/${product.id}`);
  }
  let prices;
  if (product.masterData.current.masterVariant.prices[0].discounted) {
    prices = (
      <div className={`${styles.bookSpanBox}`}>
        <span className={styles.bookItemMoney}>
          {product.masterData.current.masterVariant.prices[0].discounted.value.centAmount / 100}$
          &nbsp;
        </span>
        <span className={`${styles.bookItemMoney} ${styles.bookItemMoneyWithDiscount}`}>
          {product.masterData.current.masterVariant.prices[0].value.centAmount / 100}$
        </span>
      </div>
    );
  } else {
    prices = (
      <div className={styles.bookSpanBox}>
        <span className={styles.bookItemMoney}>
          {product.masterData.current.masterVariant.prices[0].value.centAmount / 100}$
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
              src={product.masterData.current.masterVariant.images[0].url}
              alt={product.masterData.current.masterVariant.images[0].label}
            />
          </a>
        </div>
      </div>
      <div>
        {prices}
        <div className={styles.bookSpanBox}>
          <a>
            <span className={styles.bookItemMoney} style={{ fontSize: '14px' }}>
              {product.masterData.current.name['en-US']}
            </span>
          </a>
        </div>
        <div className={styles.bookSpanBox}>
          <a>
            <span className={styles.bookItemMoney} style={{ color: '#949599', fontSize: '14px' }}>
              {product.masterData.current.masterVariant.attributes[0].value}
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
