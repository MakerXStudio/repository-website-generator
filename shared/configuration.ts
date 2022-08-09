export const configuration = {
  title: process.env.genTitle ?? '',
  titleSuperscript: process.env.genTitleSuperscript ?? '',
  name: process.env.genName ?? '',
  description: process.env.genDescription ?? '',
  gitHubUrl: process.env.genGitHubUrl ?? '',
  author: process.env.genAuthor ?? '',
  SEOTags: process.env.genSEOTags ?? '',
  rootPath: process.env.genRootPath ?? '/',
  readmeFileName: process.env.genreadmeFileName ?? 'README.md',
  codeDocs: process.env.genCodeDocs !== 'none',
  codeDocsPath: '/code-docs',
  miscellaneousPages: process.env.genMiscellaneousPages !== 'none',
  miscellaneousPagesPath: '/public-site',
  themeIconLogo: process.env.genThemeIconLogo ?? '',
  themeImageLogo: process.env.genThemeImageLogo ?? '',
  themeImageLogoLink: process.env.genThemeImageLogoLink ?? '',
  attribution: JSON.parse(process.env.genAttribution ?? '[]')
}
