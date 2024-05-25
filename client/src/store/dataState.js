import { create } from 'zustand';

const useDataState = create((set, get) => ({
  users: [],
  departments: [],
  spartments: [],
  services: [],
  setUsers: (users) => set({ users }),
  setDepartments: (departments) => set({ departments }),
  setApartments: (apartments) => set({ apartments }),
  setServices: (services) => set({ services })
}));

const getDataState = () => useDataState.getState();
export { useDataState, getDataState };
