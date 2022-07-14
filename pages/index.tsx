import React from 'react'
import { GetStaticProps } from 'next'
import { IPageMeta } from '../shared/pages'
import { getMiscellaneousPageMetaData, readPageFile } from '../shared/build-time/pages'
import { Page } from '../components/Page'
import matter from 'gray-matter'
import { Markdown } from '../components/Markdown'
import { configuration } from '../shared/configuration'

interface IIndexProps {
  pages: IPageMeta[]
  markdown: string
}

const IndexPage = (props: IIndexProps) => {
  const titleProps = {
    title: configuration.title,
    titleSuperscript: configuration.titleSuperscript,
    titleSubscript: configuration.description,
    image: configuration.themeImageLogo,
  }
  return (
    <Page pages={props.pages} {...titleProps}>
      <div className="border-b py-8 bg-white">
        <div className="container mx-auto flex flex-wrap pt-4 pb-12">
          <Markdown>{props.markdown}</Markdown>
        </div>
      </div>
    </Page>
  )
}

export default IndexPage

export const getStaticProps: GetStaticProps = async (): Promise<{ props: IIndexProps }> => {
  const pages = configuration.miscellaneousPages ? await getMiscellaneousPageMetaData() : []

  let { content } = matter(readPageFile(configuration.readmeFileName, configuration.rootPath))
  // Remove readme.md title
  content = content.substring(content.indexOf('[!['))

  return {
    props: { pages, markdown: content },
  }
}
