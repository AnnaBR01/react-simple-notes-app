import { ChangeEvent, useEffect, useState } from "react";

import styles from "./Header.module.scss";
import { useDebounce } from "../../../hooks";
import { checkTags, checkTagsInTagsContent } from "../../../utils";
import { ITag } from "../../../types/types";
import { useNotesContext, useTagsContext } from "../../../context";

import { Title, Plus, Error, ModalWindowNote } from "../../";

export const Header = () => {
  const { addNewNote } = useNotesContext();
  const { addNewTagsByNote, tags } = useTagsContext();
  const [isOpenModalNote, toggleIsOpenModalNote] = useState(false);
  const [titleValue, setTitleValue] = useState("");
  const [areaValue, setAreaValue] = useState("");
  const debounceValue = useDebounce(areaValue);
  const [newTags, setNewTags] = useState<[] | ITag[]>([]);
  const [error, setError] = useState(false);

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>): void => {
    setTitleValue(event.target.value);
  };

  const onChangeArea = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setAreaValue(event.target.value);
  };

  const closeModal = () => {
    toggleIsOpenModalNote(false);
  };

  useEffect(() => {
    const changedTags = checkTags(debounceValue, tags);
    setNewTags(changedTags);
  }, [debounceValue, tags]);

  const handlelNote = () => {
    if (titleValue) {
      addNewNote(titleValue, debounceValue, newTags);
      if (newTags.length > 0) {
        addNewTagsByNote(checkTagsInTagsContent(tags, newTags));
      }

      toggleIsOpenModalNote(false);
      setTitleValue("");
      setAreaValue("");
      setNewTags([]);
    } else {
      setError(true);
    }
  };

  return (
    <header className={styles.headerWrapper}>
      {error && (
        <Error
          toggleIsOpenError={() => {
            setError(false);
          }}
          title="Enter title!"
        />
      )}

      {isOpenModalNote && (
        <ModalWindowNote
          closeModal={closeModal}
          valueTitle={titleValue}
          onChangeTitle={onChangeTitle}
          valueArea={areaValue}
          onChangeArea={onChangeArea}
          addItem={handlelNote}
          newTags={newTags}
        />
      )}

      <Title />
      <Plus
        onClick={() => {
          toggleIsOpenModalNote(true);
        }}
      />
    </header>
  );
};
