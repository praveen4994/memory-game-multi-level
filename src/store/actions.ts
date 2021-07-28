/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { WinningData } from "@/interface";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default {
  NEXT_LEVEL: (store: any): void => {
    store.commit("NEXT_LEVEL");
  },
  SAVE_DATA: (store: any, data: WinningData): void => {
    store.commit("SAVE_DATA", data);
  },
};
