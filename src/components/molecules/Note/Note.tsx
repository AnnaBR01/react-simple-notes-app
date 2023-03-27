import { motion } from "framer-motion";
import { useState } from "react";
import { useNotesContext } from "../../../context/NotesContext/hooks";
import { INote } from "../../../types/types";
import { Tag } from "../../atoms/Tag/Tag";
import styles from "./Note.module.scss";

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
  const { deleteTagFromNote, deleteNote } = useNotesContext();
  const { noteName, noteDescription, noteTags, id } = noteElement;
  const [isOpen, toggleIsOpen] = useState(false);

  const deleteTag = (tagId: string) => {
    deleteTagFromNote(id, tagId);
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
              <div>Edit</div>
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
    </motion.div>
  );
};
