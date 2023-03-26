import styles from "./Header.module.scss";

import { Title } from "../../atoms/Title/Title";
import { Plus } from "../../atoms/Plus/Plus";

export const Header = () => {
  return (
    <header className={styles.headerWrapper}>
      <Title />
      <Plus />
    </header>
  );
};
