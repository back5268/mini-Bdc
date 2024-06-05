import { create } from "zustand";

const useAuthState = create((set, get) => ({
  userInfo: {},
  isAuthenticated: false,
  loadingz: false,
  setUserInfo: (userInfo) => set({ userInfo, isAuthenticated: true }),
  setLoadingz: () => {
    const isLoading = get().loadingz;
    set({ loadingz: !isLoading });
  },
}));

const getAuthState = () => useAuthState.getState();
export { useAuthState, getAuthState };
