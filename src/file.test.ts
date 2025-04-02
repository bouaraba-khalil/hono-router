import { describe, expect, it } from 'vitest';
import { filePathToPath, filePathToMethod } from './file';

const testCases = [
  { input: 'index.ts', route: '/', method: 'all' },
  { input: 'index.get.ts', route: '/', method: 'get' },
  { input: 'index.put.ts', route: '/', method: 'put' },
  { input: 'about.ts', route: '/about', method: 'all' },
  { input: 'about/index.ts', route: '/about', method: 'all' },
  { input: 'about/index.post.ts', route: '/about', method: 'post' },
  { input: 'about/index.put.ts', route: '/about', method: 'put' },
  { input: 'about/me', route: '/about/me', method: 'all' },
  { input: 'about/me/index.ts', route: '/about/me', method: 'all' },
  { input: 'about/me/index.post.ts', route: '/about/me', method: 'post' },
  { input: 'about/me/index.put.ts', route: '/about/me', method: 'put' },
  {
    input: 'about/me/address.ts',
    route: '/about/me/address',
    method: 'all',
  },
  {
    input: 'about/me/address.delete.ts',
    route: '/about/me/address',
    method: 'delete',
  },

  { input: '/index.ts', route: '/', method: 'all' },
  { input: '/index.get.ts', route: '/', method: 'get' },
  { input: '/index.put.ts', route: '/', method: 'put' },
  { input: '/about.ts', route: '/about', method: 'all' },
  { input: '/about/index.ts', route: '/about', method: 'all' },
  { input: '/about/index.head.ts', route: '/about', method: 'head' },
  { input: '/about/me', route: '/about/me', method: 'all' },
  { input: '/about/me/index.ts', route: '/about/me', method: 'all' },
  {
    input: '/about/me/index.options.ts',
    route: '/about/me',
    method: 'options',
  },
  {
    input: '/about/me/address.ts',
    route: '/about/me/address',
    method: 'all',
  },
  {
    input: '/about/me/address.patch.ts',
    route: '/about/me/address',
    method: 'patch',
  },

  { input: '/about/[name].ts', route: '/about/:name', method: 'all' },
  { input: '/about/[name].post.ts', route: '/about/:name', method: 'post' },
  { input: '/about/[name].put.ts', route: '/about/:name', method: 'put' },
  { input: '/about/[...foo].ts', route: '/about/*', method: 'all' },
  {
    input: '/about/[...foo].delete.ts',
    route: '/about/*',
    method: 'delete',
  },
  {
    input: '/about/[...foo]/index.delete.ts',
    route: '/about/*',
    method: 'delete',
  },
  {
    input: '/about/[name]/address.ts',
    route: '/about/:name/address',
    method: 'all',
  },
  {
    input: '/about/[name]/address.put.ts',
    route: '/about/:name/address',
    method: 'put',
  },
  {
    input: '/about/[arg1]/[arg2]',
    route: '/about/:arg1/:arg2',
    method: 'all',
  },
  {
    input: '/about/[arg1]/[arg2].patch.ts',
    route: '/about/:arg1/:arg2',
    method: 'patch',
  },
];

describe('files', () => {
  it('Should return a correct path', () => {
    testCases.forEach((value) => {
      expect(filePathToPath(value.input)).toBe(value.route);
    });
  });

  it('Should return a correct method', () => {
    testCases.forEach((value) => {
      expect(filePathToMethod(value.input)).toBe(value.method);
    });
  });
});
