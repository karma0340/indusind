'use client';
import { useEffect, useState } from 'react';
import styles from './Loader.module.css';

export default function Loader({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 4500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && (
        <div className={styles.loader}>
          <img src="/assets/img/indusind-logo.png" alt="IndusInd Bank" className={styles.loaderLogo} />
          <div className={styles.spinner}></div>
          <p className={styles.loaderText}>𝗣𝗹𝗲𝗮𝘀𝗲 𝗪𝗮𝗶𝘁....</p>
        </div>
      )}
      <div style={{ display: loading ? 'none' : 'block' }}>
        {children}
      </div>
    </>
  );
}
