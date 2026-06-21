import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer} id="footer">
      <div className={styles.footerTop}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.footerCol}>
              <h4>Loans</h4>
              <ul>
                <li><span className={styles.chevron}>›</span> <Link href="#">Home Loans</Link></li>
                <li><span className={styles.chevron}>›</span> <Link href="#">Plot Loans</Link></li>
                <li><span className={styles.chevron}>›</span> <Link href="#">House Renovation Loans</Link></li>
                <li><span className={styles.chevron}>›</span> <Link href="#">NRI Home Loans</Link></li>
              </ul>
            </div>
            <div className={styles.footerCol}>
              <h4>Useful Links</h4>
              <ul>
                <li><span className={styles.chevron}>›</span> <Link href="#">Training Centre</Link></li>
                <li><span className={styles.chevron}>›</span> <Link href="#">Home Buyer&apos;s Guide</Link></li>
                <li><span className={styles.chevron}>›</span> <Link href="#">Sarfaesi Notice</Link></li>
                <li><span className={styles.chevron}>›</span> <Link href="#">Blogs</Link></li>
                <li><span className={styles.chevron}>›</span> <Link href="#">FAQS</Link></li>
              </ul>
            </div>
            <div className={styles.footerCol}>
              <h4>Contact Us</h4>
              <ul>
                <li><span className={styles.chevron}>›</span> <Link href="#">Service Request / Queries</Link></li>
                <li><span className={styles.chevron}>›</span> <Link href="#">Helpline Number</Link></li>
                <li><span className={styles.chevron}>›</span> <Link href="#">Locate Us</Link></li>
                <li><span className={styles.chevron}>›</span> <Link href="#">Grievance Redressal</Link></li>
                <li><span className={styles.chevron}>›</span> <Link href="#">Axis Bank Ltd Deposit Centers</Link></li>
              </ul>
            </div>
            <div className={styles.footerCol}>
              <h4>Calculators</h4>
              <ul>
                <li><span className={styles.chevron}>›</span> <Link href="#">Home Loan Interest Rates</Link></li>
                <li><span className={styles.chevron}>›</span> <Link href="#">Home Loan EMI Calculator</Link></li>
                <li><span className={styles.chevron}>›</span> <Link href="#">Home Loan Eligibility Calculator</Link></li>
                <li><span className={styles.chevron}>›</span> <Link href="#">Home Loan Balance Transfer Calculator</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <div className={styles.container}>
          <div className={styles.copyright}>
            © Copyright Axis Bank Ltd. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
