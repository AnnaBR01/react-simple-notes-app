import styles from "./Plus.module.scss";

interface IProps {
  onClick?: () => void;
}

export const Plus = ({ onClick }: IProps) => {
  return <button className={styles.plus} onClick={onClick} />;
};
