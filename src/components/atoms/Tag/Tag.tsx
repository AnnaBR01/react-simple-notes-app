import classNames from "classnames";

import styles from "./Tag.module.scss";
import { ITag } from "../../../types/types";

interface IProps {
  tagElement: ITag;
  active?: boolean;
  onClick?: () => void;
}

export const Tag = ({ tagElement, active = false, onClick }: IProps) => {
  return (
    <button
      className={classNames(styles.tag, { [styles.activeTag]: active })}
      disabled={active}
      type="button"
    >
      {tagElement.tagName}
      <span
        className={classNames(styles.close, { [styles.activeClose]: active })}
        onClick={onClick}
      >
        ✖
      </span>
    </button>
  );
};
