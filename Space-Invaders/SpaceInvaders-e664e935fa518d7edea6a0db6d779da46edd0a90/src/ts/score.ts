const HIGHSCORE_KEY = 'high-score';

function getLocalStorage(): Storage | null {
  try {
    if (typeof localStorage === 'undefined') return null;
    return localStorage;
  } catch {
    return null;
  }
}

function readHighScore(): number {
  const storage = getLocalStorage();
  if (!storage) return 0;
  const value = storage.getItem(HIGHSCORE_KEY);
  const parsed = value ? Number(value) : 0;
  return Number.isFinite(parsed) ? parsed : 0;
}

function writeHighScore(value: number) {
  const storage = getLocalStorage();
  if (!storage) return;
  storage.setItem(HIGHSCORE_KEY, value.toString());
}

export let score = 0;
export let highScore = readHighScore();

export function updateScore(v: number) {
  score += v;
  if (score > highScore) {
    highScore = score;
    writeHighScore(highScore);
  }
}

export function resetScore() {
  score = 0;
}

export function init() {
  highScore = Math.max(highScore, readHighScore());
  score = 0;

  const $score = document.querySelector('#score');
  const $gameOverScore = document.querySelector('#game-over-score');
  const $gameOverHighscore = document.querySelector('#game-over-highscore');
  const $gameOverButton = document.querySelector('#game-over-button');

  $gameOverButton?.addEventListener('click', () => location.reload());

  updateUI();

  return {
    addPoints
  };

  function addPoints(value: number) {
    updateScore(value);
    updateUI();
  }

  function updateUI() {
    if ($score) $score.textContent = String(score);
    if ($gameOverScore) $gameOverScore.textContent = String(score);
    if ($gameOverHighscore) $gameOverHighscore.textContent = String(highScore);
  }
}
