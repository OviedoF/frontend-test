import CountriesList from "./components/CountriesList";
import styles from "./page.module.css";

export default function Home() {

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Country List Page</h1>

        <CountriesList />
      </main>
    </div>
  );
}
