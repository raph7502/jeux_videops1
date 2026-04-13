import { distance, toVector } from './polar-vector';

describe('Tests unitaires Vecteurs Polaires - Space Invaders', () => {
    const p1 = { angle: 5, radius: 50 };
    const p2 = { angle: 10, radius: 100 };

    test('distance devrait calculer la distance entre deux points polaires', () => {

        expect(distance(p1, p2)).toBeCloseTo(98.30248290540649, 10);
    });

    test('toVector devrait convertir en vecteur cartésien', () => {
        const result = toVector(p1);
        expect(result.x).toBeCloseTo(14.183109273161312, 10);
        expect(result.y).toBeCloseTo(-47.946213733156924, 10);
    });
});