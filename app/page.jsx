'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

const carouselImages = [
  '/assets/img/indusind-banner-1.png',
  '/assets/img/indusind-banner-2.png'
];

const ShieldIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const TrendingUpIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>;
const GiftIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/></svg>;
const CheckCircleIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>;
const LockIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
const LinkIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>;
export const TrophyIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 1.1-.9 2-2 2H4"/><path d="M14 14.66V17c0 1.1.9 2 2 2h12"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>;

const services = [
  { icon: <ShieldIcon />, title: 'Card Protection Plan', href: '/card-protection', desc: 'Safeguard your IndusInd Bank credit card against fraud, theft, and unauthorized transactions with our comprehensive Card Protection Plan.', btn: 'Protect Now' },
  { icon: <TrendingUpIcon />, title: 'Limit Increase', href: '/limit-increase', desc: 'Increase your IndusInd Bank credit card spending limit conveniently via NetBanking or IndusMobile. No charges apply for limit enhancement requests.', btn: 'Increase Now' },
  { icon: <GiftIcon />, title: 'Reward Point', href: '/reward-point', desc: 'Redeem your IndusMoments reward points for exciting products, gift vouchers, travel bookings, and exclusive lifestyle experiences.', btn: 'Redeem Now' },
  { icon: <CheckCircleIcon />, title: 'Card Activation', href: '/card-activation', desc: 'Activate your new IndusInd Bank credit card instantly through our secure online portal and start enjoying premium benefits right away.', btn: 'Activate Now' },
  { icon: <LockIcon />, title: 'Card Block', href: '/card-block', desc: 'Instantly block your IndusInd Bank credit card in case of loss, theft, or suspected misuse to protect your finances from unauthorized access.', btn: 'Block Now' },
  { icon: <LinkIcon />, title: 'Link Card', href: '/link-card', desc: 'Link your IndusInd Bank credit card to UPI-enabled apps for seamless digital payments and enhanced transaction convenience across platforms.', btn: 'Link Now' },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            {/* Carousel */}
            <div className={styles.carouselWrapper}>
              <div className={styles.carousel}>
                {carouselImages.map((src, i) => (
                  <div key={i} className={`${styles.slide} ${i === currentSlide ? styles.active : ''}`}>
                    <img src={src} alt={`IndusInd Bank slide ${i + 1}`} />
                  </div>
                ))}
                <div className={styles.dots}>
                  {carouselImages.map((_, i) => (
                    <button key={i} className={`${styles.dot} ${i === currentSlide ? styles.dotActive : ''}`} onClick={() => setCurrentSlide(i)} aria-label={`Slide ${i+1}`} />
                  ))}
                </div>
              </div>
            </div>

            {/* Key Updates */}
            <div className={styles.keyUpdates}>
              <p className={styles.keyUpdatesTitle}>
                <span className={styles.iconWrapper}><TrophyIcon /></span> Key Updates
              </p>
              <div className={styles.keyImgs}>
                <img src="/assets/img/indusind-update-1.png" alt="IndusInd Update 1" />
                <img src="/assets/img/indusind-update-2.png" alt="IndusInd Update 2" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className={styles.about} id="about">
        <div className={styles.container}>
          <div className={styles.aboutContent}>
            <h3 className={styles.aboutTitle}>Apply for IndusInd Bank Credit Card — Instant Approval</h3>
            <p>IndusInd Bank Credit Cards offer you a world of exclusive privileges, rewards, and financial flexibility. Whether you&apos;re a frequent traveller, a shopaholic, or a dining enthusiast — there&apos;s an IndusInd Bank credit card perfectly tailored for your lifestyle.</p>
            <p>From the premium Celesta Metal Card to the feature-rich Nexxt Credit Card with flexible payment options, IndusInd Bank delivers best-in-class credit card experiences powered by cutting-edge technology and personalised service.</p>
            <p>Manage your IndusInd Bank credit card effortlessly through IndusMobile, NetBanking, and the IndusMoments rewards platform — all at your fingertips, anytime, anywhere.</p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={styles.services} id="services">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Card Management Services</h2>
            <p className={styles.sectionSubtitle}>Everything you need to manage your IndusInd Bank credit card</p>
          </div>
          <div className={styles.servicesGrid}>
            {services.map((s) => (
              <div key={s.href} className={styles.serviceCard}>
                <div className={styles.serviceIcon}>{s.icon}</div>
                <h4 className={styles.serviceTitle}><Link href={s.href}>{s.title}</Link></h4>
                <p className={styles.serviceDesc}>{s.desc}</p>
                <Link href={s.href} className={styles.serviceBtn}>{s.btn}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={styles.values} id="offers">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Exclusive Offers</h2>
            <p className={styles.sectionSubtitle}>Discover curated deals and benefits for IndusInd Bank cardholders</p>
          </div>
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard} style={{ backgroundImage: 'url(/assets/img/indusind-offer-1.png)' }}></div>
            <div className={styles.valueCard} style={{ backgroundImage: 'url(/assets/img/indusind-offer-2.png)' }}></div>
            <div className={styles.valueCard} style={{ backgroundImage: 'url(/assets/img/indusind-offer-3.png)' }}></div>
          </div>
        </div>
      </section>
    </>
  );
}
