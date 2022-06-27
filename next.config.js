const configJson = require('./generator-config.json')
const packageJson = require('./package.json')

const getSoeTags = () => {
  if (configJson.soeTags && configJson.soeTags.length > 0) return configJson.soeTags.reduce((acc, cur) => acc + ' ' + cur)
  if (packageJson.keywords && packageJson.keywords.length > 0) return packageJson.keywords.reduce((acc, cur) => acc + ' ' + cur)
  return []
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: process.env.CI ? "/" + packageJson.name : null,
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
    genCodeDocsPath: configJson.codeDocs?.path,
    genMarkdownPages: configJson.miscellaneousPages ? 'yes' : 'none',
    genMarkdownPagesPath: configJson.codeDocs?.path,
    genThemeImageLogo: configJson.theme.imageLogo,
  },
}

module.exports = nextConfig
