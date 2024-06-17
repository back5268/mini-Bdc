import { create } from 'zustand';

const useDataState = create((set, get) => ({
  users: [],
  departments: [],
  apartments: [],
  services: [],
  residents: [],
  setUsers: (users) => set({ users }),
  setDepartments: (departments) => set({ departments }),
  setApartments: (apartments) => set({ apartments }),
  setServices: (services) => set({ services }),
  setResidents: (residents) => set({ residents })
}));

const getDataState = () => useDataState.getState();
export { useDataState, getDataState };
