import { create } from 'zustand';

const useDataState = create((set, get) => ({
  users: [],
  departments: [],
  setUsers: (users) => set({ users }),
  setDepartments: (departments) => set({ departments }),
}));

const getDataState = () => useDataState.getState();
export { useDataState, getDataState };
