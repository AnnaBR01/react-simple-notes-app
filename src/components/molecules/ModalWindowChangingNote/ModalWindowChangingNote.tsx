import { ChangeEvent, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import classNames from "classnames";

import styles from "./ModalWindowChangingNote.module.scss";
import { ITag } from "../../../types/types";

import { ModalOuter, Tag, Hightlight } from "../../";

interface IProps {
  closeModal: () => void;
  onChangeTitle: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeArea: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  valueTitle: string;
  valueArea: string;
  saveItem?: () => void;
  newTags: [] | ITag[];
}

export const ModalWindowChangingNote = ({
  closeModal,
  onChangeTitle,
  valueTitle,
  saveItem,
  valueArea,
  onChangeArea,
  newTags,
}: IProps) => {
  const light = useCallback(
    (str: string) =>
      newTags.map((el) => {
        return <Hightlight filter={"#" + el.tagName} str={str} key={uuidv4()} />;
      }),
    [newTags],
  );

  return (
    <ModalOuter closeModal={closeModal} addItem={saveItem} changingType={true}>
      <div className={styles.modalWindow}>
        <h3 className={styles.title}>Title</h3>
        <input type="text" value={valueTitle} onChange={onChangeTitle} className={styles.input} placeholder="add title..." />
      </div>

      <div className={styles.modalWindow}>
        <h3 className={classNames(styles.title, styles.position)}>
          Description <p className={styles.text}>{light(valueArea)}</p>
        </h3>
        <textarea
          className={classNames(styles.input, styles.area)}
          value={valueArea}
          placeholder="add description..."
          onChange={onChangeArea}
        />
      </div>

      <div className={styles.tagsWrapper}>
        {newTags.length > 0 &&
          newTags.map((tag) => {
            return <Tag key={uuidv4()} tagName={tag.tagName} active={true} modal={true} />;
          })}
      </div>
    </ModalOuter>
  );
};
