import { NavLink } from 'react-router-dom';
import styles from './MyButton.module.css';

function checkChildren(children: string, onClickProps: (() => void) | undefined) {
  if (children === 'Add to card') {
    return (
      <button className={styles.myButton} onClick={onClickProps}>
        Add to cart
      </button>
    );
  }
  return (
    <NavLink to={'/cart'} className={styles.myButton}>
      Go to my cart
    </NavLink>
  );
}

const MyButton = (props: { children: string; onClick?: () => void }) => {
  return (
    <button className={styles.myButton} onClick={props.onClick}>
      {checkChildren(props.children, props.onClick)}
    </button>
  );
};

export default MyButton;
