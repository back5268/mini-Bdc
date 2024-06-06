import { create } from "zustand";

const useAuthState = create((set, get) => ({
  userInfo: {},
  isAuthenticated: false,
  loadingz: false,
  apartments: [],
  setUserInfo: (userInfo) => set({ userInfo, isAuthenticated: true }),
  setApartments: (apartments) => set({ apartments }),
  clearAuth: () =>
    set({ userInfo: {}, apartments: [], isAuthenticated: false }),
  setLoadingz: () => {
    const isLoading = get().loadingz;
    set({ loadingz: !isLoading });
  },
}));

const getAuthState = () => useAuthState.getState();
export { useAuthState, getAuthState };
