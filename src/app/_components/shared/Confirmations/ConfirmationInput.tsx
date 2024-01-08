import styles from "./index.module.scss";
import Image, { StaticImageData } from "next/image";
import { Dispatch, SetStateAction, useContext, useState } from "react";
// import { verificationCheck } from "@/utils/sendConfirmations";
import isEmail from "validator/lib/isEmail";

const NOW = Date.now();
const ONE_MINUTE = 60_000;

export default function ConfirmationInput({
  recipient,
  setEmailCode,
  setPhoneCode,
  disabled,
  setDisabled,
}: {
  recipient: string;
  disabled: boolean;
  setDisabled: Dispatch<SetStateAction<boolean>>;
  setEmailCode?: Dispatch<SetStateAction<string>>;
  setPhoneCode?: Dispatch<SetStateAction<string>>;
}) {
  const [to, setTo] = useState(recipient);
  const [resent, setResent] = useState(0);
  const [digits, setDigits] = useState<Record<string, string>>({
    "0": "",
    "1": "",
    "2": "",
    "3": "",
    "4": "",
    "5": "",
  });

  function validate() {
    const code = Object.values(digits)
      .map((d) => d.toString())
      .join("");
    if (setEmailCode) {
      setEmailCode(code);
      setDisabled(true);
    }
    if (setPhoneCode) {
      setPhoneCode(code);
      setDisabled(true);
    }
  }

  return (
    <div className={styles.inputContainer}>
      <input
        onChange={(e) => {
          e.target.style.textDecoration = "underline";
          setTo(e.target.value);
        }}
        className={styles.recipient}
        value={to}
        type="text"
      />
      <label>
        <div className={styles.digits}>
          {Object.values(digits).map((digit, i) => (
            <input
              placeholder="0"
              value={digit}
              onChange={(e: any) => {
                if (
                  !isNaN(parseInt(e.target.value.split("").pop() as string))
                ) {
                  setDigits((prev) => ({
                    ...prev,
                    [i]: e.target.value.split("").pop() as string,
                  }));
                  e.target.nextElementSibling &&
                    e.target.nextElementSibling.focus();
                }
              }}
              onKeyDown={(e: any) => {
                if (e.key === "Backspace") {
                  if (digit === "") {
                    e.target.parentNode.children[Math.max(0, i - 1)].focus();
                  } else {
                    setDigits((prev) => ({ ...prev, [i]: "" }));
                    e.target.parentNode.children[Math.max(0, i - 1)].focus();
                  }
                }
              }}
              key={i}
              type="text"
              disabled={disabled}
            />
          ))}
        </div>
      </label>
      <div>
        {!disabled ? (
          <button
            // onClick={() => {
            //   if (resent < NOW) {
            //     fetch("/api/otp", {
            //       method: "POST",
            //       body: JSON.stringify({
            //         email: setEmailCode ? to : undefined,
            //         phone: setPhoneCode ? to : undefined,
            //         send: [!!setEmailCode, !!setPhoneCode],
            //       }),
            //     });
            //     setResent(NOW + ONE_MINUTE);
            //     setTimeout(() => {
            //       setResent(0);
            //     }, ONE_MINUTE);
            //   }
            // }}
            disabled={resent > NOW}
            className={styles.resend}
          >
            Réenvoyer ?
          </button>
        ) : (
          <button className={styles.resend}></button>
        )}
      </div>
      <button onClick={validate} disabled={disabled}>
        Valider
      </button>
    </div>
  );
}
