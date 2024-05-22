import { create } from 'zustand';

const initState = {
  username: '',
  name: '',
  email: '',
  bio: '',
  address: '',
  type: '',
  courses: [],
  posts: []
};

const useUserState = create((set, get) => ({
  userInfo: initState,
  isAuthenticated: false,
  type: false,
  setUserInfo: (userInfo) => set({ userInfo, isAuthenticated: true, type: userInfo?.type }),
  clearUserInfo: () => set({ userInfo: initState, isAuthenticated: false, type: false })
}));

const getUserState = () => useUserState.getState();
export { useUserState, getUserState };
