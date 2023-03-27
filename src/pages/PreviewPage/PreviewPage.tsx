import { motion } from "framer-motion";

import styles from "./PreviewPage.module.scss";
import { useWindowSize } from "../../hooks";

import { LogoIcon } from "../../assets";
import { Title } from "../../components";

const welcomeBox = {
  initial: {},
  animate: {
    height: "0",
    y: "-100%",

    transition: {
      when: "beforeChildren",
      delay: 1.5,
      duration: 2,
      ease: [0.87, 0, 0.13, 1],
    },
  },
};

const content = {
  initial: {},
  animate: {
    y: "-100%",

    transition: {
      delay: 1.5,
      duration: 2,
      ease: [0.87, 0, 0.13, 1],
    },
  },
};

export const PreviewPage = () => {
  const { width = 0 } = useWindowSize();

  return (
    <motion.div className={styles.wrapper} initial="initial" animate="animate" variants={welcomeBox}>
      <motion.div className={styles.content} initial="initial" animate="animate" variants={content}>
        <Title />
        <LogoIcon width={width < 768 ? 200 : 900} />
      </motion.div>
    </motion.div>
  );
};
