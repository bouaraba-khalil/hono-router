export function filePathToPath(filePath: string) {
  filePath = filePath
    .replace(/\.ts?$/g, '') // remove ts, tsx extension
    .replace(/(delete|get|options|patch|post|put)$/, '') // replace method with nothing
    .replace(/(?:\.)$/, '')
    .replace(/index$/, '') // replace index with nothing
    .replace(/\/$/, '')
    .replace(/\[\.{3}.+\]/, '*') // replace [...foo] with *
    .replace(/\[(.+?)\]/g, ':$1'); // replace [foo] with :foo

  return /^\//.test(filePath) ? filePath : '/' + filePath;
}

type path = 'delete' | 'get' | 'options' | 'patch' | 'post' | 'put' | 'all';

export function filePathToMethod(filePath: string) {
  filePath = filePath.replace(/\.ts?$/g, '');
  const method = filePath.match(/(delete|get|options|patch|post|put)$/);

  if (method) return method[1] as path;
  return 'all' as path;
}
