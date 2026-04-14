import {score, highScore, updateScore, resetScore} from './score';

// Simulation du localStorage pour que Jest ne plante pas
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(globalThis, 'localStorage', {value: localStorageMock});

describe('Logique du Score - Tests supplémentaires (Jour 3)', () => {
  beforeEach(() => {
    resetScore();
    localStorage.clear();
  });

  test('1. Le score initial doit être égal à 0', () => {
    expect(score).toBe(0);
  });

  test('2. updateScore doit augmenter le score actuel', () => {
    updateScore(100);
    expect(score).toBe(100);
  });

  test('3. highScore doit se mettre à jour si le score le dépasse', () => {
    updateScore(500);
    expect(highScore).toBe(500);
  });

  test('4. highScore ne doit pas changer si le score est inférieur', () => {
    updateScore(1000); // Nouveau record
    resetScore();
    updateScore(50); // Score plus bas
    expect(highScore).toBe(1000); // Le record reste à 1000
  });

  test('5. resetScore doit remettre le score actuel à 0', () => {
    updateScore(250);
    resetScore();
    expect(score).toBe(0);
  });
});
