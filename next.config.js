const path = require('path')
const fs = require('fs')

const parentDirectoryName = path.basename(path.join(__dirname, '../'))

let configJson = {}
let packageJson = {}
let pathPrefix = ''

if (parentDirectoryName !== '@makerx') {
  configJson = require('./website-generator.json')
  packageJson = require('./package.json')
} else {
  pathPrefix = './../../../'

  if (!fs.existsSync(pathPrefix + 'website-generator.json')) {
    fs.copyFileSync('./website-generator.json', pathPrefix + 'website-generator.json')
    console.warn('Website generator configuration file missing. A sample configuration file has been created. Please edit and rebuild')
    process.exit(1)
  }

  if (!fs.existsSync(pathPrefix + 'package.json')) {
    console.error('The package.json file could not be found.')
    process.exit(1)
  }

  configJson = require(pathPrefix + 'website-generator.json')
  packageJson = require(pathPrefix + 'package.json')
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
    genCodeDocsPath: pathPrefix + configJson.codeDocs?.path,
    genMarkdownPages: configJson.miscellaneousPages ? 'yes' : 'none',
    genMarkdownPagesPath: pathPrefix + configJson.miscellaneousPages?.path,
    genThemeImageLogo: configJson.theme.imageLogo,
  },
}

module.exports = nextConfig
