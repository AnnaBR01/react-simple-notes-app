import styles from "./NotesPage.module.scss";

import { Footer } from "../../components/molecules/Footer/Footer";
import { Header } from "../../components/molecules/Header/Header";
import { Main } from "../../components/molecules/Main/Main";

export const NotesPage = () => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
};
