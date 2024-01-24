"use client";

import Image from "next/image";
import {
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";

import styles from "./index.module.scss";
import Context from "../_context";
import { useRouter, useSearchParams } from "next/navigation";
import setError from "../_context/actions/setError";
import { App, Navigator } from "../_components/dashboard";

export default function Dashboard() {
  const router = useRouter();
  const {
    dispatch,
    state: { user },
  } = useContext(Context);
  const [loaded, setLoaded] = useState<boolean>(true);
  const [token, setToken] = useState<string>("");
  const searchParams = useSearchParams();
  const link = useMemo(
    () =>
      searchParams && searchParams.get("contact")
        ? `?contact=${searchParams.get("contact")}`
        : "",
    [searchParams]
  );

  useLayoutEffect(() => {
    const token = localStorage.getItem("mapharma");
    if (token) {
      setToken(token);
    } else {
      setError({ message: "Veuillez vous réauthentifier." }, dispatch);
      localStorage.removeItem("mapharma");
      router.push(`/${link}`);
    }
  }, []);

  useEffect(() => {
    if (!Object.values(user).length) {
      router.push(`/${link}`);
      localStorage.removeItem("mapharma");
      setError({ message: "Veuillez vous réauthentifier." }, dispatch);
    }
  }, []);

  return (
    <main style={{ opacity: loaded ? 1 : 0 }} className={styles.main}>
      <Navigator />
      <App />
      {/* <div className={styles.overlay}></div> */}
    </main>
  );
}
