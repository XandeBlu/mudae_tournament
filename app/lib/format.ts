/**
 * Formata um número como string com pelo menos `length` dígitos,
 * preenchendo com zeros à esquerda. pad(3) → "003", pad(42) → "042".
 */
export function pad(n: number, length = 3): string {
  return String(n).padStart(length, "0");
}