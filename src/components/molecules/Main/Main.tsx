/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable indent */
import { ChangeEvent, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import styles from "./Main.module.scss";
import { useTagsContext } from "../../../context/TagsContext/hooks";
import { useNotesContext } from "../../../context/NotesContext/hooks";

import { Tag } from "../../atoms/Tag/Tag";
import { Plus } from "../../atoms/Plus/Plus";
import { Note } from "../Note/Note";
import { Error } from "../../atoms/Error/Error";
import { ModalWindowTag } from "../ModalWindowTag/ModalWindowTag";
import { INote } from "../../../types/types";

export const Main = () => {
  const { tags, deleteTag, addNewTag } = useTagsContext();
  const { notes, deleteTagFromAllNotes } = useNotesContext();
  const [isOpenModalTag, toggleIsOpenModalTag] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [renderedNotes, toggleRenderedNotes] = useState<INote[] | []>(notes);

  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
  };

  const deleteTagFromData = (tagId: string) => {
    deleteTag(tagId);
    deleteTagFromAllNotes(tagId);
  };

  const handlelTag = () => {
    if (value) {
      addNewTag({ id: uuidv4(), tagName: value });
      toggleIsOpenModalTag(false);
      setValue("");
    } else {
      setError(true);
    }
  };

  const closeModal = () => {
    toggleIsOpenModalTag(false);
    setValue("");
  };

  const filterNotes = (id: string) => {
    toggleRenderedNotes(
      notes.filter((el) => {
        const idTags = el.noteTags.map((elem) => {
          return elem.id;
        });

        return idTags.includes(id);
      }),
    );
  };

  useEffect(() => {
    localStorage.setItem("tags", JSON.stringify(tags));
  }, [tags]);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));

    if (renderedNotes.length !== notes.length) {
      toggleRenderedNotes(notes);
    }
  }, [notes]);

  return (
    <main className={styles.mainWrapper}>
      {isOpenModalTag && <ModalWindowTag closeModal={closeModal} value={value} onChange={onChange} addItem={handlelTag} />}

      {error && (
        <Error
          toggleIsOpenError={() => {
            setError(false);
          }}
          title="Enter title!"
        />
      )}

      <section className={styles.tagsWrapper}>
        {tags.map((tag) => {
          return (
            <Tag
              key={tag.id}
              tagName={tag.tagName}
              filterNotes={() => {
                filterNotes(tag.id);
              }}
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

      {renderedNotes.length > 0 ? (
        <section className={styles.notesWrapper}>
          {renderedNotes.map((note, index) => {
            return <Note key={note.id} noteElement={note} index={index} />;
          })}
        </section>
      ) : (
        <p className={styles.message}>No notes</p>
      )}
    </main>
  );
};
