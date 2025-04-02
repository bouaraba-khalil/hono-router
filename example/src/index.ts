import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import loadRoute from '../../src/index.js';

const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

const routes = await loadRoute('src/router');
app.route('', routes);

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
