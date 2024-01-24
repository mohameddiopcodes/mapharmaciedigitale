import Image from "next/image";
import styles from "./index.module.scss";
import { useContext, useState } from "react";
import setWorkers from "@/app/_context/actions/setWorkers";
import Context from "@/app/_context";

export default function WorkerCreationModal() {
  const {
    dispatch,
    state: { workers },
  } = useContext(Context);
  const [role, setRole] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  function onSubmit(e: any) {
    e.preventDefault();
    setWorkers({ name, phone, role }, dispatch);
    setRole(0);
    setName("");
    setPhone("");
  }

  return (
    <div className={styles.modal}>
      <p>{"L'Équipe"}</p>
      {workers.length > 0 ? (
        <div className={styles.team}></div>
      ) : (
        <p>Aucun membre...</p>
      )}
      <form onSubmit={onSubmit}>
        <span>
          <label htmlFor="name">nom complet</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Le Nom Complet"
            id="name"
          />
        </span>
        <span>
          <label htmlFor="phone">téléphone mobile</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="text"
            placeholder="Numéro de téléphone"
            id="phone"
          />
        </span>
        <ul className={styles.role}>
          <li
            onClick={() => setRole(0)}
            className={role === 0 ? styles.activeRole : ""}
          >
            <Image
              alt="co-owner icon"
              src="/owner.png"
              width={180}
              height={300}
              priority
              quality={100}
            />
            Propriétaire
          </li>
          <li
            onClick={() => setRole(1)}
            className={role === 1 ? styles.activeRole : ""}
          >
            <Image
              alt="seller icon"
              src="/hero1.png"
              width={180}
              height={300}
              priority
              quality={100}
            />
            Vendeur
          </li>
          <li
            onClick={() => setRole(2)}
            className={role === 2 ? styles.activeRole : ""}
          >
            <Image
              alt="manager icon"
              src="/management.png"
              width={180}
              height={300}
              priority
              quality={100}
            />
            Gestionnaire
          </li>
        </ul>
        <input
          style={
            name && phone && typeof role === "number"
              ? { background: "#3F51B5" }
              : { background: "#888" }
          }
          disabled={!name || !phone || typeof role !== "number"}
          type="submit"
          value="Ajouter"
        />
      </form>
    </div>
  );
}
