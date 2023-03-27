import { FC, ReactNode } from "react";
import { NotesContextProvider, TagsContextProvider } from "..";

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
