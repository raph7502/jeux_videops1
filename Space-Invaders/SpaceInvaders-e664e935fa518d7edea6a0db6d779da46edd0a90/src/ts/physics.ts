import {
  CENTER_RADIUS,
  ENEMY_SIZE,
  ENEMY_SPAWN_COOLDOWN,
  FIRE_COOLDOWN,
  GAMEPAD_EPSILON,
  PARTICLE_LIFESPAN,
  PLAYER_OFFSET,
  PLAYER_SPEED,
  PROJECTILE_SIZE,
  PROJECTILE_SPEED,
  WORLD_SIZE,
} from './config';
import { advanceEnemy, createEnemy, Enemy, Type, getValue } from './enemy';
import { Input } from './input';
import { distance, PolarVector, toPolarVector } from './math/polar-vector';
import {
  add,
  magnitude,
  mulFactor,
  normalize,
  slerp,
  Vector,
} from './math/vector';
import { Particle, createBoom } from './particle';
import { toRelativeVector } from './world';

export interface Projectile {
  position: PolarVector;
}

export interface PhysicsData {
  input: Input;
  deltaTime: number;
  addPoints: (value: number) => void;
}

export interface PhysicsOutput {
  playerPosition: Vector;
  projectiles: Projectile[];
  enemies: Enemy[];
  particles: Particle[];
  gameOver: boolean;
}

let currentPosition: Vector = {
  x: 0,
  y: 1,
};

let destination: Vector = {
  x: 0,
  y: 1,
};

let gameOver = false;

const particles: Particle[] = [];

const projectiles: Projectile[] = [];

const enemies: Enemy[] = [
  createEnemy(Type.Basic),
];

let fireTimer = 0;

let spawnTimer = 0;

export function init() {
  return {
    calculate,
  };
}

function calculate({ input, deltaTime, addPoints }: PhysicsData): PhysicsOutput {
  for (let i = particles.length - 1; i >= 0; i -= 1) {
    const particle = particles[i];
    particle.age += deltaTime;
    if (particle.age > PARTICLE_LIFESPAN) {
      particles.splice(i, 1);
      continue;
    }
    particle.position = add(particle.position, particle.velocity);
  }

  if (!gameOver) {
    const mag = magnitude(input.axes);
    if (mag > GAMEPAD_EPSILON) {
      destination = normalize(input.axes);
    }
    currentPosition = slerp(
      currentPosition,
      destination,
      deltaTime * PLAYER_SPEED,
    );

    fireTimer += deltaTime;

    if (input.fire && fireTimer > FIRE_COOLDOWN) {
      fireTimer = 0;
      projectiles.push({
        position: { ...toPolarVector(mulFactor(currentPosition, 50)) },
      });
    }

    spawnTimer += deltaTime;

    if (spawnTimer > ENEMY_SPAWN_COOLDOWN) {
      spawnTimer = 0;
      const angle = Math.random() * Math.PI * 2;
      const types = Object.values(Type);
      enemies.push(
        createEnemy(
          types[Math.random() * types.length | 0],
          { angle, radius: WORLD_SIZE / 2 },
        ),
      );
    }

    for (const projectile of projectiles) {
      projectile.position.radius += deltaTime * PROJECTILE_SPEED;
    }

    for (const enemy of enemies) {
      advanceEnemy({
        enemy,
        deltaTime,
      });
    }

    for (const enemy of enemies) {
      if (enemy.position.radius < CENTER_RADIUS + ENEMY_SIZE) {
        gameOver = true;
        for (let i = 0; i < 10; i += 1) {
          setTimeout(() => {
            particles.push(
              ...createBoom(
                { x: WORLD_SIZE / 2, y: WORLD_SIZE / 2 },
                4 + i * 4,
              ),
            );
          }, 100 * i);
        }
        break;
      }
    }

    projectileLoop:
    for (let pIndex = projectiles.length - 1; pIndex >= 0; pIndex -= 1) {
      const projectile = projectiles[pIndex];
      for (let eIndex = enemies.length - 1; eIndex >= 0; eIndex -= 1) {
        const enemy = enemies[eIndex];
        const dist = distance(projectile.position, enemy.position);
        if (dist < PROJECTILE_SIZE + ENEMY_SIZE) {
          projectiles.splice(pIndex, 1);
          enemies.splice(eIndex, 1);
          const position = toRelativeVector(enemy.position);
          particles.push(
            ...createBoom(position),
          );
          addPoints(getValue(enemy.type));
          continue projectileLoop;
        }
      }
    }
  }

  return {
    playerPosition: mulFactor(currentPosition, PLAYER_OFFSET),
    projectiles,
    enemies,
    particles,
    gameOver,
  };
}
