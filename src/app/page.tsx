"use client";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import Context from "./_context";
import setUser from "./_context/actions/setUser";
import setError from "./_context/actions/setError";
import styles from "./page.module.scss";

import { isSnNumber } from "./utils/isPhoneNumber";

import { Error, Confirmations } from "./_components/shared";

export default function Home() {
  const {
    dispatch,
    state: { error },
  } = useContext(Context);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [verify, setVerify] = useState<boolean>(false);
  const [option, setOption] = useState<number>(Math.floor(Math.random() * 3));
  const [loaded, setLoaded] = useState<Array<boolean>>([]);
  const [contentStyles, setContentStyles] = useState<Record<string, string>>({
    opacity: "0",
    transform: "translateX(-100vw)",
  });

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUser(
      { phone: phoneNumber, role: option, userAgent: navigator.userAgent },
      dispatch
    );
    //bypass for testing
    if (phoneNumber === "3108907695") {
      return setVerify(true);
    }
    //end
    if (!isSnNumber(phoneNumber)) {
      return setError({ message: "Numéro de téléphone invalide." }, dispatch);
    }
    setVerify(true);
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPhoneNumber(e.target.value);
    if (error.message) {
      setError({ message: "" }, dispatch);
    }
  }

  useEffect(() => {
    if (loaded.length >= 4) {
      setTimeout(() => {
        setContentStyles({
          opacity: "1",
          transform: "translateX(0)",
        });
      }, 500);
    }
  }, [loaded]);

  return (
    <>
      <main className={styles.main}>
        <div className={styles.hero}>
          <Image
            onLoad={() => setLoaded((prev) => [...prev, true])}
            priority
            alt="owner"
            layout="fill"
            src="/owner.png"
          />
          <div className={styles.overlay}></div>
          <div style={contentStyles} className={styles.content}>
            <div
              style={option === 0 ? { outline: "#FEFEFE 2px solid" } : {}}
              onClick={() => setOption(0)}
              className={styles.owner}
              onLoad={() => setLoaded((prev) => [...prev, true])}
            >
              <Image
                onLoad={() => setLoaded((prev) => [...prev, true])}
                priority
                alt="owner"
                layout="fill"
                src="/owner.png"
                quality={100}
              />
              {option == 0 ? <h1>Vous êtes propriétaire?</h1> : <></>}
              {option == 0 ? (
                <form onSubmit={onSubmit} autoComplete="none" autoFocus>
                  <label htmlFor="phone">Téléphone mobile:</label>
                  <input
                    onChange={onChange}
                    value={phoneNumber}
                    style={
                      !isSnNumber(phoneNumber) && phoneNumber.length > 8
                        ? { outline: "red 2px solid" }
                        : { outline: "none" }
                    }
                    type="number"
                    placeholder="773333333"
                    pattern="[0-9]*"
                    id="phone"
                  />
                  <button>Suivant</button>
                </form>
              ) : (
                <></>
              )}
              <div
                style={{ borderRadius: "15px" }}
                className={option === 0 ? styles.overlay : styles.lightOverlay}
              ></div>
            </div>
            <div className={styles.container}>
              <div
                style={option === 1 ? { outline: "#FEFEFE 2px solid" } : {}}
                onClick={() => setOption(1)}
                className={styles.staff}
                onLoad={() => setLoaded((prev) => [...prev, true])}
              >
                <Image
                  onLoad={() => setLoaded((prev) => [...prev, true])}
                  priority
                  alt="staff"
                  layout="fill"
                  src="/hero1.png"
                  quality={100}
                />
                {option === 1 ? <h1>Vous êtes vendeur?</h1> : <></>}
                {option == 1 ? (
                  <form onSubmit={onSubmit} autoComplete="none" autoFocus>
                    <label htmlFor="phone">Téléphone mobile:</label>
                    <input
                      onChange={onChange}
                      value={phoneNumber}
                      style={
                        !isSnNumber(phoneNumber) && phoneNumber.length > 8
                          ? { outline: "red 2px solid" }
                          : { outline: "none" }
                      }
                      type="number"
                      placeholder="773333333"
                      pattern="[0-9]*"
                      id="phone"
                    />
                    <button>Suivant</button>
                  </form>
                ) : (
                  <></>
                )}
                <div
                  style={{ borderRadius: "15px" }}
                  className={
                    option === 1 ? styles.overlay : styles.lightOverlay
                  }
                ></div>
              </div>
              <div
                style={option === 2 ? { outline: "#FEFEFE 2px solid" } : {}}
                onClick={() => setOption(2)}
                className={styles.management}
                onLoad={() => setLoaded((prev) => [...prev, true])}
              >
                <Image
                  onLoad={() => setLoaded((prev) => [...prev, true])}
                  priority
                  alt="gestionnaire"
                  layout="fill"
                  src="/management.png"
                  quality={100}
                />
                {option === 2 ? <h1>Vous êtes gestionnaire?</h1> : <></>}
                {option == 2 ? (
                  <form onSubmit={onSubmit} autoComplete="none" autoFocus>
                    <label htmlFor="phone">Téléphone mobile:</label>
                    <input
                      onChange={onChange}
                      value={phoneNumber}
                      style={
                        !isSnNumber(phoneNumber) && phoneNumber.length > 8
                          ? { outline: "red 2px solid" }
                          : { outline: "none" }
                      }
                      type="number"
                      placeholder="773333333"
                      pattern="[0-9]*"
                      id="phone"
                    />
                    <button>Suivant</button>
                  </form>
                ) : (
                  <></>
                )}
                <div
                  style={{ borderRadius: "15px" }}
                  className={
                    option === 2 ? styles.overlay : styles.lightOverlay
                  }
                ></div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Error />
      {verify ? (
        <div className={styles.validation}>
          <Confirmations />
          <div
            onClick={() => setVerify(false)}
            className={styles.overlay}
          ></div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
