import { mutative } from "zustand-mutative";
import { devtools } from "zustand/middleware";
import { Chf, chfToBytes } from "./schema/Chf";
import { downloadBytes } from "./utils/DownloadBytes";
import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";

type ChfStore = {
  chf: Chf | undefined;
  loadChf: (newChf: Chf) => void;
  clearChf: () => void;
  updateChf: (fn: (draft: Chf) => void) => void;
  exportChf: () => void;
};

export const useChfStore = createWithEqualityFn<ChfStore>()(
  devtools(
    mutative((set, get) => ({
      chf: undefined,
      loadChf: (chf) => set({ chf }, false, "loadChf"),
      clearChf: () => set({ chf: undefined }, false, "clearChf"),
      updateChf: (fn) =>
        set(
          (draft) => {
            if (draft.chf === undefined)
              throw new Error("Cannot update CHF: No CHF is loaded");

            fn(draft.chf);
          },
          false,
          "updateChf"
        ),
      exportChf: () => {
        const state = get();
        if (state.chf === undefined)
          throw new Error("Cannot export CHF: No CHF is loaded");

        downloadBytes(chfToBytes(state.chf), "starchar_export.chf");
      },
    }))
  ),
  shallow
);

export function useChf<T>(selector: (chf: Chf) => T): T {
  return useChfStore((state) => {
    if (state.chf === undefined) throw new Error("No CHF is loaded");
    return selector(state.chf);
  });
}

export function useChfUpdate() {
  return useChfStore((state) => state.updateChf);
}

export function useChfManagement() {
  return useChfStore((state) => ({
    loaded: state.chf !== undefined,
    loadChf: state.loadChf,
    clearChf: state.clearChf,
    exportChf: state.exportChf,
  }));
}
