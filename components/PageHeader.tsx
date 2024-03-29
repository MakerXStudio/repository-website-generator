import React from 'react'
import { If } from './If'
import ReactMarkdown from 'react-markdown'
import { useRouter } from 'next/router'

export interface PageHeaderProps {
  title: string
  titleSubscript?: string
  titleSuperscript?: string
  imageLogo?: string
}

export const PageHeader = ({ titleSuperscript, titleSubscript, imageLogo, title }: PageHeaderProps) => {
  const router = useRouter()
  const hasImage = Boolean(imageLogo)
  return (
    <>
      <header className="pt-24">
        <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div
            className={`flex flex-col w-full ${
              hasImage ? 'md:w-2/5' : 'md:w-full pb-10'
            } justify-center items-start text-center md:text-left`}
          >
            <If condition={Boolean(titleSuperscript)}>
              <ReactMarkdown className="uppercase tracking-loose w-full">{titleSuperscript!}</ReactMarkdown>
            </If>
            <h1 className="my-4 text-5xl font-bold leading-tight">{title}</h1>
            <If condition={Boolean(titleSubscript)}>
              <ReactMarkdown className="leading-normal text-2xl mb-8">{titleSubscript!}</ReactMarkdown>
            </If>
          </div>
          <If condition={hasImage}>
            <div className="w-full h-3/5 w-4/5 sm:w-4/5 md:w-3/5 lg:w-2/5 py-10 px-32 md:px-26 text-center">
              <img className="object-scale-down z-50" aria-hidden="true" alt="Header image" src={router.basePath + imageLogo} />
            </div>
          </If>
        </div>
      </header>
      <div className="relative -mt-12 lg:-mt-24">
        <svg viewBox="0 0 1400 175" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(0, 45)" fill="#FFFFFF">
            <path
              d="M 0 0 C 90.7283 0.9275 147.9128 27.1879 291.9102 59.9119 C 387.9085 81.7279 543.6051 89.3348 759 82.7326 C 469.3361 156.2544 216.3361 153.6679 0 88"
              opacity="0.1"
            ></path>
            <path
              d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
              opacity="0.1"
            ></path>
            <path
              d="M 1046 51.6521 C 1140 41 1262 35 1439 79 L 1439 120 C 1271.1721 77.9435 1140.1721 55.1609 990 69 Z"
              opacity="0.2"
            ></path>
          </g>
          <g transform="translate(-4, 76)" fill="#FFFFFF">
            <path d="M 1 53 C 57.086 53.198 98.208 65.809 123.822 71.865 C 181.454 85.495 234.295 90.29 272.033 93.459 C 311.355 96.759 396.635 95.801 461.025 91.663 C 486.76 90.01 518.727 86.372 556.926 80.752 C 595.747 74.596 622.372 70.008 636.799 66.991 C 663.913 61.324 712.501 49.503 727.605 46.128 C 780.47 34.317 810 31 849 27 C 879 24 954 19 1012 19 C 1075 19 1092 19 1136 23 C 1198 29 1205 30 1245 35 C 1323 46 1323 50 1440.886 72.354 L 1441.191 104.352 L 1.121 104.031 L 1 60 Z"></path>
          </g>
        </svg>
      </div>
    </>
  )
}
