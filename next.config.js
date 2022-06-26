const config = require('./generator-config.json')
const package = require('./package.json')

const getSoeTags = () => {
  if (config.soeTags && config.soeTags.length > 0)
    return config.soeTags.reduce((acc, cur) => acc + ' ' + cur)
  if (package.keywords && package.keywords.length > 0)
    return package.keywords.reduce((acc, cur) => acc + ' ' + cur)
  return []
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    generatorTitle: config.title,
    generatorTitleSuperscript: config.titleSuperscript,
    generatorName: config.name ?? package.name,
    generatorDescription: config.description ?? package.description,
    generatorGitHubUrl: config.gitHubUrl ?? package.homepage,
    generatorAuthor: config.author ?? package.author,
    generatorSEOTags: getSoeTags(),
    generatorRootPath: config.rootPath,
    generatorCodeDocs: config.codeDocs ? 'yes' : 'none',
    generatorCodeDocsPath: config.codeDocs?.path,
    generatorThemeImageLogo: config.theme.imageLogo
  }
}

module.exports = nextConfig
