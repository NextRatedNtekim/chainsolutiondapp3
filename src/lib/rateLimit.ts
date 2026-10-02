// In-memory limiter: fine for development. On serverless hosting each instance has its own memory,
// so replace with a shared store before production.
const hits = new Map<string, number[]>();

export function limited(key: string, max = 5, windowMs = 10 * 60_000): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > max;
}
