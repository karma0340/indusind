'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

const navLinks = [
  { href: '/card-protection', label: 'Card Protection' },
  { href: '/limit-increase', label: 'Limit Increase' },
  { href: '/reward-point', label: 'Reward Point' },
  { href: '/card-activation', label: 'Card Activation' },
  { href: '/card-block', label: 'Card Block' },
  { href: '/link-card', label: 'Link Card' },
];

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className={styles.header} id="header">
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">
            <img
              src="/assets/img/indusind-logo.png"
              alt="IndusInd Bank"
              className={styles.logoImg}
            />
          </Link>
        </div>
        <nav className={`${styles.navMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
          <ul>
            {navLinks.map((link) => (
              <li key={link.href} className={pathname === link.href ? styles.active : ''}>
                <Link href={link.href} onClick={() => setIsMobileMenuOpen(false)}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <button 
          className={styles.mobileToggle} 
          aria-label="Toggle menu"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
}
