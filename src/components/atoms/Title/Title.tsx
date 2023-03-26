import styles from "./Title.module.scss";

export const Title = () => {
  return (
    <h1 className={styles.title}>
      Yo<span className={styles.part1}>u</span>r<span className={styles.part2}> n</span>o
      <span className={styles.part3}>t</span>e<span className={styles.part4}>s</span>
    </h1>
  );
};
