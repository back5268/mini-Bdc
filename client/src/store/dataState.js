import { create } from 'zustand';

const useDataState = create((set, get) => ({
  users: [],
  products: [],
  setUsers: (users) => set({ users }),
  setProducts: (products) => set({ products }),
}));

const getDataState = () => useDataState.getState();
export { useDataState, getDataState };
