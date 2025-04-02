import * as fs from 'fs';
import * as path from 'path';

async function readDir(
  dir: string,
  routes: Array<string> = [],
): Promise<Array<string>> {
  const files = fs.readdirSync(dir).map((file) => ''.concat(dir, '/', file));

  for (let i = 0; i < files.length; i++) {
    const file = files[i]!;
    if (await isDir(file)) {
      await readDir(file, routes);
    } else routes.push(file);
  }
  return routes;
}

async function isDir(dirname: string): Promise<boolean> {
  if (await fs.statSync(path.join(process.cwd(), dirname)).isDirectory()) {
    return true;
  }
  return false;
}

export async function getFiles(dir: string) {
  const rgx = new RegExp(`\\b${dir}/\\b`, 'gi');

  const files = (await readDir(dir)).map((file) => file.replace(rgx, ''));

  return files;
}
