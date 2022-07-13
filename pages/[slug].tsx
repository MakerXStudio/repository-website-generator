import React from 'react'
import matter from 'gray-matter'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { extractPageMeta, IPageMeta } from '../shared/pages'
import { getMiscellaneousPageFileNames, getMiscellaneousPageMetaData, readPageFile } from '../shared/build-time/pages'
import { Page } from '../components/Page'
import { Markdown } from '../components/Markdown'
import { configuration } from '../shared/configuration'

interface MarkdownPageProps {
  pageMeta: IPageMeta
  markdown: string
  pages: IPageMeta[]
}

const MarkdownPage = (props: MarkdownPageProps) => {
  return (
    <Page pages={props.pages} title={props.pageMeta.title}>
      <div className="border-b py-8 bg-white">
        <div className="container mx-auto flex flex-wrap pt-4 pb-12">
          <Markdown>{props.markdown}</Markdown>
        </div>
      </div>
    </Page>
  )
}

export default MarkdownPage

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext): Promise<{ props: MarkdownPageProps }> => {
  const slug = context.params!.slug
  const { data, content } = matter(readPageFile(`${slug}.md`, configuration.miscellaneousPagesPath))
  const blogMeta = extractPageMeta(data)
  const pages = await getMiscellaneousPageMetaData()

  return {
    props: {
      pageMeta: blogMeta,
      markdown: content,
      pages,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async (): Promise<{
  paths: Array<string | { params: { slug: string } }>
  fallback: boolean
}> => {
  if (!configuration.miscellaneousPages) {
    return { paths: [], fallback: false }
  }

  const markdownFileNames = await getMiscellaneousPageFileNames()
  const markdownFileNamesWithoutExtensions = markdownFileNames.map((fileName) => fileName.replace('.md', ''))

  return {
    paths: markdownFileNamesWithoutExtensions.map((slug) => {
      return {
        params: {
          slug: slug,
        },
      }
    }),
    fallback: false,
  }
}
