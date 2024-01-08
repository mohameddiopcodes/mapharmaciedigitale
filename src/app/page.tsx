"use client";

import Image from "next/image";
import styles from "./page.module.scss";
import { useEffect, useState } from "react";
import { isSnNumber } from "./utils/isPhoneNumber";
import Confirmations from "./_components/shared/Confirmations";

export default function Home() {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [expand, setExpand] = useState<boolean>(false);
  const [phoneCode, setPhoneCode] = useState<string>("");
  const [phoneDisabled, setPhoneDisabled] = useState<boolean>(false);
  const [option, setOption] = useState<number | null>(null);
  const [loaded, setLoaded] = useState<Array<boolean>>([]);
  const [error, setError] = useState<string>("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    //bypass for testing
    if (phoneNumber === "3108907695") {
      return setExpand(true);
    }
    //end
    if (!isSnNumber(phoneNumber)) {
      return setError("Numéro de téléphone invalide.");
    }
    setExpand(true);
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPhoneNumber(e.target.value);
    setError("");
  }

  return (
    <>
      <header className={styles.header}>
        <button>
          <div>
            <Image
              src="/logo1.png"
              alt="logo"
              priority
              quality={100}
              width={50}
              height={50}
            />
          </div>
        </button>
        <p>Bienvenue</p>
        <p className={error ? styles.error : ""}>{error}</p>
      </header>
      <main className={styles.main}>
        <div className={styles.hero}>
          <Image priority alt="owner" layout="fill" src="/owner.png" />
          <div onClick={() => setOption(null)} className={styles.overlay}></div>
          <div
            style={
              loaded.length >= 3
                ? { opacity: "1", transform: "translateX(0)" }
                : { opacity: "0", transform: "translateX(-100vw)" }
            }
            className={styles.content}
          >
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
              />
              {option == 0 ? <h1>Vous êtes propriétaire?</h1> : <></>}
              {option == 0 ? (
                <form onSubmit={onSubmit} autoComplete="none" autoFocus>
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
                />
                {option === 1 ? <h1>Vous êtes caissier?</h1> : <></>}
                {option == 1 ? (
                  <form onSubmit={onSubmit} autoComplete="none" autoFocus>
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
                />
                {option === 2 ? <h1>Vous êtes gestionnaire?</h1> : <></>}
                {option == 2 ? (
                  <form onSubmit={onSubmit} autoComplete="none" autoFocus>
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
      {expand ? (
        <div className={styles.validation}>
          <Confirmations
            recipient={phoneNumber}
            disabled={phoneDisabled}
            setPhoneCode={setPhoneCode}
            setDisabled={setPhoneDisabled}
          />
          <div
            onClick={() => setExpand(false)}
            className={styles.overlay}
          ></div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
