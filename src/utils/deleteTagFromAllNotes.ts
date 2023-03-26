import { INote } from "../types/types";

export const deleteTagFromAllNotes = (notes: INote[], idTag: string) => {
  return notes.map((note) => {
    note.noteTags = note.noteTags.filter((tag) => {
      return tag.id !== idTag;
    });

    return note;
  });
};
