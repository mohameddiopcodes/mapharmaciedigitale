import { useContext, useState } from "react";
import ConfirmationInput from "./ConfirmationInput";
import styles from "./index.module.scss";
import Image from "next/image";
import { sendPhone, verifyPhone } from "@/app/utils/verification";
import Context from "@/app/_context";
import fetchUser from "@/app/utils/fetchUser";
import setError from "@/app/_context/actions/setError";

export default function Confirmations() {
  const {
    dispatch,
    state: { user, error },
  } = useContext(Context);
  const { phone } = user;
  const [opacity, setOpacity] = useState<string>("0");
  const [disabled, setDisabled] = useState<boolean>(false);
  const [consent, setConsent] = useState<boolean>(false);
  async function send() {
    try {
      const response = await sendPhone(
        phone === "3108907695" ? `+1${phone}` : `+221${phone}`
      );
      if (response.status === 200) {
        setOpacity("0");
        setConsent(true);
        setTimeout(() => {
          setOpacity("1");
        }, 2000);
      }
    } catch (e: any) {
      alert(e.message);
    }
  }
  async function validate(code: string) {
    try {
      if (error.message && dispatch) {
        setError({ message: "" }, dispatch);
      }
      //verify code
      const response = await verifyPhone(
        ["", code],
        phone === "3108907695" ? `+1${phone}` : `+221${phone}`
      );
      const { phoneValid } = response.data;
      if (!phoneValid) {
        throw new Error("invalid phone code");
      }
      const response2 = await fetchUser(user);
      console.log(response2.data, response2.status);
    } catch (e) {
      setError({ message: "Code invalide." }, dispatch);
      setDisabled(false);
    }
  }

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
          <button onClick={send}>Envoyer</button>
        </div>
      ) : (
        <></>
      )}
      {consent ? (
        <div style={{ opacity }} className={styles.confirmations}>
          <p>Vérification SMS</p>
          <ConfirmationInput
            send={send}
            validate={validate}
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
