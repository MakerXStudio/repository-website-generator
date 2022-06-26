      export const configuration = {
        title: process.env.generatorTitle ?? '',
        titleSuperscript: process.env.generatorTitleSuperscript ?? '',
        name: process.env.generatorName ?? '',
        description: process.env.generatorDescription ?? '',
        gitHubUrl: process.env.generatorGitHubUrl ?? '',
        author: process.env.generatorAuthor ?? '',
        SEOTags: process.env.generatorSEOTags ?? '',
        rootPath: process.env.generatorRootPath ?? '',
        codeDocs: process.env.generatorCodeDocs !== 'none',
        codeDocsPath: process.env.generatorCodeDocsPath ?? '',
        themeImageLogo: process.env.generatorThemeImageLogo ?? '',
      }

