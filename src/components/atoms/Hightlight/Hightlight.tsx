import { v4 as uuidv4 } from "uuid";

import styles from "./Hightlight.module.scss";

interface IProps {
  tagsNameArr: [] | string[];
  text: string;
}

export const Hightlight = ({ tagsNameArr, text }: IProps) => {
  if (tagsNameArr.length === 0) return <span>{text}</span>;

  const regexps = tagsNameArr.map((elem) => `#${elem}*`).join("|");
  const regex = new RegExp(regexps);
  const parts = text.split(" ");

  return (
    <span>
      {parts
        .filter((part) => part)
        .map((part) =>
          regex.test(part) ? (
            <span key={uuidv4()} className={styles.hightlight}>
              {`${part} `}
            </span>
          ) : (
            <span key={uuidv4()}> {`${part} `}</span>
          ),
        )}
    </span>
  );
};
