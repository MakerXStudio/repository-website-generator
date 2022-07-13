import React from 'react'
import matter from 'gray-matter'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { IPageMeta } from '../../shared/pages'
import { getMiscellaneousPageMetaData } from '../../shared/build-time/pages'
import { Page } from '../../components/Page'
import { configuration } from '../../shared/configuration'
import { asyncGeneratorToArray, getFilesRecursive, readFile } from '../../shared/build-time/utilities'
import { uriTransformer } from 'react-markdown'
import { Markdown } from '../../components/Markdown'
import { useRouter } from 'next/router'

interface CodeDocPageProps {
  markdown: string
  title: string
  pages: IPageMeta[]
}

const DocPage = (props: CodeDocPageProps) => {
  const router = useRouter()
  const transformLinkUriHandler = (uri: string) => {
    if (uri.endsWith('.md') || uri.includes('.md#')) {
      if (uri.startsWith('/')) {
        uri = uri.substring(1)
      }
      return router.basePath + '/docs/' + uri.replace('.md', '').replaceAll('.', '~~').replaceAll('/', '~')
    }

    return uriTransformer(uri)
  }

  return (
    <Page pages={props.pages} title={props.title}>
      <div className="border-b py-8 bg-white">
        <div className="container mx-auto flex flex-wrap pt-4 pb-12">
          <Markdown transformLinkUri={transformLinkUriHandler}>{props.markdown}</Markdown>
        </div>
      </div>
    </Page>
  )
}

export default DocPage

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext): Promise<{ props: CodeDocPageProps }> => {
  const slug: string = context.params!.slug as string

  let file = slug.replaceAll('~~', '.').replaceAll('~', '/') + '.md'

  let { content } = matter(readFile(configuration.codeDocsPath, file))
  const pages = await getMiscellaneousPageMetaData()

  const titleRegex = /^#\s(?<title>.+)\S{1,2}/gim
  let title = ''
  content = content.trimStart()

  if (titleRegex.test(content)) {
    title = (content.match(titleRegex) ?? [''])[0]
    content = content.replace(titleRegex, '')
  }

  return {
    props: {
      markdown: content,
      title,
      pages,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async (): Promise<{
  paths: Array<string | { params: { slug: string } }>
  fallback: boolean
}> => {
  if (!configuration.codeDocs) {
    return { paths: [], fallback: false }
  }

  let docFiles = (await asyncGeneratorToArray(await getFilesRecursive(configuration.codeDocsPath, true)))
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      // fix windows paths
      return (
        f
          .replaceAll('\\', '/')
          // remove code docs path
          .replace(configuration.codeDocsPath, '')
          // remove leading slash
          .substring(1)
          // make dots nextjs friendly
          .replaceAll('.', '~~')
          // made slashes url friendly
          .replaceAll('/', '~')
      )
    })

  const docFileNamesWithExtensions = docFiles.map((fileName) => fileName.replace('~~md', ''))

  return {
    paths: docFileNamesWithExtensions.map((slug) => {
      return {
        params: {
          slug: slug,
        },
      }
    }),
    fallback: false,
  }
}
