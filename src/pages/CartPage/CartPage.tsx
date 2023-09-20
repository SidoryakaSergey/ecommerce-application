import { Breadcrumbs, Typography } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { ToastContainer } from 'react-toastify';
import stylesMy from './CartPage.module.css';
import getCart from '../../fetchs/getCart.ts';
import Cart, { MeCartsResp } from '../../interfaces/cart.ts';
import updateTokenFromRefresh from '../../fetchs/updateTokenFromRefresh.ts';
import deleteCart from '../../fetchs/deleteCart.ts';
import createCart from '../../fetchs/createCart.ts';
import updateCartChangeQuantity from '../../fetchs/updateCartChangeQuantity.ts';
import deleteProductFromCartFetch from '../../fetchs/deleteProductFromCart.ts';
import { showErrorToastMessage } from '../../utils/toastFuncs.tsx';

const CartPage = () => {
  const [products, setProducts] = useState<Cart>();
  const [quantities, setQuantities] = useState<number[]>([]);
  useEffect(() => {
    const fetchCart = () => {
      if (localStorage.getItem('bearToken')) {
        const token = localStorage.getItem('bearToken') as string;
        getCart(token)
          .then((response) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const data: { count: number; limit: number; offset: 0; results: Cart[] } =
              JSON.parse(response);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
            setProducts(data.results[0]);
          })
          .catch((error: Error) => {
            showErrorToastMessage(error.message);
          });
      }
    };
    fetchCart();
  }, []);

  useEffect(() => {
    if (products && products.lineItems) {
      const initialQuantities = products.lineItems.map((product) => product.quantity);
      setQuantities(initialQuantities);
    }
  }, [products]);

  const handleQuantityChange = (index: number, value: number) => {
    const newQuantities = [...quantities];
    newQuantities[index] = value;
    setQuantities(newQuantities);
  };

  const handleMinusButtonClick = (index: number) => {
    if (quantities[index] > 1) {
      handleQuantityChange(index, quantities[index] - 1);
      return (
        updateTokenFromRefresh()
          // eslint-disable-next-line consistent-return
          .then(() => {
            const userToken = localStorage.getItem('bearToken') as string;
            if (products) {
              return updateCartChangeQuantity(
                products?.id,
                products?.lineItems[index].id,
                products?.version,
                userToken,
                quantities[index] - 1,
              );
            }
          })
          .then((response) => {
            if (typeof response === 'string') {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              const updatedProducts: Cart = JSON.parse(response);
              setProducts(updatedProducts);
            }
          })
          .catch((error: Error) => {
            showErrorToastMessage(error.message);
          })
      );
    }
    return null;
  };

  const handlePlusButtonClick = (index: number) => {
    handleQuantityChange(index, quantities[index] + 1);
    return (
      updateTokenFromRefresh()
        // eslint-disable-next-line consistent-return
        .then(() => {
          const userToken = localStorage.getItem('bearToken') as string;
          if (products) {
            return updateCartChangeQuantity(
              products?.id,
              products?.lineItems[index].id,
              products?.version,
              userToken,
              quantities[index] + 1,
            );
          }
        })
        .then((response) => {
          if (typeof response === 'string') {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const updatedProducts: Cart = JSON.parse(response);
            setProducts(updatedProducts);
          }
        })
        .catch((error: Error) => {
          showErrorToastMessage(error.message);
        })
    );
  };

  const handleInputChange = (index: number, value: string) => {
    let parsedValue = parseInt(value, 10);
    if (parsedValue > 99) parsedValue = 99;
    if (!Number.isNaN(parsedValue)) {
      handleQuantityChange(index, parsedValue);
      return (
        updateTokenFromRefresh()
          // eslint-disable-next-line consistent-return
          .then(() => {
            const userToken = localStorage.getItem('bearToken') as string;
            if (products) {
              return updateCartChangeQuantity(
                products?.id,
                products?.lineItems[index].id,
                products?.version,
                userToken,
                parseInt(value, 10),
              );
            }
          })
          .then((response) => {
            if (typeof response === 'string') {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              const updatedProducts: Cart = JSON.parse(response);
              setProducts(updatedProducts);
            }
          })
          .catch((error: Error) => {
            showErrorToastMessage(error.message);
          })
      );
    }
    return null;
  };

  function calculatePriceWithoutDiscount() {
    if (products) {
      const totalCents = products.lineItems.reduce((acc, item) => {
        const itemPriceCents = item.price.value.centAmount;
        const itemQuantity = item.quantity;
        return acc + itemPriceCents * itemQuantity;
      }, 0);
      return totalCents / 100;
    }

    return 0;
  }

  function deleteProductFromCart(productId: string) {
    void updateTokenFromRefresh().then(() => {
      const userToken = localStorage.getItem('bearToken') as string;
      void getCart(userToken).then((getResponse) => {
        const getCartData: MeCartsResp = JSON.parse(getResponse);
        const cartVersion = getCartData.results[0].version;
        const cartId = getCartData.results[0].id;
        void deleteProductFromCartFetch(cartId, productId, cartVersion, userToken).then(
          (deleteProductResp) => {
            const createData: Cart = JSON.parse(deleteProductResp);
            localStorage.setItem('cartId', createData.id);
            setProducts(createData);
          },
        );
      });
    });
  }

  function deleteUserCart() {
    void updateTokenFromRefresh().then(() => {
      const userToken = localStorage.getItem('bearToken') as string;
      void getCart(userToken).then((getResponse) => {
        const getCartData: MeCartsResp = JSON.parse(getResponse);
        const cartVersion = getCartData.results[0].version;
        void deleteCart(userToken, getCartData.results[0].id, cartVersion).then(() => {
          void createCart(userToken).then((createResp) => {
            const createData: Cart = JSON.parse(createResp);
            localStorage.setItem('cartId', createData.id);
            setProducts(createData);
          });
        });
      });
    });
  }

  console.log(products);
  return (
    <div className={stylesMy.bodyContent}>
      <div className={stylesMy.container}>
        <div className={stylesMy.subHead}>
          <div className="mb-3">
            <Breadcrumbs aria-label="breadcrumb">
              <Link className=" hover:underline" color="inherit" to="/">
                Home
              </Link>
              <Typography color="text.primary">Cart</Typography>
            </Breadcrumbs>
          </div>
          <div className={stylesMy.row}>
            <div className={stylesMy.cartInfoBox}>
              <div className={stylesMy.cartInfoContainer}>
                <div className={stylesMy.cartInfoContainerTitle}>
                  <h2 className={stylesMy.cartInfoContainerTitleH2}>Cart</h2>
                  <span className={stylesMy.cartInfoContainerSpan}>
                    {products?.totalLineItemQuantity
                      ? `${products?.totalLineItemQuantity} books`
                      : ``}
                  </span>
                </div>
                <div className={stylesMy.cartInfoContainerClearBox}>
                  <button onClick={deleteUserCart} className={stylesMy.cartInfoContainerClearBox}>
                    Clear Shopping Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={stylesMy.contentWrap}>
          {products?.lineItems && products?.lineItems.length > 0 ? (
            <div className={stylesMy.contentWrapContainer}>
              <div className={stylesMy.contentWrapContainerColumn}>
                <div className={stylesMy.contentWrapContainerColumnBasketItems}>
                  {products?.lineItems.map((product, index) => (
                    <div key={index} className={stylesMy.basketItem}>
                      <div className={stylesMy.basketItemBox}>
                        <div className={stylesMy.basketItemImgBox}>
                          <NavLink to="/" className={stylesMy.basketItemImgLink}>
                            <img
                              className={stylesMy.basketItemImg}
                              src={product.variant.images[0].url}
                              alt="cover"
                            />
                          </NavLink>
                        </div>
                        <div className={stylesMy.basketItemInfo}>
                          <div className={stylesMy.basketItemInfoWrap}>
                            <div className={stylesMy.basketItemInfoText}>
                              <p className={stylesMy.basketItemInfoTextType}>Hardcover binding</p>
                              <p className={stylesMy.basketItemInfoTextTitle}>
                                <NavLink to={`/card/${product.productId}`}>
                                  {product.name['en-US']}
                                </NavLink>
                              </p>
                            </div>
                            <div className={stylesMy.basketItemInfoButton}>
                              <div className={stylesMy.basketItemInfoButtonQuantity}>
                                <div className={stylesMy.itemChanger}>
                                  <button
                                    disabled={quantities[index] === 1}
                                    className={`${stylesMy.ChangerBtnMinus} ${stylesMy.changerBtn}`}
                                    onClick={() => {
                                      void (async () => {
                                        await handleMinusButtonClick(index);
                                      })();
                                    }}
                                  ></button>
                                  <div className={stylesMy.ChangerCenter}>
                                    <div className={stylesMy.ChangerCounter}>
                                      <input
                                        className={stylesMy.ChangerCounterInput}
                                        type="text"
                                        value={quantities[index] || ''}
                                        onChange={(e) => {
                                          void (async (event) => {
                                            await handleInputChange(index, event.target.value);
                                          })(e);
                                        }}
                                      />
                                      <span className={stylesMy.ChangerCounterUnit}>
                                        {' '}
                                        &nbsp; шт.
                                      </span>
                                    </div>
                                  </div>
                                  <button
                                    className={`${stylesMy.ChangerBtnPlus} ${stylesMy.changerBtn}`}
                                    onClick={() => {
                                      void (async () => {
                                        await handlePlusButtonClick(index);
                                      })();
                                    }}
                                  ></button>
                                </div>
                                <p className={stylesMy.basketItemInfoButtonQuantityInfo}>
                                  <span className={stylesMy.basketItemPriceOne}>
                                    {product.price.discounted
                                      ? product.price.discounted.value.centAmount / 100
                                      : product.price.value.centAmount / 100}
                                  </span>
                                  $ per&nbsp;unit.
                                </p>
                              </div>
                            </div>
                            <div className={stylesMy.basketItemInfoMoney}>
                              <div className={stylesMy.basketItemInfoMoneyPrices}>
                                <span className={stylesMy.basketItemInfoMoneyPricesCurrent}>
                                  {product.totalPrice.centAmount / 100}$
                                </span>
                                {product.price.discounted ? (
                                  <span className={stylesMy.basketItemInfoMoneyPricesOld}>
                                    {(product.price.value.centAmount * product.quantity) / 100}$
                                  </span>
                                ) : (
                                  <span></span>
                                )}
                              </div>
                            </div>
                            <div
                              className={stylesMy.basketItemInfoDel}
                              onClick={() => {
                                deleteProductFromCart(product.id);
                              }}
                            >
                              <TrashIcon className={stylesMy.basketItemInfoDelButton}></TrashIcon>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={stylesMy.contentWrapContainerColumnTwo}>
                <section className={stylesMy.BasketSummary}>
                  <div className={stylesMy.BasketSummaryBox}>
                    <div className={stylesMy.BasketSummaryInfoBox}>
                      <div className={stylesMy.BasketSummaryInfoLine}>
                        <span className={stylesMy.BasketSummaryInfoLineTitle}>
                          Items in the order
                        </span>
                        <span className={stylesMy.BasketSummaryInfoLineVal}>
                          <span className={stylesMy.BasketSummaryInfoLineValCount}>
                            {products ? products.totalLineItemQuantity : ''}
                            &nbsp;pcs
                          </span>
                        </span>
                      </div>
                      <div className={stylesMy.BasketSummaryInfoLine}>
                        <span className={stylesMy.BasketSummaryInfoLineTitle}>
                          Total amount without discount
                        </span>
                        <span className={stylesMy.BasketSummaryInfoLineVal}>
                          <span className={stylesMy.BasketSummaryInfoLineValCount}>
                            {calculatePriceWithoutDiscount()}
                            &nbsp;$
                          </span>
                        </span>
                      </div>
                      <div className={stylesMy.BasketSummaryInfoLine}></div>
                      <div className={stylesMy.BasketSummaryInfoLine}></div>
                      <div className={stylesMy.BasketSummaryInfoLine}></div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          ) : (
            <div className={stylesMy.row}>
              <p className={`${stylesMy.basketTextEmpty} ${stylesMy.contentWrapContainerColumn}`}>
                You have no items in your cart yet.
              </p>
              <div
                className={`${stylesMy.basketAuthWrapper} ${stylesMy.contentWrapContainerColumn}`}
              >
                <p className={stylesMy.basketTextAuth}>
                  <b>Have you added any items to your cart?</b>
                  <br />
                  Log in to access your favorites and cart.
                </p>
                <NavLink to="/catalog" className={stylesMy.btnRed}>
                  GO TO CATALOG
                </NavLink>
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CartPage;
