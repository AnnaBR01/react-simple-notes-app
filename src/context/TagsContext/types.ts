import { ReactNode } from "react";
import { ITag } from "../../types/types";

export interface ITagsContext {
  tags: ITag[] | [];
  addNewTag: (newTag: ITag) => void;
  deleteTag: (id: string) => void;
  addNewTagsByNote: (newTags: ITag[]) => void;
}

export interface ITagsProviderProps {
  children: ReactNode;
}
