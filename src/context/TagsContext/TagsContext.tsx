import { createContext, FC, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ITag } from "../../types/types";

import { ITagsContext, ITagsProviderProps } from "./types";

export const TagsContext = createContext<ITagsContext>({} as ITagsContext);

const initialTags = [
  { id: uuidv4(), tagName: "Work" },
  { id: uuidv4(), tagName: "Shop" },
  { id: uuidv4(), tagName: "Party-Party" },
  { id: uuidv4(), tagName: "Shop-Shop" },
  { id: uuidv4(), tagName: "Party" },
];

const checkTagsInLocalStorage = () => {
  const localStorageJson = localStorage.getItem("tags");
  return localStorageJson ? JSON.parse(localStorageJson) : initialTags;
};

const UseContextTags = () => {
  const [tagsContext, setTagsContext] = useState<ITagsContext>({
    tags: checkTagsInLocalStorage(),
    addNewTag: (newTag: ITag) =>
      setTagsContext((ctx) => ({
        ...ctx,
        tags: [...ctx.tags, newTag],
      })),

    deleteTag: (id: string) => {
      setTagsContext((ctx) => ({
        ...ctx,
        tags: ctx.tags.filter((currentTag) => id !== currentTag.id),
      }));
    },

    addNewTagsByNote: (newTags: ITag[]) => {
      setTagsContext((ctx) => ({
        ...ctx,
        tags: [...ctx.tags, ...newTags],
      }));
    },
  });

  return tagsContext;
};

export const TagsContextProvider: FC<ITagsProviderProps> = ({ children }) => {
  return <TagsContext.Provider value={UseContextTags()}>{children}</TagsContext.Provider>;
};
