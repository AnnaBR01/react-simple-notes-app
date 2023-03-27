import { useContext } from "react";

import { NotesContext } from "..";
import { INotesContext } from "./types";

export const useNotesContext = () => useContext<INotesContext>(NotesContext);
