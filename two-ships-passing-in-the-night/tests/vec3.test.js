import {
  vec3_create,
  vec3_add,
  vec3_sub,
  vec3_multiplyScalar,
  vec3_length,
  vec3_normalize,
} from '../src/vec3.js';

// Helpers de test (évite les répétitions et garde des expect lisibles)
const expectVec3CloseTo = (v, x, y, z, precision = 10) => {
  expect(v.x).toBeCloseTo(x, precision);
  expect(v.y).toBeCloseTo(y, precision);
  expect(v.z).toBeCloseTo(z, precision);
};

describe('Tests unitaires - vec3.js', () => {
  test('Addition de deux vecteurs (vec3_add) modifie le premier vecteur', () => {
    const a = vec3_create(1, 2, 3);
    const b = vec3_create(-4, 0.5, 10);

    const result = vec3_add(a, b);

    // API: retourne le même objet muté
    expect(result).toBe(a);
    expectVec3CloseTo(a, -3, 2.5, 13);
  });

  test('Soustraction de deux vecteurs (vec3_sub) modifie le premier vecteur', () => {
    const a = vec3_create(10, -2, 0.25);
    const b = vec3_create(1, 3, -4);

    const result = vec3_sub(a, b);

    expect(result).toBe(a);
    expectVec3CloseTo(a, 9, -5, 4.25);
  });

  test('Multiplication par un scalaire (vec3_multiplyScalar) modifie le vecteur', () => {
    const v = vec3_create(1.5, -2, 4);

    const result = vec3_multiplyScalar(v, 2);

    expect(result).toBe(v);
    expectVec3CloseTo(v, 3, -4, 8);
  });

  test('Magnitude / longueur (vec3_length) retourne la norme euclidienne', () => {
    const v = vec3_create(3, 4, 12);

    // sqrt(3^2 + 4^2 + 12^2) = 13
    expect(vec3_length(v)).toBeCloseTo(13, 12);
  });

  test('Normalisation (vec3_normalize) ramène la longueur à 1 (si vecteur non nul)', () => {
    const v = vec3_create(3, 4, 0);

    const result = vec3_normalize(v);

    expect(result).toBe(v);
    expect(vec3_length(v)).toBeCloseTo(1, 12);

    // Le vecteur (3,4,0) normalisé = (0.6, 0.8, 0)
    expectVec3CloseTo(v, 0.6, 0.8, 0, 12);
  });
});
