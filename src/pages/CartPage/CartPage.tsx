import { Breadcrumbs, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import stylesMy from './CartPage.module.css';

const CartPage = () => {
  return (
    <div className={stylesMy.bodyContent}>
      <div className={stylesMy.container}>
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
                <span className={stylesMy.cartInfoContainerSpan}>3 books</span>
              </div>
              <div className={stylesMy.cartInfoContainerClearBox}>
                <button className={stylesMy.cartInfoContainerClearBox}>Clear Shopping Cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
