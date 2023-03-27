import { FC, ReactNode } from "react";
import { NotesContextProvider } from "../NotesContext/NotesContext";
import { TagsContextProvider } from "../TagsContext/TagsContext";

const providers = [TagsContextProvider, NotesContextProvider];
export const AppContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      {providers.reduceRight((acc, Provider) => {
        return <Provider>{acc}</Provider>;
      }, children)}
    </>
  );
};
