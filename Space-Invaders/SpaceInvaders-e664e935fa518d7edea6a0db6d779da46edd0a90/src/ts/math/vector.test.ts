import {add, subtract, dot, normalize} from './vector';

describe('Tests unitaires Vecteurs - Space Invaders', () => {
  const v1 = {x: 5, y: 50};
  const v2 = {x: 10, y: 100};

  test('add devrait additionner deux vecteurs', () => {
    expect(add(v1, v2)).toEqual({x: 15, y: 150});
  });

  test('subtract devrait soustraire deux vecteurs', () => {
    expect(subtract(v1, v2)).toEqual({x: -5, y: -50});
  });

  test('dot devrait calculer le produit scalaire', () => {
    expect(dot(v1, v2)).toBe(5050);
  });

  test('normalize devrait normaliser le vecteur', () => {
    const result = normalize(v1);
    expect(result.x).toBeCloseTo(0.09950371902099892, 10);
    expect(result.y).toBeCloseTo(0.9950371902099892, 10);
  });
});
