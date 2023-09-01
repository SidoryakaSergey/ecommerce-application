import { useNavigate } from 'react-router-dom';
import styles from './BurgerMenu.module.css';

const BurgerMenu = () => {
  const navigate = useNavigate();
  function openCurrentPage(pageName: string) {
    navigate(`/${pageName}`);
  }
  return (
    <div className={styles.burgerBox}>
      <ul>
        <h2 className={styles.title}>Catalog</h2>
        <li className={styles.listEl} onClick={() => openCurrentPage('horrors')}>
          Horrors
        </li>
        <li className={styles.listEl} onClick={() => openCurrentPage('erotica')}>
          Erotica
        </li>
        <li className={styles.listEl} onClick={() => openCurrentPage('thrillers')}>
          Thrillers
        </li>
      </ul>
    </div>
  );
};

export default BurgerMenu;
