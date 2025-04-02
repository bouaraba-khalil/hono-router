import { Hono } from 'hono';
import { getFiles } from './path';
import { filePathToMethod, filePathToPath } from './file';
import { join } from 'path';

export default async function loadRoute(dir: string = 'src/router') {
  const router = new Hono();

  const files = await getFiles(dir);

  for (let i = 0; i < files.length; i++) {
    const file = files[i]!;
    const modulePath = join(process.cwd(), dir, file);
    const module = await import(modulePath);
    const method = filePathToMethod(file);
    const path = filePathToPath(file);
    if (typeof module.default === 'function') {
      router[method](path, module.default);
    } else if (Array.isArray(module.default)) {
      router[method](path, ...module.default);
    } else {
      console.log({
        message: 'An error happened when registering this file',
        file,
        module,
        method,
        path,
      });
    }
  }

  return router;
}
