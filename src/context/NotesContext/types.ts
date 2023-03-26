import { ReactNode } from "react";
import { INote } from "../../types/types";

export interface INotesContext {
  notes: INote[] | [];
  deleteTagFromNote: (idNote: string, idTag: string) => void;
  deleteTagFromAllNotes: (idTag: string) => void;
}

export interface INotesProviderProps {
  children: ReactNode;
}
