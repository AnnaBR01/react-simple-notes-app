/* eslint-disable prefer-const */
import { v4 as uuidv4 } from "uuid";

import { ITag } from "../types/types";

export const checkTags = (str: string, tags: ITag[]) => {
  let newArr: ITag[] = [];
  const newArrNames = newArr.map((el) => {
    return el.tagName;
  });

  const setId = (name: string) => {
    let result = "";

    for (let el of tags) {
      if (el.tagName === name) {
        result = el.id;
        break;
      } else {
        result = uuidv4();
      }
    }

    return result;
  };

  Array.from(new Set(str.split(" "))).forEach((word) => {
    if (word[0] === "#") {
      const newTag = word.substring(1);
      if (!!newTag && !newArrNames.includes(newTag)) {
        newArr.push({
          id: setId(newTag),
          tagName: newTag,
        });
      }
    }
  });

  return newArr;
};
