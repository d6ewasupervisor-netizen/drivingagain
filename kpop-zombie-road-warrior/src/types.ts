export interface Question {
  q: string;
  a: string[];
  correct: number;
}

export interface GameState {
  mileage: number;
  zcoins: number;
  upgrades: number[];
  handling: number;
  durability: number;
  fuel: number;
  questions: Question[];
  accuracy: number;
}
