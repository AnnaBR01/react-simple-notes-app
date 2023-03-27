import { ChangeEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";

import styles from "./Note.module.scss";
import { INote, ITag } from "../../../types/types";
import { useTagsContext } from "../../../context/TagsContext/hooks";
import { useNotesContext } from "../../../context/NotesContext/hooks";
import { useDebounce } from "../../../hooks/useDebounce";
import { checkTags } from "../../../utils/checkTags";
import { checkTagsInTagsContent } from "../../../utils/checkTagsInTagsContent";

import { Tag } from "../../atoms/Tag/Tag";
import { ModalWindowChangingNote } from "../ModalWindowChangingNote/ModalWindowChangingNote";
import { Error } from "../../atoms/Error/Error";

const notesVariants = {
  visible: (index: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: index * 0.1 },
  }),
  hidden: { opacity: 0, scale: 1.2 },
};

interface IProps {
  noteElement: INote;
  index: number;
}

export const Note = ({ noteElement, index }: IProps) => {
  const { deleteTagFromNote, deleteNote, changeNote } = useNotesContext();
  const { addNewTagsByNote, tags } = useTagsContext();
  const { noteName, noteDescription, noteTags, id } = noteElement;
  const [error, setError] = useState(false);
  const [isOpen, toggleIsOpen] = useState(false);
  const [isOpenModal, toggleIsOpenModal] = useState(false);
  const [titleValue, setTitleValue] = useState(noteName);
  const [areaValue, setAreaValue] = useState(noteDescription);
  const [newTags, setNewTags] = useState<[] | ITag[]>(noteTags);
  const debounceValue = useDebounce(areaValue);

  const deleteTag = (tagId: string) => {
    deleteTagFromNote(id, tagId);
  };

  const closeModal = () => {
    toggleIsOpenModal(false);
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>): void => {
    setTitleValue(event.target.value);
  };

  const onChangeArea = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setAreaValue(event.target.value);
  };

  useEffect(() => {
    const changedTags = checkTags(debounceValue, tags);
    setNewTags(changedTags);
  }, [debounceValue, tags]);

  const handlelNote = () => {
    if (titleValue) {
      changeNote({ id, noteName: titleValue, noteDescription: debounceValue, noteTags: newTags });
      if (newTags.length > 0) {
        addNewTagsByNote(checkTagsInTagsContent(tags, newTags));
      }

      toggleIsOpenModal(false);
    } else {
      setError(true);
    }
  };

  return (
    <motion.div className={styles.container} variants={notesVariants} initial="hidden" animate="visible">
      <div className={styles.noteHeader}>
        <h2 className={styles.title}>{noteName}</h2>
        <button
          type="button"
          className={styles.info}
          onClick={() => {
            toggleIsOpen(!isOpen);
          }}
        >
          ...
          {isOpen && (
            <div className={styles.infoContainer}>
              <div
                onClick={() => {
                  toggleIsOpenModal(true);
                }}
              >
                Edit...
              </div>
              <div
                onClick={() => {
                  deleteNote(id);
                }}
              >
                Delete
              </div>
            </div>
          )}
        </button>
      </div>
      <p className={styles.description}>{noteDescription}</p>

      <div className={styles.tagsWrapper}>
        {noteTags.map((tag) => {
          return (
            <Tag
              key={tag.id}
              tagName={tag.tagName}
              active={true}
              onClick={() => {
                deleteTag(tag.id);
              }}
            />
          );
        })}
      </div>

      {isOpenModal && (
        <ModalWindowChangingNote
          closeModal={closeModal}
          valueTitle={titleValue}
          onChangeTitle={onChangeTitle}
          saveItem={handlelNote}
          valueArea={areaValue}
          onChangeArea={onChangeArea}
          newTags={newTags}
        />
      )}

      {error && (
        <Error
          toggleIsOpenError={() => {
            setError(false);
          }}
          title="Enter title!"
        />
      )}
    </motion.div>
  );
};
