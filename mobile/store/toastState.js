import { create } from "zustand";

const initState = {
  type: "success",
  title: "",
};

const useToastState = create((set, get) => ({
  toastInfo: initState,
  show: false,
  showToast: (toastInfo) =>
    set({ toastInfo: { ...initState, ...toastInfo }, show: true }),
  hideToast: () => set({ toastInfo: initState, show: false }),
}));

const getToastState = () => useToastState.getState();
export { useToastState, getToastState };
