"use client";

import Image from "next/image";
import styles from "./page.module.scss";
import { useState } from "react";

export default function Home() {
  const [option, setOption] = useState<number | null>(null);
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
      </header>
      <main className={styles.main}>
        <div className={styles.hero}>
          <div onClick={() => setOption(null)} className={styles.overlay}></div>
          <div className={styles.content}>
            <div
              style={option === 0 ? { outline: "#FEFEFE 2px solid" } : {}}
              onClick={() => setOption(0)}
              className={styles.owner}
            >
              {option == 0 ? <h1>Vous êtes propriétaire?</h1> : <></>}
              {option == 0 ? (
                <form autoComplete="none" autoFocus>
                  <input type="text" placeholder="773333333" />
                  <button>Suivant</button>
                </form>
              ) : (
                <></>
              )}
              <div
                onClick={() => setOption(null)}
                style={{ borderRadius: "15px" }}
                className={option === 0 ? styles.overlay : styles.lightOverlay}
              ></div>
            </div>
            <div className={styles.container}>
              <div
                style={option === 1 ? { outline: "#FEFEFE 2px solid" } : {}}
                onClick={() => setOption(1)}
                className={styles.staff}
              >
                {option === 1 ? <h1>Vous êtes caissier?</h1> : <></>}
                {option == 1 ? (
                  <form autoComplete="none" autoFocus>
                    <input type="text" placeholder="773333333" />
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
              >
                {option === 2 ? <h1>Vous êtes gestionnaire?</h1> : <></>}
                {option == 2 ? (
                  <form autoComplete="none" autoFocus>
                    <input type="text" placeholder="773333333" />
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
    </>
  );
}
