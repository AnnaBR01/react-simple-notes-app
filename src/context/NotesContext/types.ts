import { ReactNode } from "react";

import { INote, ITag } from "../../types/types";

export interface INotesContext {
  notes: INote[] | [];
  addNewNote: (noteName: string, noteDescription: string, newTags: [] | ITag[]) => void;
  deleteTagFromNote: (idNote: string, idTag: string) => void;
  deleteTagFromAllNotes: (idTag: string) => void;
  deleteNote: (id: string) => void;
  changeNote: (note: INote) => void;
}

export interface INotesProviderProps {
  children: ReactNode;
}
