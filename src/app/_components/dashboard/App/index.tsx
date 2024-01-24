import Context from "@/app/_context";
import { useContext, useState } from "react";
import styles from "./index.module.scss";
import { Modal } from "../../shared";
import ModalRouter from "./ModalRouter";

export default function App() {
  const [modal, setModal] = useState(0);
  const {
    state: {
      dashboard: { tab },
    },
  } = useContext(Context);
  return (
    <div className={styles.app}>
      <p>App {tab}</p>
      <Modal>
        <ModalRouter modal={modal} />
      </Modal>
    </div>
  );
}
