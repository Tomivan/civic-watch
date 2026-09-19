import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';

interface AuthState {
  user: User | null;
  loading: boolean;
  initialized: boolean;
  isAdmin: boolean;
  init: () => void;
  signInWithGoogle: () => Promise<void>;
  signInAsAdmin: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? '';

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      loading: true,
      initialized: false,
      isAdmin: false,

      init: () => {
        if (get().initialized) return;
        onAuthStateChanged(auth, (u) => {
          set({
            user: u,
            loading: false,
            initialized: true,
            isAdmin: u?.email === ADMIN_EMAIL,
          });
        });
      },

      signInWithGoogle: async () => {
        const cred = await signInWithPopup(auth, googleProvider);
        set({
          user: cred.user,
          isAdmin: cred.user.email === ADMIN_EMAIL,
        });
      },

      signInAsAdmin: async (email, password) => {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        if (cred.user.email !== ADMIN_EMAIL) {
          await signOut(auth);
          throw new Error('Not an admin account');
        }
        set({ user: cred.user, isAdmin: true });
      },

      logout: async () => {
        await signOut(auth);
        set({ user: null, isAdmin: false });
      },
    }),
    {
      name: 'civicwatch-auth',
      partialize: (state) => ({ isAdmin: state.isAdmin }),
    }
  )
);