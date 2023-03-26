import styles from "./Footer.module.scss";
import { useWindowSize } from "../../../hooks/useWindowSize";

import { LogoIcon } from "../../../assets";

export const Footer = () => {
  const { width = 0 } = useWindowSize();

  return (
    <footer className={styles.footerWrapper}>
      <LogoIcon width={width < 768 ? 100 : 150} />
    </footer>
  );
};
