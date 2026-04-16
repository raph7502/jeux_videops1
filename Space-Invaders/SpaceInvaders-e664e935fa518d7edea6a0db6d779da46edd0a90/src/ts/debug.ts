const $debug = document.querySelector('#debug');

export function log(...data: unknown[]) {
  if (!$debug) return;
  $debug.textContent = data.map(String).join('\n');
}
