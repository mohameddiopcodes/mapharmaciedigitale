import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ConfirmationInput from "./ConfirmationInput";
import styles from "./index.module.scss";
import Image from "next/image";

export default function Confirmations({
  recipient,
  disabled,
  setPhoneCode,
  setDisabled,
}: {
  recipient: string;
  disabled: boolean;
  setDisabled: Dispatch<SetStateAction<boolean>>;
  setPhoneCode: Dispatch<SetStateAction<string>>;
}) {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [consent, setConsent] = useState<boolean>(false);

  return (
    <>
      {!consent ? (
        <div
          style={{ opacity: loaded ? 1 : 0 }}
          className={styles.confirmations}
        >
          <p>
            Vérification/<span>SMS</span>:
          </p>
          <Image
            alt="sms verification icon"
            width={200}
            height={200}
            src="/verification.png"
            onLoad={() => setLoaded(true)}
          />
          <button onClick={() => setConsent(true)} style={{ fontSize: "1em" }}>
            Suivant
          </button>
        </div>
      ) : (
        <></>
      )}
      {consent ? (
        <div className={styles.confirmations}>
          <p>Vérification SMS</p>
          <ConfirmationInput
            recipient={recipient}
            setPhoneCode={setPhoneCode}
            disabled={disabled}
            setDisabled={setDisabled}
          />
          <span className={styles.noexit}></span>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
