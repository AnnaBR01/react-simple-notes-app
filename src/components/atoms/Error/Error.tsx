import { motion } from "framer-motion";
import styles from "./Error.module.scss";

interface IProps {
  title: string;
  toggleIsOpenError: () => void;
}

export const Error = ({ title, toggleIsOpenError }: IProps) => {
  setTimeout(() => {
    toggleIsOpenError();
  }, 5000);

  return (
    <motion.div className={styles.error} animate={{ y: 50 }} initial={{ y: -100 }} exit={{ y: -100 }} transition={{ duration: 1 }}>
      {title}
    </motion.div>
  );
};
