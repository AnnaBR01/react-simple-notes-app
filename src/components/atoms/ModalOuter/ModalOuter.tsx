import { ReactNode, useRef } from "react";

import styles from "./ModalOuter.module.scss";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";

interface IProps {
  children: ReactNode;
  closeModal: () => void;
  addItem?: () => void;
}

export const ModalOuter = ({ children, closeModal, addItem }: IProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => {
    closeModal();
  });

  return (
    <div className={styles.wrapper}>
      <div ref={ref} className={styles.modalWindow}>
        <div className={styles.serviceWrapper}>
          <button type="button" className={styles.close} onClick={closeModal}>
            Cancel
          </button>
          <button type="button" className={styles.add} onClick={addItem}>
            Add
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};
