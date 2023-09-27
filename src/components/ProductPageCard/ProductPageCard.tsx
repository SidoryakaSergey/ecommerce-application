import { useCallback, useEffect, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Modal from 'react-modal';
import { NavLink } from 'react-router-dom';
import { TrashIcon } from '@heroicons/react/24/outline';
import { ToastContainer } from 'react-toastify';
import { ProductsArr } from '../../interfaces/productsI.ts';
import getProduct from '../../fetchs/getProduct.ts';
import styles from './ProductPageCard.module.css';
import DescLabel from './DescLabel/DescLabel.tsx';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Loading from '../Loading/Loading.tsx';
import getCart from '../../fetchs/getCart.ts';
import Cart, { MeCartsResp } from '../../interfaces/cart.ts';
import updateTokenFromRefresh from '../../fetchs/updateTokenFromRefresh.ts';
import updateCart from '../../fetchs/updateCartAddItem.ts';
import deleteProductFromCartFetch from '../../fetchs/deleteProductFromCart.ts';
import { showErrorToastMessage } from '../../utils/toastFuncs.tsx';

interface ProductPageCardProps {
  id: string;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
Modal.setAppElement('body');

const ProductPageCard = (props: ProductPageCardProps) => {
  const { id } = props;
  const [product, setProduct] = useState<ProductsArr>();
  const [showModal, setShowModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isProductInCart, setIsProductInCart] = useState(false);

  async function buy(): Promise<void> {
    console.log(`fsadfsdf`);
    if (localStorage.getItem('bearToken')) {
      await updateTokenFromRefresh().then(() => {
        const token = localStorage.getItem('bearToken') as string;
        // eslint-disable-next-line no-void
        void getCart(token).then(async (resp) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const respData: { count: number; limit: number; offset: number; results: Cart[] } =
            JSON.parse(resp);
          const idCart = respData.results[0].id;
          const { version } = respData.results[0];
          await updateCart(idCart, id, version, token);
          setIsProductInCart(true);
        });
      });
    } else {
      showErrorToastMessage('Please log in to add products to the cart.');
    }
  }

  const productCheck = useCallback(async (): Promise<boolean> => {
    if (localStorage.getItem('bearToken')) {
      await updateTokenFromRefresh();
      const token = localStorage.getItem('bearToken') as string;
      const resp = await getCart(token);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const respData: { count: number; limit: number; offset: number; results: Cart[] } =
        JSON.parse(resp);
      return respData.results[0].lineItems.some((element) => element.productId === id);
    }
    return false;
  }, [id]);

  const makePriceButton = useCallback(async () => {
    const productInCart = await productCheck();
    setIsProductInCart(productInCart);
  }, [productCheck]);

  useEffect(() => {
    void makePriceButton();
  }, [makePriceButton]);

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

  const customStyles = {
    content: {
      maxHeight: '70vh',
      height: '100%',
    },
  };

  function deleteProductFromCart() {
    void updateTokenFromRefresh().then(() => {
      const userToken = localStorage.getItem('bearToken') as string;
      void getCart(userToken).then((getResponse) => {
        const getCartData: MeCartsResp = JSON.parse(getResponse);
        const cartVersion = getCartData.results[0].version;
        const cartId = getCartData.results[0].id;
        const lineItemProductId = getCartData.results[0].lineItems.find(
          (el) => el.productId === id,
        );
        if (lineItemProductId) {
          void deleteProductFromCartFetch(
            cartId,
            lineItemProductId.id,
            cartVersion,
            userToken,
          ).then((deleteProductResp) => {
            const createData: Cart = JSON.parse(deleteProductResp);
            localStorage.setItem('cartId', createData.id);
            setIsProductInCart(false);
          });
        } else {
          showErrorToastMessage('Error deleting product. Product not found.');
        }
      });
    });
  }

  let prices;

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  if (product) {
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
        <div className={`${styles.bookSpanBox}`}>
          <span className={`${styles.bookItemMoney}`}>
            {product.masterData.current.masterVariant.prices[0].value.centAmount / 100}$
          </span>
        </div>
      );
    }
    const { images } = product.masterData.current.masterVariant;

    return (
      <div className={styles.pageBox}>
        <Modal style={customStyles} isOpen={showModal} onRequestClose={closeModal}>
          <Swiper
            style={{ height: '100%' }}
            grabCursor={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className={`${styles.modalSwiper} ${styles.swiperWrapper}`}
            spaceBetween={50}
            slidesPerView={1}
            initialSlide={selectedImageIndex}
          >
            {images.map((image, index) => (
              <SwiperSlide
                key={index}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <img className={`${styles.moduleImg}`} src={image.url} alt={'cover'} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Modal>
        <div className={styles.imageBox}>
          {!showModal ? (
            <Swiper
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              grabCursor={true}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              className={styles.imageWrapper}
              spaceBetween={50}
              slidesPerView={1}
            >
              {images.map((image, index) => (
                <SwiperSlide
                  key={index}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <img
                    onClick={() => openModal(index)}
                    className={styles.image}
                    src={image.url}
                    alt={'cover'}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : null}
        </div>
        <div className={styles.descBox}>
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
              {prices}
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
          </div>
          <div className={styles.annotaion}>
            {product.masterData.current.masterVariant.attributes[5].value}
          </div>
          {!isProductInCart ? (
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            <button className={styles.myButton} onClick={buy}>
              Add to cart
            </button>
          ) : (
            <div className={styles.goToMyCartBox}>
              <NavLink to={'/cart'} className={`${styles.myButton} ${styles.GoToCartBtn}`}>
                Go to my cart
              </NavLink>
              <div className={styles.deleteProductBox} onClick={deleteProductFromCart}>
                <TrashIcon />
              </div>
            </div>
          )}
        </div>
        <ToastContainer />
      </div>
    );
  }
  return <Loading />;
};

export default ProductPageCard;
