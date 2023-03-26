import { useContext } from "react";
import { NotesContext } from "./NotesContext";
import { INotesContext } from "./types";

export const useNotesContext = () => useContext<INotesContext>(NotesContext);
