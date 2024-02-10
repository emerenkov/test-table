import styles from './App.module.css';
import Companies from "../Companies/Companies";
import Staff from "../Staff/Staff";

function App() {
  return (
    <div className={styles.app}>
      <header>
        <h1>Test work from Evgeniy Merenkov</h1>
      </header>
      <main className={styles.main}>
        <Companies />
        <Staff />
      </main>
    </div>
  );
}

export default App;
