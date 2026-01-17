import { create } from "zustand";

import { getCurrentUser } from "@/lib/appwrite";
import { User } from "@/type";

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;

  setUser: (user: User) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;

  fectchAuthenticatedUser: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: false,

  setUser: (user) => set(() => ({ user })),
  setIsAuthenticated: (isAuthenticated) =>
    set(() => ({ isAuthenticated })),
  setIsLoading: (isLoading) => set(() => ({ isLoading })),

  fectchAuthenticatedUser: async () => {
    set({ isLoading: true });

    try {
      const user = await getCurrentUser();

     if (user) set({ user, isAuthenticated: true});
     else set({ user: null, isAuthenticated: false });
    } catch (error) {
      console.log("No authenticated user found", error);
        set({ user: null, isAuthenticated: false });
    } finally {
      set({ isLoading: false });
    }
  },
}));
