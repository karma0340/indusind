import './globals.css';
import { Poppins, Raleway } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300','400','500','600','700'],
  variable: '--font-poppins',
});

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['400','500','600','700','800'],
  variable: '--font-raleway',
});

export const metadata = {
  title: 'IndusInd Bank Credit Card Services',
  description: 'Manage your IndusInd Bank credit card — protection plan, limit increase, reward points redemption, card activation, blocking, and UPI linking.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${raleway.variable}`}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/assets/img/favicon.svg" />
        <meta name="theme-color" content="#800020" />
      </head>
      <body>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
