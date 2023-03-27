import React, { ChangeEvent } from "react";
import styles from "./ModalWindowTag.module.scss";

import { ModalOuter } from "../../atoms/ModalOuter/ModalOuter";

interface IProps {
  closeModal: () => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  addItem?: () => void;
}

export const ModalWindowTag = ({ closeModal, onChange, value, addItem }: IProps) => {
  return (
    <ModalOuter closeModal={closeModal} addItem={addItem}>
      <div className={styles.modalWindow}>
        <h3 className={styles.title}>Title</h3>
        <input type="text" value={value} onChange={onChange} className={styles.input} placeholder="add tag..." />
      </div>
    </ModalOuter>
  );
};
