export function filePathToPath(filePath: string) {
  filePath = filePath
    .replace(/\.ts?$/g, '') // remove ts, tsx extension
    .replace(/(connect|delete|get|head|options|patch|post|put|trace)$/, '') // replace method with nothing
    .replace(/(?:\.)$/, '')
    .replace(/index$/, '') // replace index with nothing
    .replace(/\/$/, '')
    .replace(/\[\.{3}.+\]/, '*') // replace [...foo] with *
    .replace(/\[(.+?)\]/g, ':$1'); // replace [foo] with :foo

  return /^\//.test(filePath) ? filePath : '/' + filePath;
}

export function filePathToMethod(filePath: string) {
  filePath = filePath.replace(/\.ts?$/g, '');
  const method = filePath.match(
    /(connect|delete|get|head|options|patch|post|put|trace)$/,
  );

  if (method) return method[1];
  return 'all';
}
