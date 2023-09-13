import styles from './MyButton.module.css';

const MyButton = (props: { children: string; onClick: () => void }) => {
  return (
    <button className={styles.myButton} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default MyButton;
