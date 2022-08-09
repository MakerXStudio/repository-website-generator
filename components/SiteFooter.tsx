import React, { ReactNode } from 'react'
import Link from 'next/link'
import { IPageMeta, sortPageMetaDescending } from '../shared/pages'
import { useRouter } from 'next/router'
import { configuration } from '../shared/configuration'

interface SiteFooterProps {
  pages: IPageMeta[]
}

const FooterLink = ({
  slug,
  name,
  selected = false,
  className,
  children,
}: {
  slug: string
  name?: string
  selected?: boolean
  className?: string
  children?: ReactNode
}) => {
  return (
    <Link href={slug}>
      <a
        className={
          selected
            ? `inline-block px-3 text-lg underline underline-offset-8 decoration-2 font-bold pointer-events-none ` + className
            : `inline-block px-3 text-lg no-underline hover:underline hover:underline-offset-8 hover:decoration-2 font-bold ` + className
        }
      >
        {name}
        {children}
      </a>
    </Link>
  )
}

export const SiteFooter = (props: SiteFooterProps) => {
  const sortedPages = sortPageMetaDescending(props.pages)
  const router = useRouter()
  const miscellaneousPageLinks = sortedPages.map((p) => ({
    slug: '/' + p.slug,
    name: p.title,
    selected: router.asPath == '/' + p.slug,
  }))

  return (
    <footer className="-mt-1 relative">
      <svg className="rotate-180" viewBox="0 0 1400 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(0, 1)" fill="#FFFFFF">
          <path
            d="M 0 0 C 90.7283 0.9275 147.9128 27.1879 291.9102 59.9119 C 387.9085 81.7279 543.6051 89.3348 759 82.7326 C 469.3361 156.2544 216.3361 153.6679 0 88"
            opacity="0.1"
          ></path>
          <path
            d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
            opacity="0.1"
          ></path>
          <path d="M 1046 51.6521 C 1140 41 1262 35 1439 79 L 1439 120 C 1271.1721 77.9435 1140.1721 55.1609 990 69 Z" opacity="0.2"></path>
        </g>
        <g transform="translate(0, 1)" fill="#FFFFFF">
          <path d="M 1 53 C 57.086 53.198 98.208 65.809 123.822 71.865 C 181.454 85.495 234.295 90.29 272.033 93.459 C 311.355 96.759 396.635 95.801 461.025 91.663 C 486.76 90.01 518.727 86.372 556.926 80.752 C 595.747 74.596 622.372 70.008 636.799 66.991 C 663.913 61.324 712.501 49.503 727.605 46.128 C 780.47 34.317 810 31 849 27 C 879 24 954 19 1012 19 C 1075 19 1092 19 1136 23 C 1198 29 1205 30 1245 35 C 1323 46 1323 50 1440.886 72.354 L 1441.191 104.352 L 1.121 104.031 L 1 60 Z"></path>
        </g>
      </svg>
      <div className="border-t pt-4 my-4">
        <div className="container mx-auto flex flex-wrap justify-end pt-2 pb-2 relative">
          <FooterLink slug={configuration.themeImageLogoLink} className="absolute left-0">
            <img className="object-scale-down w-2/3 z-50" aria-hidden="true" alt="Header image" src={router.basePath + configuration.themeImageLogo} />
          </FooterLink>
          <FooterLink slug="/attribution" name="Attribution" selected={router.asPath.startsWith('/attribution')} />
          {miscellaneousPageLinks.map((p) => (
            <FooterLink key={p.slug} {...p} />
          ))}
          <FooterLink name="Code Docs" selected={router.asPath.startsWith('/docs/')} slug="/docs/code-docs" />
          <FooterLink slug={configuration.gitHubUrl}>
            <svg x="0px" y="0px" viewBox="0 0 16 16" className="h-6 fill-gray-50 inline pr-2">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
            GitHub
          </FooterLink>
        </div>
      </div>
    </footer>
  )
}
