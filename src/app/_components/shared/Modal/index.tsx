import Image from "next/image";
import styles from "./index.module.scss";
import { useContext } from "react";
import Context from "@/app/_context";
import setModal from "@/app/_context/actions/setModal";

export default function Modal({ children }: { children: JSX.Element }) {
  const {
    dispatch,
    state: { modal },
  } = useContext(Context);
  function exit() {
    setModal(false, dispatch);
  }
  return (
    <div style={{ display: modal ? "block" : "none" }} className={styles.modal}>
      <div className={styles.content}>
        {children}
        <span onClick={exit} className={styles.overlay}>
          <button className={styles.exit} onClick={exit}>
            x
          </button>
        </span>
      </div>
    </div>
  );
}
