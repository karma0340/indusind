'use client';
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

  return (
    <header className={styles.header} id="header">
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">
            <img src="/assets/img/logo-white.png" alt="Axis Bank" className={styles.logoImg} />
          </Link>
        </div>
        <nav className={styles.navMenu}>
          <ul>
            {navLinks.map((link) => (
              <li key={link.href} className={pathname === link.href ? styles.active : ''}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <button className={styles.mobileToggle} aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
}
