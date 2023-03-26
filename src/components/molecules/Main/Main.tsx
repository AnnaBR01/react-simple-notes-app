import { ChangeEvent, useCallback, useEffect, useState } from "react";

import styles from "./Main.module.scss";
import { useTagsContext } from "../../../context/TagsContext/hooks";
import { useNotesContext } from "../../../context/NotesContext/hooks";

import { Tag } from "../../atoms/Tag/Tag";
import { Plus } from "../../atoms/Plus/Plus";
import { Note } from "../Note/Note";
import { ModalWindowTag } from "../ModalWindowTag/ModalWindowTag";

export const Main = () => {
  const { tags, deleteTag, addNewTag } = useTagsContext();
  const { notes, deleteTagFromAllNotes } = useNotesContext();

  const [isOpenModalTag, toggleIsOpenModalTag] = useState(false);
  const [value, setValue] = useState<string>("");

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
  }, []);

  const deleteTagFromData = (tagId: string) => {
    deleteTag(tagId);
    deleteTagFromAllNotes(tagId);
  };

  const handlelTag = () => {
    addNewTag(value);
    toggleIsOpenModalTag(false);
    setValue("");
  };

  const closeModal = () => {
    toggleIsOpenModalTag(false);
    setValue("");
  };

  useEffect(() => {
    localStorage.setItem("tags", JSON.stringify(tags));
  }, [tags]);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <main className={styles.mainWrapper}>
      {isOpenModalTag && (
        <ModalWindowTag
          closeModal={closeModal}
          value={value}
          onChange={onChange}
          addItem={handlelTag}
        />
      )}

      <section className={styles.tagsWrapper}>
        {tags.map((tag) => {
          return (
            <Tag
              key={tag.id}
              tagElement={tag}
              onClick={() => {
                deleteTagFromData(tag.id);
              }}
            />
          );
        })}
        <Plus
          onClick={() => {
            toggleIsOpenModalTag(true);
          }}
        />
      </section>
      <section className={styles.notesWrapper}>
        {notes.length > 0 &&
          notes.map((note) => {
            return <Note key={note.id} noteElement={note} />;
          })}
      </section>
    </main>
  );
};
