import '../globals.css';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata = {
  title: 'Admin Panel — IndusInd Bank',
  description: 'Secure admin panel',
};

export default function AdminLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body style={{ margin: 0, background: '#f0f2f5', fontFamily: 'var(--font-poppins, sans-serif)' }}>
        {children}
      </body>
    </html>
  );
}
