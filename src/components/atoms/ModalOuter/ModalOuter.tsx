import { ReactNode, useRef } from "react";

import styles from "./ModalOuter.module.scss";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";

interface IProps {
  children: ReactNode;
  closeModal: () => void;
  addItem?: () => void;
  changingType?: boolean;
}

export const ModalOuter = ({ children, closeModal, addItem, changingType }: IProps) => {
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
            {changingType ? "Save" : "Add"}
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};
