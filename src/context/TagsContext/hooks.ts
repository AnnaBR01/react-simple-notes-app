import { useContext } from "react";

import { TagsContext } from "..";
import { ITagsContext } from "./types";

export const useTagsContext = () => useContext<ITagsContext>(TagsContext);
