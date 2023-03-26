import { useContext } from "react";
import { TagsContext } from "./TagsContext";
import { ITagsContext } from "./types";

export const useTagsContext = () => useContext<ITagsContext>(TagsContext);
