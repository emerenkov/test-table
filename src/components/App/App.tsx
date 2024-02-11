import React from 'react'
import styles from './App.module.css';
import Companies from "../Companies/Companies";
import Staff from "../Staff/Staff";

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.title}>Test work from Evgeniy Merenkov</h1>
      </header>
      <main className={styles.main}>
        <Companies />
        <Staff />
      </main>
    </div>
  );
}

export default App;
