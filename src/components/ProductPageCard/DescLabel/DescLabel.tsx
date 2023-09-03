import styles from './DescLabel.module.css';

const DescLabel = (props: { labelName: string; value: string | number }) => {
  return (
    <div className={styles.labelBox}>
      <label className={styles.labelName}>{props.labelName}</label>
      <label className={styles.labelValue}>{props.value}</label>
    </div>
  );
};

export default DescLabel;
