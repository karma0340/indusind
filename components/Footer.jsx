import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer} id="footer">
      <div className={styles.accentBar}></div>
      <div className={styles.footerTop}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.footerCol}>
              <h4>Products</h4>
              <ul>
                <li><span className={styles.chevron}>›</span> <Link href="#">Credit Cards</Link></li>
                <li><span className={styles.chevron}>›</span> <Link href="#">Debit Cards</Link></li>
                <li><span className={styles.chevron}>›</span> <Link href="#">Forex Cards</Link></li>
                <li><span className={styles.chevron}>›</span> <Link href="#">DUO Card</Link></li>
              </ul>
            </div>
            <div className={styles.footerCol}>
              <h4>Services</h4>
              <ul>
                <li><span className={styles.chevron}>›</span> <Link href="#">NetBanking</Link></li>
                <li><span className={styles.chevron}>›</span> <Link href="#">IndusMobile App</Link></li>
                <li><span className={styles.chevron}>›</span> <Link href="#">IndusMoments</Link></li>
                <li><span className={styles.chevron}>›</span> <Link href="#">IndusFASTag</Link></li>
                <li><span className={styles.chevron}>›</span> <Link href="#">UPI Payments</Link></li>
              </ul>
            </div>
            <div className={styles.footerCol}>
              <h4>Contact Us</h4>
              <ul>
                <li><span className={styles.chevron}>›</span> <Link href="#">Customer Care</Link></li>
                <li><span className={styles.chevron}>›</span> <Link href="#">Log a Complaint</Link></li>
                <li><span className={styles.chevron}>›</span> <Link href="#">Locate a Branch</Link></li>
                <li><span className={styles.chevron}>›</span> <Link href="#">Grievance Redressal</Link></li>
                <li><span className={styles.chevron}>›</span> <Link href="#">Report Fraud</Link></li>
              </ul>
            </div>
            <div className={styles.footerCol}>
              <h4>About IndusInd</h4>
              <ul>
                <li><span className={styles.chevron}>›</span> <Link href="#">About Us</Link></li>
                <li><span className={styles.chevron}>›</span> <Link href="#">Investors</Link></li>
                <li><span className={styles.chevron}>›</span> <Link href="#">Careers</Link></li>
                <li><span className={styles.chevron}>›</span> <Link href="#">Sustainability</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <div className={styles.container}>
          <div className={styles.copyright}>
            © Copyright IndusInd Bank Ltd. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
