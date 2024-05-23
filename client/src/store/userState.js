import { create } from 'zustand';

export const INITIAL_USER_INFO = {
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
  userInfo: INITIAL_USER_INFO,
  isAuthenticated: false,
  type: false,
  projects: [],
  tools: [],
  project: localStorage.getItem('project'),
  setUserInfo: (data) => set({ ...data, isAuthenticated: true, type: data.userInfo?.type }),
  clearUserInfo: () => set({ userInfo: INITIAL_USER_INFO, isAuthenticated: false, type: false, projects: [], tools: [] }),
  setProject: (project) => set({ project })
}));

const getUserState = () => useUserState.getState();
export { useUserState, getUserState };
