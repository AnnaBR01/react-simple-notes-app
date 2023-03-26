import React, { createContext, FC, useState } from "react";
import { deleteTagFromAllNotes } from "../../utils/deleteTagFromAllNotes";
import { deleteTagFromNote } from "../../utils/deleteTagFromNote";

import { INotesContext, INotesProviderProps } from "./types";

export const NotesContext = createContext<INotesContext>({} as INotesContext);

const initialNotes = [
  {
    id: 1,
    noteName: "Work",
    noteDescription: "bbbbbbb bbbbbbb bghgchgvhgv vvhgvgvhg hghgbbbbbbb bghgchgvhgv vvhgvhg hghg",
    noteTags: [
      { id: 1, tagName: "Work" },
      { id: 2, tagName: "Shop" },
    ],
  },
  {
    id: 2,
    noteName: "Sleep",
    noteDescription:
      "bbbbbbb bghgchgvhgv vvhgvhg hghg bbbbbbb ghgbbbbbbb bghgchgvhgv vvhgvhg hghgbbbbbbb",
    noteTags: [
      { id: 5, tagName: "Shop-Shop" },
      { id: 6, tagName: "Party" },
      { id: 1, tagName: "Work" },
      { id: 2, tagName: "Shop" },
    ],
  },
  {
    id: 3,
    noteName: "Dance",
    noteDescription: "bbbbbbb bghgchgvhgv vvhgvhg hghg",
    noteTags: [{ id: 5, tagName: "Shop-Shop" }],
  },
];

const checkNotesInLocalStorage = () => {
  const localStorageJson = localStorage.getItem("notes");
  return localStorageJson ? JSON.parse(localStorageJson) : initialNotes;
};

const UseContextNotes = () => {
  const [notesContext, setNotesContext] = useState<INotesContext>({
    notes: checkNotesInLocalStorage(),
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
  });

  return notesContext;
};

export const NotesContextProvider: FC<INotesProviderProps> = ({ children }) => {
  return <NotesContext.Provider value={UseContextNotes()}>{children}</NotesContext.Provider>;
};
