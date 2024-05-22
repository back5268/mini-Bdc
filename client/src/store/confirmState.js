import { create } from 'zustand';

const initState = {
  title: '',
  children: '',
  action: () => {}
};

const useConfirmState = create((set, get) => ({
  confirmInfo: initState,
  open: false,
  showConfirm: (confirmInfo) => set({ confirmInfo, open: true }),
  hideConfirm: () => set({ confirmInfo: initState, open: false })
}));

const getConfirmState = () => useConfirmState.getState();
export { useConfirmState, getConfirmState };
