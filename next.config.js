const path = require('path')
const fs = require('fs')

const parentDirectoryName = path.basename(path.join(__dirname, '../'))

let configJson = {}
let packageJson = {}

if (parentDirectoryName !== '@makerx') {
  configJson = require('./website-generator.json')
  packageJson = require('./package.json')
} else {
  if (!fs.existsSync('./website-generator-repo.json') || !fs.existsSync('./package-repo.json'))  {
    throw new Error('Building using the package version must be run via `npx run-generator`')
  }
  configJson = require('./website-generator-repo.json')
  packageJson = require('./package-repo.json')

  configJson.readmeFileName = 'readme-repo.md'
}

const getSoeTags = () => {
  if (configJson.soeTags && configJson.soeTags.length > 0) return configJson.soeTags.reduce((acc, cur) => acc + ' ' + cur)
  if (packageJson.keywords && packageJson.keywords.length > 0) return packageJson.keywords.reduce((acc, cur) => acc + ' ' + cur)
  return []
}

const getBasePath = () => {
  if (process.env.CI) {
    return process.env.GITHUB_REPOSITORY.includes('/')
      ? process.env.GITHUB_REPOSITORY.substring(process.env.GITHUB_REPOSITORY.indexOf('/'))
      : '/' + process.env.GITHUB_REPOSITORY
  }

  return null
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: getBasePath(),
  // Nothing fancy can be done here because of webpack
  env: {
    getReadmeFileName: configJson.readmeFileName,
    genTitle: configJson.title,
    genTitleSuperscript: configJson.titleSuperscript,
    genName: configJson.name ?? packageJson.name,
    genDescription: configJson.description ?? packageJson.description,
    genGitHubUrl: configJson.gitHubUrl ?? packageJson.homepage,
    genAuthor: configJson.author ?? packageJson.author,
    genSEOTags: getSoeTags(),
    genRootPath: configJson.rootPath,
    genCodeDocs: configJson.codeDocs ? 'yes' : 'none',
    genMarkdownPages: configJson.markdownPages ? 'yes' : 'none',
    genThemeImageLogo: configJson.theme.imageLogo,
  },
}

module.exports = nextConfig
