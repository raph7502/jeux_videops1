import {clamp, lerp} from './math';

describe('Tests unitaires Math - Space Invaders', () => {
  test('clamp devrait limiter les valeurs', () => {
    expect(clamp(1, 10, 2)).toBe(2);
    expect(clamp(1, 10, -12)).toBe(1);
  });

  test('lerp devrait calculer l interpolation linéaire', () => {
    expect(lerp(1, 10, 2)).toBe(19);
    expect(lerp(1, 10, -12)).toBe(-107);
  });
});
