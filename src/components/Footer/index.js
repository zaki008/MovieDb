// components/Footer.js

import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>&copy; {new Date().getFullYear()} Ahmad Zaki Yamani</p>
      </div>
    </footer>
  );
}
