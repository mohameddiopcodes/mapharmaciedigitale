import Context from "@/app/_context";
import styles from "./index.module.scss";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import setError from "@/app/_context/actions/setError";
import { error } from "console";

const NOW = Date.now();
const ONE_MINUTE = 60_000;
const INITIAL_DIGITS = {
  "0": "",
  "1": "",
  "2": "",
  "3": "",
  "4": "",
  "5": "",
};

export default function ConfirmationInput({
  send,
  validate,
  disabled,
  setDisabled,
}: {
  send: (recipient: string) => Promise<void>;
  validate: (code: string) => Promise<void>;
  disabled: boolean;
  setDisabled: Dispatch<SetStateAction<boolean>>;
}) {
  const {
    dispatch,
    state: {
      error,
      user: { phone },
    },
  } = useContext(Context);
  const [to, setTo] = useState(phone as string);
  const [resent, setResent] = useState(0);
  const [digits, setDigits] = useState<Record<string, string>>(INITIAL_DIGITS);
  const [attempt, setAttempt] = useState(1);

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
              autoFocus={i === Object.values(digits).length - 1}
              placeholder="0"
              value={digit}
              onChange={(e: any) => {
                if (error.message && dispatch) {
                  setError({ message: "" }, dispatch);
                }
                if (
                  !isNaN(parseInt(e.target.value.split("").pop() as string))
                ) {
                  const code =
                    Object.values(digits)
                      .map((d) => d.toString())
                      .join("") + e.target.value;
                  if (code.length === 6) {
                    setDisabled(true);
                    validate(code);
                  }
                  setDigits((prev) => {
                    for (let j = 0; j < i; j++) {
                      if (prev[j] === "") {
                        return {
                          ...prev,
                          [j]: e.target.value.split("").pop() as string,
                        };
                      }
                    }
                    return {
                      ...prev,
                      [i]: e.target.value.split("").pop() as string,
                    };
                  });
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
              type="number"
              disabled={disabled}
              pattern="[0-9]*"
              autoComplete="one-time-code"
              required
            />
          ))}
        </div>
      </label>
      <div>
        {!disabled ? (
          <button
            onClick={() => {
              if (resent < NOW && attempt < 5) {
                setDigits(INITIAL_DIGITS);
                setAttempt((prev) => {
                  const total = prev + 1;
                  if (total > 4 && dispatch) {
                    setError(
                      { message: "Veuillez patienter 10 minutes." },
                      dispatch
                    );
                    setTimeout(() => {
                      setError({ message: "" }, dispatch);
                    }, ONE_MINUTE / 2);
                    setTimeout(() => {
                      setAttempt(0);
                    }, 10 * ONE_MINUTE);
                  } else if (total < 5) {
                    send(to);
                    setResent(NOW + ONE_MINUTE);
                    setTimeout(() => {
                      setResent(0);
                    }, ONE_MINUTE);
                  }
                  return total;
                });
              }
            }}
            disabled={resent > NOW || attempt > 4}
            className={styles.resend}
          >
            Réenvoyer ?
          </button>
        ) : (
          <button className={styles.resend}></button>
        )}
      </div>
      <button
        onClick={() => {
          setDisabled(true);
          validate(Object.values(digits).join(""));
        }}
        disabled={disabled}
      >
        Valider
      </button>
    </div>
  );
}
