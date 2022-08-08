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

An easy way of testing the generated website is to use the [http-server]() NPM package.

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

###

## Configuration options

### Starting configuration file

```text
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
  "miscellaneousPages": null,
  "codeDocs": null,
  "theme": {
    "imageLogo": "/theme/makerx-icon.png"
  },
  "attribution": []
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

### miscellaneousPages (Optional)

The folder containing the miscellaneous markdown files.

See adding [miscellaneous pages](#miscellaneous-pages)

### codeDocs (Optional)

The folder containing the code doc markdown files.

See adding [code docs](#code-docs)

### theme (Optional)

## Miscellaneous Pages

## Code Docs

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
