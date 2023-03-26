import { ReactNode } from "react";
import { ITag } from "../../types/types";

export interface ITagsContext {
  tags: ITag[] | [];
  addNewTag: (tagName: string) => void;
  deleteTag: (id: string) => void;
}

export interface ITagsProviderProps {
  children: ReactNode;
}
