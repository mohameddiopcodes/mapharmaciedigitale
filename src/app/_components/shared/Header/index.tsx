import Image from "next/image";
import styles from "./index.module.scss";

export default function Header({ error }: { error?: string }) {
  return (
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
  );
}
