import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GameState, Question } from './types';

const defaultQuestions: Question[] = [
  { q: "If you leave your vehicle unattended, you must:", a: ["Leave engine running", "Stop engine, lock, remove key, set parking brake", "Leave key in ignition", "Leave parking brake off"], correct: 1 },
  { q: "Texting while driving in Washington is:", a: ["Allowed hands-free", "Against the law - dangerous distraction", "OK for brief messages", "Only banned at night"], correct: 1 },
  { q: "For new drivers under 18 with Intermediate License, passenger rule:", a: ["Any passengers OK", "No passengers under 20 except immediate family", "Only adults", "Unlimited friends"], correct: 1 },
  { q: "Nighttime restriction for drivers under 18:", a: ["No restrictions", "Cannot drive 1am-5am unless with 25+ licensed driver", "Only drive at night", "Weekend only"], correct: 1 },
  { q: "What should you do in heavy rain?", a: ["Drive normal speed", "Turn on headlights, reduce speed, increase following distance", "Use high beams", "Ignore wipers"], correct: 1 },
  { q: "Blind spot check when changing lanes:", a: ["Just use mirror", "Shoulder check + mirror", "Horn only", "Speed up"], correct: 1 },
  { q: "Parallel parking steps (WA test):", a: ["Pull up, reverse at 45°, straighten", "Any way is fine", "Forward only", "Skip it"], correct: 0 },
];

export const useGameStore = create<GameState>()(
  persist(
    (_set) => ({
      mileage: 0,
      zcoins: 250,
      upgrades: [0, 0, 0, 0],
      handling: 8,
      durability: 80,
      fuel: 100,
      questions: defaultQuestions,
      accuracy: 85,
    }),
    { name: 'kpop-zombie-wa-store' }
  )
);
