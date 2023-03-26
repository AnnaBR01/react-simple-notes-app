import { useNotesContext } from "../../../context/NotesContext/hooks";
import { INote } from "../../../types/types";
import { Tag } from "../../atoms/Tag/Tag";
import styles from "./Note.module.scss";

interface IProps {
  noteElement: INote;
}

export const Note = ({ noteElement }: IProps) => {
  const { deleteTagFromNote } = useNotesContext();
  const { noteName, noteDescription, noteTags, id } = noteElement;

  const deleteTag = (tagId: string) => {
    deleteTagFromNote(id, tagId);
  };

  return (
    <div className={styles.container}>
      <div className={styles.noteHeader}>
        <h2 className={styles.title}>{noteName}</h2>
        <button type="button" className={styles.info}>
          ...
        </button>
      </div>
      <p className={styles.description}>{noteDescription}</p>

      <div className={styles.tagsWrapper}>
        {noteTags.map((tag) => {
          return (
            <Tag
              key={tag.id}
              tagElement={tag}
              active={true}
              onClick={() => {
                deleteTag(tag.id);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
