import matter from 'gray-matter'
import { extractPageMeta, IPageMeta } from '../pages'
import { getMarkdownFileNames, readFile } from './utilities'
import { configuration } from '../configuration'

export const readPageFile = (fileName: string, path: string = '../'): Buffer => readFile(path, fileName)

export const getMarkdownPageMarkdownFileName = async (): Promise<string[]> => {
  return await getMarkdownFileNames(configuration.markdownPagesPath)
}

export const getMarkdownPageMetaData = async (): Promise<IPageMeta[]> => {
  const postFileNames = await getMarkdownPageMarkdownFileName()

  return postFileNames.map((fileName: string) => {
    const { data } = matter(readPageFile(fileName))
    return extractPageMeta(data)
  })
}
