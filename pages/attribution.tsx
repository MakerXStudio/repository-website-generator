import React from 'react'
import { GetStaticProps } from 'next'
import { IPageMeta } from '../shared/pages'
import { getMiscellaneousPageMetaData, readPageFile } from '../shared/build-time/pages'
import { Page } from '../components/Page'
import matter from 'gray-matter'
import { configuration } from '../shared/configuration'

type Reference = { group?: string; title: string; license: string; description?: string; link?: string }

interface AttributionPageProps {
  pages: IPageMeta[]
  references: Reference[]
}

const AttributionPage = (props: AttributionPageProps) => {
  const titleProps = {
    title: 'Attribution',
    titleSuperscript: configuration.titleSuperscript,
    titleSubscript: configuration.description,
    image: configuration.themeImageLogo,
  }
  const references: Reference[] = [
    ...props.references,
    {
      group: 'Website Template',
      title: 'Template',
      description: 'This website is based on the Tailwind Toolbox - Landing Page Template.',
      license: 'MIT',
      link: 'https://github.com/tailwindtoolbox/Landing-Page',
    },
    {
      group: 'Website Template',
      title: 'GitHub icon',
      description: 'The GitHub icon was sourced from SVG Repo.',
      license: 'MIT',
      link: 'https://www.svgrepo.com/svg/344880/github',
    },
    {
      group: 'Website Template',
      title: 'Package icon',
      description: 'The Package icon was sourced from SVG Repo.',
      license: 'CC0 License',
      link: 'https://www.svgrepo.com/svg/56030/package',
    },
  ].sort((a, b) => {
    if (!a.group) return 1
    if (!b.group) return -1
    return a.group.localeCompare(b.group)
  })

  const groupTracker = new Set<string>()

  const shouldRenderGroup = (group?: string): boolean => {
    if (!group || groupTracker.has(group)) return false
    groupTracker.add(group)
    return true
  }

  return (
    <Page pages={props.pages} {...titleProps}>
      <div className="border-b py-8 bg-white">
        <div className="container mx-auto flex flex-wrap pt-4 pb-12 text-gray-800">
          {references.map((r, i) => (
            <>
              {shouldRenderGroup(r.group) && (
                <h2 className="text-3xl w-full border-b font-bold leading-none pb-4 mb-4">{r.group}</h2>
              )}
              <section className="w-full mb-8 ml-4" key={i}>
                <h3 className="text-2xl font-bold leading-none mb-3">{r.title}</h3>
                {r.description && <p>{r.description}</p>}
                {r.link && (
                  <aside>
                    <a
                      href={r.link}
                      className="inline-block mx-auto hover:underline bg-gray-200 border-gray-800 text-gray-800 font-bold rounded-xl mt-2 py-1 px-8 shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
                    >
                      View
                    </a>
                  </aside>
                )}
              </section>
            </>
          ))}
        </div>
      </div>
    </Page>
  )
}

export default AttributionPage

export const getStaticProps: GetStaticProps = async (): Promise<{ props: AttributionPageProps }> => {
  const pages = configuration.miscellaneousPages ? await getMiscellaneousPageMetaData() : []

  return {
    props: { pages, references: [] },
  }
}
