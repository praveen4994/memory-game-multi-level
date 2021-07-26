export interface StateObject {
  level: number;
  winningData: Record<string, WinningData>;
}

export interface WinningData {
  level: number;
  timeLeft: number;
  moves: number;
  rating: number;
  sequence: number[];
}
