import classNames from "classnames";

import styles from "./Tag.module.scss";

interface IProps {
  tagName: string;
  active?: boolean;
  modal?: boolean;
  onClick?: () => void;
  filterNotes?: () => void;
}

export const Tag = ({ tagName, active = false, onClick, modal = false, filterNotes }: IProps) => {
  return (
    <button
      className={classNames(styles.tag, { [styles.activeTag]: active, [styles.modal]: modal })}
      disabled={active}
      type="button"
      onClick={filterNotes}
    >
      {tagName}
      {!modal && (
        <span className={classNames(styles.close, { [styles.activeClose]: active })} onClick={onClick}>
          ✖
        </span>
      )}
    </button>
  );
};
