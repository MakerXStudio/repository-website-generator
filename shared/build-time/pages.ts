import matter from 'gray-matter'
import { extractPageMeta, IPageMeta } from '../pages'
import { getMarkdownFileNames, readFile } from './utilities'

export const readPageFile = (fileName: string, path: string = '../'): Buffer => readFile(path, fileName)

export const getMarkdownPageMarkdownFileName = async (): Promise<string[]> => {
  return (await getMarkdownFileNames('../')).filter((f) => f !== 'index.md')
}

export const getMarkdownPageMetaData = async (): Promise<IPageMeta[]> => {
  const postFileNames = await getMarkdownPageMarkdownFileName()

  return postFileNames.map((fileName: string) => {
    const { data } = matter(readPageFile(fileName))
    return extractPageMeta(data)
  })
}
