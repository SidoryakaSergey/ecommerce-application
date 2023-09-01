import styles from './MyButton.module.css';

const MyButton = (props: { value: number }) => {
  return <button className={styles.myButton}>{props.value}$</button>;
};

export default MyButton;
