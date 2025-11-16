// features/auth/model/useAuthStore.ts
import { create } from 'zustand';

export type SocialMedia = {
  telegram_url: string | null;
  vk_url: string | null;
  youtube_url: string | null;
};

export type AuthUser = {
  user_id: number;
  email: string;
  name: string;
  surname: string;
  nickname: string;
  avatar: string;
  social_media: SocialMedia;
};

export type AuthStatus = 'idle' | 'checking' | 'authenticated' | 'unauthenticated';

type AuthState = {
  accessToken: string | null;
  user: AuthUser | null;
  status: AuthStatus;
  setAccessToken: (token: string | null) => void;
  setUser: (user: AuthUser | null) => void;
  setStatus: (status: AuthStatus) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  status: 'idle',

  setAccessToken: (accessToken) => set({ accessToken }),
  setUser: (user) => set({ user }),
  setStatus: (status) => set({ status }),

  logout: () =>
    set({
      accessToken: null,
      user: null,
      status: 'unauthenticated',
    }),
}));
