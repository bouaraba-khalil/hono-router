import type { Context } from 'hono';

export default function get(c: Context) {
  return c.json({ test: 'ok' });
}
