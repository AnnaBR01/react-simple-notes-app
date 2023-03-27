import React, { createContext, FC, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { INote, ITag } from "../../types/types";
import { deleteTagFromAllNotes } from "../../utils/deleteTagFromAllNotes";
import { deleteTagFromNote } from "../../utils/deleteTagFromNote";

import { INotesContext, INotesProviderProps } from "./types";

export const NotesContext = createContext<INotesContext>({} as INotesContext);

const checkNotesInLocalStorage = () => {
  const localStorageJson = localStorage.getItem("notes");
  return localStorageJson ? JSON.parse(localStorageJson) : [];
};

const UseContextNotes = () => {
  const [notesContext, setNotesContext] = useState<INotesContext>({
    notes: checkNotesInLocalStorage(),
    addNewNote: (noteName: string, noteDescription: string, newTags: [] | ITag[]) => {
      setNotesContext((ctx) => ({
        ...ctx,
        notes: [
          ...ctx.notes,
          {
            id: uuidv4(),
            noteName,
            noteDescription,
            noteTags: newTags,
          },
        ],
      }));
    },

    deleteTagFromNote: (idNote: string, idTag: string) => {
      setNotesContext((ctx) => ({
        ...ctx,
        notes: deleteTagFromNote(ctx.notes, idNote, idTag),
      }));
    },
    deleteTagFromAllNotes: (idTag: string) => {
      setNotesContext((ctx) => ({
        ...ctx,
        notes: deleteTagFromAllNotes(ctx.notes, idTag),
      }));
    },

    deleteNote: (id: string) => {
      setNotesContext((ctx) => ({
        ...ctx,
        notes: ctx.notes.filter((currentNote) => id !== currentNote.id),
      }));
    },

    changeNote: (note: INote) => {
      setNotesContext((ctx) => ({
        ...ctx,
        notes: ctx.notes.map((currentNote) => {
          console.log(note);
          return currentNote.id === note.id ? { ...note } : currentNote;
        }),
      }));
    },
  });

  return notesContext;
};

export const NotesContextProvider: FC<INotesProviderProps> = ({ children }) => {
  return <NotesContext.Provider value={UseContextNotes()}>{children}</NotesContext.Provider>;
};
