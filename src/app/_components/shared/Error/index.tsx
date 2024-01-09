import Context from "@/app/_context";
import { useContext } from "react";
import styles from "./index.module.scss";

export default function Error() {
  const {
    state: {
      error: { message },
    },
  } = useContext(Context);
  return message ? <span className={styles.error}>{message}</span> : <></>;
}
