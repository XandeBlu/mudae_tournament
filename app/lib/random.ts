/**
 * Inteiro aleatório criptograficamente seguro entre 0 e max-1.
 * Usa Web Crypto API em vez de Math.random pra garantir distribuição justa.
 */
function cryptoRandom(max: number): number {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] % max;
}

/**
 * Sorteia `count` números únicos no intervalo [1, max], em ordem crescente.
 * Usa Fisher-Yates shuffle pra garantir uniformidade.
 */
export function drawUniqueNumbers(max: number, count: number): number[] {
  if (count > max) {
    throw new Error(
      `Não é possível sortear ${count} números únicos de um pool de ${max}.`,
    );
  }

  const pool = Array.from({ length: max }, (_, i) => i + 1);
  for (let i = pool.length - 1; i > 0; i--) {
    const j = cryptoRandom(i + 1);
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count).sort((a, b) => a - b);
}