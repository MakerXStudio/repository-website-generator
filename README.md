# Repository Website Generator (repository-website-generator)

> Generates a Next.js static website by converting markdown to html

[![npm package][npm-img]][npm-url]
[![Build Status][build-img]][build-url]
[![Downloads][downloads-img]][downloads-url]
[![Issues][issues-img]][issues-url]
[![Semantic Release][semantic-release-img]][semantic-release-url]

## Install

```bash
npm install @makerx/repository-website-generator --save-dev
```

## Usage

The repository website can be generated by running the following command

```bash
 npx repository-website-generator
```

Tip: _Make it more discoverable add it to the package.json scripts collection_

```text
"scripts": {
  "generate-website": "npx repository-website-generator"
}
```

## Testing

An easy way of testing the generated website is to use the [http-server](https://www.npmjs.com/package/http-server) NPM package.

Install http-server

```bash
npm install --save-dev http-server
```

Add the following script to the package.json file

```text
"scripts": {
  "serve-generated-website": "http-server -c-1 ./out"
}
```

Then build and launch the website

```bash
npx repository-website-generator && npm run serve-generated-website
```

## Miscellaneous Pages

Miscellaneous pages can be enabled by setting the following configuration option.

```text
  "miscellaneousPages": {
    "path": "/public-pages"
  },
```

Any markdown pages added to the `/public-pages` directory will be included in the build.

A miscellaneous markdown page has a special format to allow page related configuration settings. The format is:

```text
---
title: Test Page
slug: test-page
menuIndex: 1
---

## A sub-title
```

The title property is to set the page title when showing the page.

The slug controls the link to the page. The links for miscellaneous pages are rooted. For this example, in the page above, the link would be `http://localhost:3000/test-page`.

The menuIndex is an optional property. Setting it allows for the control of the miscellaneous page link position.

## Code Docs

Currently, only code docs generated by [typedoc](https://typedoc.org/) are supported.

To add typedoc to a solution the follow steps can be taken.

Enable code doc support in website-generator.json file

```text
  "codeDocs": {
    "path": "/code-docs"
  },
```

Install the packages:

```bash
npm install typedoc, typedoc-plugin-markdown --save-dev
```

Then add a script entry:

```text
"scripts": {
  "generate-doc": "typedoc",
}
```

And lastly, add the typedoc.json configuration file:

```json
{
  "entryPoints": ["pages/", "shared/", "components/"],
  "entryPointStrategy": "expand",
  "out": "code-docs",
  "plugin": ["typedoc-plugin-markdown"],
  "theme": "default",
  "cleanOutputDir": true,
  "githubPages": false,
  "readme": "none",
  "entryDocument": "code-docs.md",
  "publicPath": "/"
}
```

_Note: the out path for the doc generator must match the `codeDocs` path defined in the generator configuration._

## Configuration options

The configuration file is a json file named `website-generator.json`, and must be placed at the same level as the package.json file.

### Starting configuration file

```json
{
  "outPath": "/out",
  "rootPath": null,
  "readmeFileName": null,
  "title": "My Package name",
  "titleSuperscript": "Proudly built and maintained by [MakerX](https://makerx.com.au)",
  "author": null,
  "name": null,
  "description": null,
  "gitHubUrl": null,
  "soeTags": null,
  "assetsPath": null,
  "miscellaneousPages": null,
  "codeDocs": null,
  "theme": {
    "iconLogo": "/theme/makerx-icon.png",
    "imageLogo": "/theme/makerx-logo.png",
    "imageLogoLink": "https://makerx.com.au"
  },
  "attribution": []
}
```

### Example configuration file

```json
{
  "outPath": "/out",
  "rootPath": null,
  "readmeFileName": null,
  "title": "TS Type Helpers",
  "titleSuperscript": "Proudly built and maintained by [MakerX](https://makerx.com.au)",
  "author": null,
  "name": null,
  "description": null,
  "gitHubUrl": null,
  "soeTags": null,
  "assetsPath": "/public-assets",
  "miscellaneousPages": {
    "path": "/public-pages"
  },
  "codeDocs": {
    "path": "/code-docs"
  },
  "theme": {
    "iconLogo": "/theme/makerx-icon.png",
    "imageLogo": "/theme/makerx-logo.png",
    "imageLogoLink": "https://makerx.com.au"
  },
  "attribution": [
    {
      "group": "Referenced packages",
      "title": "react",
      "description": "React is a JavaScript library for creating user interfaces.",
      "license": "MIT",
      "link": "github.com/facebook/react"
    },
    {
      "group": "Referenced packages",
      "title": "react-dropzone",
      "description": "Simple React hook to create a HTML5-compliant drag'n'drop zone for files.",
      "license": "MIT",
      "link": "https://github.com/react-dropzone/react-dropzone"
    }
  ]
}
```

### outPath (Required)

Where the built site will be copied to.

### rootPath (Optional)

The root path for the reference repository.

Note: _By default the root path value defaults to `/`_

### readmeFileName (Optional)

The name of the main markdown file that will become in the index content.

Note: _By default the readme file name value is `README.md`_

### title (Required)

The title of the repository website.

### titleSuperscript (Required)

The superscript that is rendered with the title.

### author (Optional)

The author of the package.

Note: _By default the author is referenced from the package.json field `author`_

### name (Optional)

The name of the package.

Note: _By default the author is referenced from the package.json field `name`_

### description (Optional)

The description of the package.

Note: _By default the author is referenced from the package.json field `description`_

### gitHubUrl (Optional)

The GitHub URL link.

Note: _By default the author is referenced from the package.json field `description`_

### soeTags (Optional)

The description of the package.

Note: _By default the author is referenced from the package.json field `repository.url`_

### assetsPath (Optional)

A directory containing assets.

### miscellaneousPages (Optional)

The folder containing the miscellaneous markdown files.

See adding [miscellaneous pages](#miscellaneous-pages)

### codeDocs (Optional)

The folder containing the code doc markdown files.

See adding [code docs](#code-docs)

### theme (Required)

Theme is an object with the following properties.

#### theme.iconLogo (Required)

The icon logo is shown on the index page next to the H1 title.

#### theme.imageLogo (Required)

The image logo is shown on all pages in the footer.

#### theme.imageLogoLink (Required)

The link for the image logo.

### Attribution

Is the collection holding additional attribution references which are shown on the attribution page.

The following properties are available per attribution reference

#### attribution[].group (optional)

An optional group name. All references of the same group are shown together. The group name is shown once.

#### attribution[].title (required)

The title of the reference.

#### attribution[].license (required)

The license of the reference.

#### attribution[].description (optional)

An optional description of the reference.

#### attribution[].link (optional)

An optional link to the reference.

[build-img]:https://github.com/MakerXStudio/repository-website-generator/actions/workflows/release.yml/badge.svg
[build-url]:https://github.com/MakerXStudio/repository-website-generator/actions/workflows/release.yml
[downloads-img]:https://img.shields.io/npm/dt/@MakerXStudio/repository-website-generator
[downloads-url]:https://www.npmtrends.com/@makerx/repository-website-generator
[npm-img]:https://img.shields.io/npm/v/@makerx/repository-website-generator
[npm-url]:https://www.npmjs.com/package/@makerx/repository-website-generator
[issues-img]:https://img.shields.io/github/issues/MakerXStudio/repository-website-generator
[issues-url]:https://github.com/MakerXStudio/repository-website-generator/issues
[semantic-release-img]:https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svgs
[semantic-release-url]:https://github.com/semantic-release/semantic-release
