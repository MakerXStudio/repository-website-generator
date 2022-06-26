import { readdir, readFileSync } from 'fs-extra'
import path from 'path'

export async function asyncGeneratorToArray<T>(asyncIterator: AsyncGenerator<T>): Promise<T[]> {
  const result = []
  for await (const i of asyncIterator) result.push(i)
  return result
}

export async function* getFilesRecursive(dirPath: string, isRelative = true): AsyncGenerator<string> {
  let absolutePath = dirPath
  if (isRelative) {
    absolutePath = path.join(process.cwd(), dirPath)
  }
  const dirents = await readdir(absolutePath, { withFileTypes: true })
  for (const dirent of dirents) {
    const res = path.join(dirPath, dirent.name)
    if (dirent.isDirectory()) {
      yield* getFilesRecursive(res)
    } else {
      yield res
    }
  }
}

export const getMarkdownFileNames = async (relativePath: string): Promise<string[]> => {
  return (await readdir(path.join(process.cwd(), relativePath))).filter((fn: string) => fn.endsWith('.md'))
}

export function readFile(relativePath: string, fileName: string): Buffer {
  return readFileSync(path.join(process.cwd(), relativePath, fileName))
}
