import matter from 'gray-matter'
import { extractPageMeta, IPageMeta } from '../pages'
import { getMarkdownFileNames, readFile } from './utilities'
import { configuration } from '../configuration'

export const readPageFile = (fileName: string, path: string = '../'): Buffer => readFile(path, fileName)

export const getMiscellaneousPageFileNames = async (): Promise<string[]> => {
  return await getMarkdownFileNames(configuration.miscellaneousPagesPath)
}

export const getMiscellaneousPageMetaData = async (): Promise<IPageMeta[]> => {
  const postFileNames = await getMiscellaneousPageFileNames()

  return postFileNames.map((fileName: string) => {
    const { data } = matter(readPageFile(fileName, configuration.miscellaneousPagesPath))
    return extractPageMeta(data)
  })
}
