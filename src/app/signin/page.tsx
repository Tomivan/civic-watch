"use client";

import { useState, SyntheticEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuthStore } from '../store/authStore';
import Logo from '../../../public/assets/images/logo.svg';
import ShieldIcon from '../../../public/assets/images/shield.svg';
import styles from './signin.module.css';

const SignInPage = () => {
  const router = useRouter();
  const { user, isAdmin, signInWithGoogle, signInAsAdmin, logout } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (user) router.replace('/');
  }, [user, router]);

  const handleGoogle = async () => {
    setError(null);
    setBusy(true);
    try {
      await signInWithGoogle();
      router.push('/');
    } catch (e: any) {
      setError(e.message ?? 'Google sign-in failed');
    } finally {
      setBusy(false);
    }
  };

  const handleAdmin = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await signInAsAdmin(email, password);
      router.push('/');
    } catch (e: any) {
      setError(e.message ?? 'Admin sign-in failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <Link href="/" className={styles.brand}>
          <div className={styles.brandIcon}>
            <Image src={Logo} alt="CivicWatch" width={28} height={28} />
          </div>
          <h1 className={styles.brandTitle}>
            Civic<span className={styles.brandHighlight}>Watch</span>
          </h1>
        </Link>

        <div className={styles.header}>
          <h2>Sign in</h2>
          <p>Track reports, receive updates, and manage civic issues.</p>
        </div>

        <button
          type="button"
          className={styles.googleBtn}
          onClick={handleGoogle}
          disabled={busy}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.64 9.2c0-.64-.06-1.25-.17-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.91c1.7-1.57 2.69-3.88 2.69-6.62z" fill="#4285F4"/>
            <path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.91-2.26c-.81.54-1.84.86-3.05.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z" fill="#34A853"/>
            <path d="M3.97 10.72A5.4 5.4 0 0 1 3.68 9c0-.6.1-1.18.28-1.72V4.95H.96A9 9 0 0 0 0 9c0 1.45.35 2.82.96 4.05l3.01-2.33z" fill="#FBBC05"/>
            <path d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        <div className={styles.divider}>
          <span>or sign in as admin</span>
        </div>

        <form className={styles.form} onSubmit={handleAdmin}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Admin email</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              placeholder="admin@civicwatch.ng"
              autoComplete="email"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button className={styles.adminBtn} type="submit" disabled={busy}>
            {busy ? 'Signing in…' : 'Sign in as admin'}
          </button>
        </form>

        <div className={styles.footer}>
          <ShieldIcon width={14} height={14} />
          <span>Admin credentials are issued by CivicWatch management.</span>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;