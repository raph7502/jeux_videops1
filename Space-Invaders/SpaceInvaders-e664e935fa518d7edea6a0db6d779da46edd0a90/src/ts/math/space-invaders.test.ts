import { clamp, lerp } from './math';
import { add, subtract, dot, normalize } from './vector';
import { distance, toVector } from './polar-vector';

describe('Tests officiels Space Invaders (Annexe PDF)', () => {
  const expectedDistance = 98.30248290540649;
  const expectedVecX = 14.183109273161312;
  const expectedVecY = -47.946213733156924;

  test('Calculs de base: clamp et lerp', () => {
    expect(clamp(1, 10, 2)).toBe(2);
    expect(clamp(1, 10, -12)).toBe(1);
    expect(lerp(1, 10, 2)).toBe(19);
    expect(lerp(1, 10, -12)).toBe(-107);
  });

  test('Vecteurs: add, subtract, dot, normalize', () => {
    const v1 = { x: 5, y: 50 };
    const v2 = { x: 10, y: 100 };

    expect(add(v1, v2)).toEqual({ x: 15, y: 150 });
    expect(subtract(v1, v2)).toEqual({ x: -5, y: -50 });
    expect(dot(v1, v2)).toBe(5050);

    const norm = normalize(v1);
    expect(norm.x).toBeCloseTo(0.09950371902099892, 10);
    expect(norm.y).toBeCloseTo(0.9950371902099892, 10);
  });

  test('Vecteurs Polaires: distance et toVector', () => {
    const p1 = { angle: 5, radius: 50 };
    const p2 = { angle: 10, radius: 100 };

    // Valeur issue du PDF (pour éviter les problèmes d'arrondi)
    expect(distance(p1, p2)).toBeCloseTo(expectedDistance, 10);

    const vec = toVector(p1);
    expect(vec.x).toBeCloseTo(expectedVecX, 10);
    expect(vec.y).toBeCloseTo(expectedVecY, 10);
  });
});
