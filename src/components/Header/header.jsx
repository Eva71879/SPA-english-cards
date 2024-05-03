import { Link } from "react-router-dom";

import styles from "../Header/header.module.css";

export default function Header() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>WordWizard</h1>
        <h2 className={styles.subtitle}>английский как по волшебству</h2>
      </div>
      <div className={styles.nav}>
        <Link to="/">
          <img className={styles.image} src="/logo1.png" alt="logo" />
        </Link>

        <div className={styles.links}>
          <Link to="/">Главная страница</Link>
          <Link to="/game">Игра в карточки</Link>
        </div>
      </div>
    </div>
  );
}
