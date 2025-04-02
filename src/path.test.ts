import { beforeAll, describe, expect, it, vi } from 'vitest';
import { getFiles } from './path';
import * as fs from 'fs';

describe('path reading', () => {
  beforeAll(() => {
    vi.mock('fs');

    (fs.readdirSync as any).mockImplementation((dir: string) => {
      if (dir === 'testDir') return ['file1.txt', 'file2.js', 'subdir'];
      if (dir === 'testDir/subdir') return ['file3.txt'];
      return [];
    });

    (fs.statSync as any).mockImplementation((filePath: string) => {
      return {
        isDirectory: () => filePath.endsWith('testDir/subdir'),
      };
    });
  });
  it('Should return a correct path', async () => {
    const input = await getFiles('testDir');
    const expected = ['file1.txt', 'file2.js', 'subdir/file3.txt'];
    expect(input).toEqual(expected);
  });
});
