const path = require('path')
const fs = require('fs')

let configJson = {}
let packageJson = {}

if (fs.existsSync('./website-generator-repo.json')) {
  const clientConfigJson = require('./website-generator-repo.json')
  configJson = require('./website-generator.json')
  configJson = {
    ...clientConfigJson,
    // override user configurable paths for build
    outPath: configJson.outPath,
    miscellaneousPages: clientConfigJson.miscellaneousPages ? configJson.miscellaneousPages : null,
    codeDocs: clientConfigJson.codeDocs ? configJson.codeDocs : null,
  }
  packageJson = require('./package-repo.json')
} else {
  configJson = require('./website-generator.json')
  packageJson = require('./package.json')
}

const getSoeTags = () => {
  if (configJson.soeTags && configJson.soeTags.length > 0) return configJson.soeTags.reduce((acc, cur) => acc + ' ' + cur)
  if (packageJson.keywords && packageJson.keywords.length > 0) return packageJson.keywords.reduce((acc, cur) => acc + ' ' + cur)
  return []
}

const getAttribution = () => {
  return JSON.stringify(configJson.attribution ? configJson.attribution : [])
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
    genMiscellaneousPages: configJson.miscellaneousPages ? 'yes' : 'none',
    genThemeIconLogo: configJson.theme.iconLogo,
    genThemeImageLogo: configJson.theme.imageLogo,
    genThemeImageLogoLink:  configJson.theme.imageLogoLink,
    genAttribution: getAttribution()
  },
}

module.exports = nextConfig
