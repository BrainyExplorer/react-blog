import { create } from "zustand";
import { persist } from 'zustand/middleware'

const useGlobalStore = create()(
  // persist(
  //   (set) => ({
  //     primaryColor: "#247fff",
  //     setColor: (color) => set(() => ({ primaryColor: color })),
  //   }),
  //   {
  //     name: "primaryColor",
  //     partialize: (state) =>
  //       Object.fromEntries(
  //         Object.entries(state).filter(([key]) =>
  //           ["primaryColor"].includes(key)
  //         )
  //       ),
  //   }
  // )
);

export default useGlobalStore;