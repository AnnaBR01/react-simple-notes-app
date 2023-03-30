/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import classNames from "classnames";

import styles from "./ModalWindowNote.module.scss";
import { ITag } from "../../../types/types";

import { ModalOuter, Tag, Hightlight } from "../../";

interface IProps {
  closeModal: () => void;
  onChangeTitle: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeArea: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  valueTitle: string;
  valueArea: string;
  addItem?: () => void;
  newTags: [] | ITag[];
}

export const ModalWindowNote = ({ closeModal, onChangeTitle, valueTitle, addItem, onChangeArea, valueArea, newTags }: IProps) => {
  const getTagsName = useCallback(
    (tags: ITag[]) => {
      return tags.map((el) => {
        return el.tagName;
      });
    },
    [newTags, valueArea],
  );

  return (
    <ModalOuter closeModal={closeModal} addItem={addItem}>
      <div className={styles.modalWindow}>
        <h3 className={styles.title}>Title</h3>
        <input type="text" value={valueTitle} onChange={onChangeTitle} className={styles.input} placeholder="add title..." />
      </div>

      <div className={styles.modalWindow}>
        <h3 className={classNames(styles.title, styles.position)}>
          Description{" "}
          <p id="hightlight" className={styles.text}>
            <Hightlight text={valueArea} tagsNameArr={getTagsName(newTags)} />
          </p>
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
