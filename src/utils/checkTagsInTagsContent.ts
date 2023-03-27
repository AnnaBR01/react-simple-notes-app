/* eslint-disable array-callback-return */
/* eslint-disable prefer-const */

import { ITag } from "../types/types";

export const checkTagsInTagsContent = (array: ITag[], newArray: ITag[]) => {
  const tags = array.map((tag) => {
    return tag.tagName;
  });

  return newArray.filter((tag) => {
    return !tags.includes(tag.tagName);
  });
};
