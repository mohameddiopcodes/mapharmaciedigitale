import { Dispatch, SetStateAction, use, useEffect, useState } from "react";
import ConfirmationInput from "./ConfirmationInput";
import styles from "./index.module.scss";
import Image from "next/image";
import { sendPhone, verifyPhone } from "@/app/utils/verification";

export default function Confirmations({ recipient }: { recipient: string }) {
  const [opacity, setOpacity] = useState<string>("0");
  const [phoneCode, setPhoneCode] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(false);
  const [consent, setConsent] = useState<boolean>(false);

  async function send() {
    try {
      const response = await sendPhone(
        recipient === "3108907695" ? `+1${recipient}` : `+221${recipient}`
      );
      if (response.status === 200) {
        setOpacity("0");
        setConsent(true);
        setTimeout(() => {
          setOpacity("1");
        }, 500);
      }
    } catch (e: any) {
      alert(e.message);
    }
  }
  async function verify() {
    try {
      const response = await verifyPhone(
        ["", phoneCode],
        recipient === "3108907695" ? `+1${recipient}` : `+221${recipient}`
      );
      const { phoneValid } = await response.json();
      if (phoneValid) {
        alert("phone verified");
      }
    } catch (e: any) {
      alert(e.message);
    }
  }

  useEffect(() => {
    console.log(phoneCode);
    if (phoneCode.length === 6) {
      verify();
    }
  }, [phoneCode]);

  return (
    <>
      {!consent ? (
        <div style={{ opacity }} className={styles.confirmations}>
          <p>
            Vérification/<span>SMS</span>:
          </p>
          <Image
            alt="sms verification icon"
            width={200}
            height={200}
            src="/verification.png"
            onLoad={() => setOpacity("1")}
          />
          <button onClick={send}>Suivant</button>
        </div>
      ) : (
        <></>
      )}
      {consent ? (
        <div style={{ opacity }} className={styles.confirmations}>
          <p>Vérification SMS</p>
          <ConfirmationInput
            send={send}
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
