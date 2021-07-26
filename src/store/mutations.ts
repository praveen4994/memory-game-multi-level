import { StateObject, WinningData } from "@/interface";

export default {
  NEXT_LEVEL: (state: StateObject, data: WinningData): void => {
    state.winningData[data.level] = data;
    state.level = state.level + 1;
  },
};
