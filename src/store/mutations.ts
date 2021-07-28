import { StateObject, WinningData } from "@/interface";

export default {
  NEXT_LEVEL: (state: StateObject): void => {
    state.level = state.level + 1;
  },
  SAVE_DATA: (state: StateObject, data: WinningData): void => {
    state.winningData[data.level] = data;
  },
};
