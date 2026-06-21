'use client';
import { useState, useEffect } from 'react';
import styles from './PageBanner.module.css';

export default function PageBanner({ images }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isArray = Array.isArray(images);
  const slides = isArray ? images : [images];

  useEffect(() => {
    if (!isArray || slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isArray, slides.length]);

  if (!images || slides.length === 0 || (slides.length === 1 && !slides[0])) {
    return <div className={styles.emptyBanner} />;
  }

  return (
    <section className={styles.bannerSection}>
      <div className={styles.bannerWrapper}>
        {slides.map((src, i) => (
          <div
            key={i}
            className={`${styles.slide} ${i === currentSlide ? styles.active : ''}`}
          >
            <img src={src} alt={`Banner slide ${i + 1}`} className={styles.bannerImg} />
          </div>
        ))}
        
        {isArray && slides.length > 1 && (
          <div className={styles.dots}>
            {slides.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === currentSlide ? styles.dotActive : ''}`}
                onClick={() => setCurrentSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
