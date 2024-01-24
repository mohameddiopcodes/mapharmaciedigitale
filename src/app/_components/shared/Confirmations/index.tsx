import { useContext, useState } from "react";
import ConfirmationInput from "./ConfirmationInput";
import styles from "./index.module.scss";
import Image from "next/image";
import { sendPhone, verifyPhone } from "@/app/utils/verification";
import Context from "@/app/_context";
import fetchUser from "@/app/utils/fetchUser";
import setError from "@/app/_context/actions/setError";
import validator from "validator";
import { useRouter } from "next/navigation";

export default function Confirmations() {
  const router = useRouter();
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
      setError({ message: "Veuillez réessayer plus tard." }, dispatch);
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
        throw { message: "Code invalide." };
      }
      const response2 = await fetchUser(user);
      if (![200, 201].includes(response2.data.status)) {
        setError({ message: response2.data.message }, dispatch);
      }
      console.log(response2, response2.data);
      console.log("DEBUG: ", response2.data.data.token);
      if (!validator.isJWT(response2.data.data.token)) {
        throw { message: "Connexion échouée." };
      }
      localStorage.setItem("mapharma", response2.data.data.token);
      router.push(
        "/dashboard?contact=" +
          user.name +
          "%2F" +
          user.phone +
          "%2F" +
          user.role
      );
    } catch (e: any) {
      console.log(e);
      setError({ message: e.message }, dispatch);
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
