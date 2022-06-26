import React from 'react'
import matter from 'gray-matter'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { extractPageMeta, IPageMeta } from '../shared/pages'
import { getMarkdownPageMarkdownFileName, getMarkdownPageMetaData, readPageFile } from '../shared/build-time/pages'
import { Page } from '../components/Page'
import { Markdown } from '../components/Markdown'

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
  const { data, content } = matter(readPageFile(`${slug}.md`))
  const blogMeta = extractPageMeta(data)
  const pages = await getMarkdownPageMetaData()

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
  const markdownFileNames = await getMarkdownPageMarkdownFileName()
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
