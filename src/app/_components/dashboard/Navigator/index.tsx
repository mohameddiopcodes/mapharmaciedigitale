import Image from "next/image";
import styles from "./index.module.scss";
import { useContext, useEffect, useState } from "react";
import Context from "@/app/_context";
import setDashboard from "@/app/_context/actions/setDashboard";
import setPharmacy from "@/app/_context/actions/setPharmacy";
import setModal from "@/app/_context/actions/setModal";
import { ROLE_NAMES } from "@/app/utils/allowedList";

//dashboard navigator
export default function Navigator() {
  const {
    dispatch,
    state: {
      dashboard: { tab },
      user,
      pharmacy,
    },
  } = useContext(Context);
  const [transform, setTransform] = useState<string>("translateX(-100vw)");
  const [pharmacyName, setPharmacyName] = useState<string>("");
  const [pharmacyNameOpacity, setPharmacyNameOpacity] = useState<string>("0");
  const [opacity, setOpacity] = useState<string>(".7");
  useEffect(() => {
    setTimeout(() => {
      setTransform("translateX(0)");
      setOpacity("1");
    }, 200);
  }, []);
  return (
    <aside style={{ transform, opacity }} className={styles.navigator}>
      <Image
        style={{
          objectFit: "cover",
          objectPosition: "center",
        }}
        className={styles.bg}
        priority
        src="/owner.png"
        alt="owner icon"
        layout="fill"
      />
      <div className={styles.overlay}></div>
      <div className={styles.account}>
        <div className={styles.avatar}>
          {user.profilePicture ? (
            <Image
              width={50}
              height={50}
              priority
              quality={100}
              alt="user avatar"
              src="/user.png"
              layout="fixed"
            />
          ) : (
            <div className={styles.avatarInput}>
              {user.initials ? user.initials() : ""}
            </div>
          )}
        </div>
        <div className={styles.more}>
          <div className={styles.title}>
            <p className={styles.userName}>
              {user.role === 0 ? `Dr. ${user.name}` : user.name}
            </p>
            {typeof user.role === "number" ? (
              <p className={styles.role}>{ROLE_NAMES[user.role]}</p>
            ) : (
              <></>
            )}
          </div>
          <div className={styles.pharmacy}>
            <p>Pharmacie</p>
            {pharmacy.name ? (
              <>
                <p
                  style={{ opacity: pharmacyNameOpacity }}
                  className={styles.pharmacyName}
                >
                  {pharmacy.name}
                </p>
                <div
                  className={styles.workers}
                  onClick={() => {
                    setModal(true, dispatch);
                  }}
                >
                  <div className={styles.avatarInputWorkers}>
                    <p>+</p>
                    <span>Mon équipe</span>
                  </div>
                </div>
              </>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setPharmacy({ name: pharmacyName }, dispatch);
                  setTimeout(() => {
                    setPharmacyNameOpacity("1");
                  });
                }}
              >
                <input
                  className={styles.pharmacyName}
                  value={pharmacyName}
                  onChange={(e) => setPharmacyName(e.target.value)}
                  type="text"
                  placeholder="+ Nom de la pharmacie"
                  autoCorrect="off"
                  autoComplete="off"
                  spellCheck="false"
                />
                {/* <span>
                  <input type="submit" value="entrer" />
                </span> */}
              </form>
            )}
          </div>
        </div>
      </div>
      <ul className={styles.menu}>
        <li
          onClick={() => setDashboard({ tab: 0 }, dispatch)}
          style={{
            opacity: tab === 0 ? 1 : 0.65,
          }}
        >
          <Image
            width={50}
            height={50}
            alt="analytics icon"
            src="/analytics.png"
          />
          <p
            style={{
              opacity: tab === 0 ? 1 : 0.65,
              borderBottom: tab === 0 ? "1px solid #FEFEFE" : "none",
            }}
          >
            Activité
          </p>
        </li>
        <li
          onClick={() => setDashboard({ tab: 1 }, dispatch)}
          style={{
            opacity: tab === 1 ? 1 : 0.65,
          }}
        >
          <Image
            width={50}
            height={50}
            alt="inventory icon"
            src="/inventory.png"
          />
          <p
            style={{
              opacity: tab === 1 ? 1 : 0.65,
              borderBottom: tab === 1 ? "1px solid #FEFEFE" : "none",
            }}
          >
            Inventaire
          </p>
        </li>
        <li
          onClick={() => setDashboard({ tab: 2 }, dispatch)}
          style={{
            opacity: tab === 2 ? 1 : 0.65,
          }}
        >
          <Image
            width={50}
            height={50}
            alt="pharmacist icon"
            src="/pharmacist.png"
          />
          <p
            style={{
              opacity: tab === 2 ? 1 : 0.65,
              borderBottom: tab === 2 ? "1px solid #FEFEFE" : "none",
            }}
          >
            Personnel
          </p>
        </li>
        <li
          onClick={() => setDashboard({ tab: 3 }, dispatch)}
          style={{
            opacity: tab === 3 ? 1 : 0.65,
          }}
        >
          <Image
            width={50}
            height={50}
            alt="outside world icon"
            src="/world.png"
          />
          <p
            style={{
              opacity: tab === 3 ? 1 : 0.65,
              borderBottom: tab === 3 ? "1px solid #FEFEFE" : "none",
            }}
          >
            Réseaux
          </p>
        </li>
      </ul>
    </aside>
  );
}
