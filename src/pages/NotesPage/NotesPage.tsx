import styles from "./NotesPage.module.scss";

import { Footer, Header, Main } from "../../components";

export const NotesPage = () => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
};
