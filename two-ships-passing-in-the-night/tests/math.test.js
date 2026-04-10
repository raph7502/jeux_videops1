import { randFloatSpread, mapLinear, lerp } from '../src/math.js';

describe('Tests unitaires - Two Ships Passing In The Night', () => {
  // Tests pour randFloatSpread
  test('randFloatSpread(1) doit être compris entre -1 et 1', () => {
    const result = randFloatSpread(1);
    expect(result <= 1).toBe(true);
    expect(result >= -1).toBe(true);
  });

  // Tests pour mapLinear
  test('mapLinear(1, 2, 3, 4, 5) doit retourner 3', () => {
    expect(mapLinear(1, 2, 3, 4, 5)).toBe(3);
  });

  test('mapLinear(1, 20, 3, 40, 5) doit retourner environ 0.882', () => {
    expect(mapLinear(1, 20, 3, 40, 5)).toBeCloseTo(0.882352941176471, 15);
  });

  // Tests pour lerp
  test('lerp(1, 3, 20) doit retourner 41', () => {
    expect(lerp(1, 3, 20)).toBe(41);
  });

  test('lerp(1.3, -7, 2) doit retourner -15.3', () => {
    expect(lerp(1.3, -7, 2)).toBeCloseTo(-15.3, 1);
  });
});
