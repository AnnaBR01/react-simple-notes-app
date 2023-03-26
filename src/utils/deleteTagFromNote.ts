import { INote } from "../types/types";

export const deleteTagFromNote = (notes: INote[], idNote: string, idTag: string) => {
  return notes.map((note) => {
    if (note.id === idNote) {
      note.noteTags = note.noteTags.filter((tag) => {
        return tag.id !== idTag;
      });
    }
    return note;
  });
};
