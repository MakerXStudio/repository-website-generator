#!/usr/bin/env node

const path = require('path')
const fs = require('fs')
const fse = require('fs-extra')

const parentDirectoryName = path.basename(path.join(__dirname, '../'))

if (parentDirectoryName !== '@makerx') {

  let pathPrefix = './../../../'
  const webGenConfigFilePath = path.join(pathPrefix, 'website-generator.json')
  const packageConfigFilePath = path.join(pathPrefix, 'website-generator.json')

  if (!fs.existsSync(webGenConfigFilePath)) {
    fs.copyFileSync('./website-generator.json', webGenConfigFilePath)
    console.warn('Website generator configuration file missing. A sample configuration file has been created. Please edit and rebuild')
    process.exit(1)
  }

  if (!fs.existsSync(packageConfigFilePath)) {
    console.error('The package.json file could not be found.')
    process.exit(1)
  }

  fs.copyFileSync(webGenConfigFilePath, './website-generator-repo.json')
  fs.copyFileSync(packageConfigFilePath, './package-repo.json')

  configJson = require('./website-generator-repo.json')

  const readmeFilePath = path.join(pathPrefix, configJson.readmeFileName)

  if (!fs.existsSync(readmeFilePath)) {
    console.error(`The readme markdown file could not be found at ${readmeFilePath}`)
    process.exit(1)
  }

  fs.copyFileSync(readmeFilePath, './readme-repo.md')

  if (configJson.markdownPages) {
    const markdownPagesPath = path.join(pathPrefix, configJson.markdownPages.path)
    if (!fs.existsSync(markdownPagesPath)) {
      console.error(`Markdown pages directory '${markdownPagesPath}' does not exist. Set 'markdownPages: null' to disable`)
      process.exit(1)
    }

    fse.copySync(markdownPagesPath, './docs', { overwrite: true })
  }
  if (configJson.codeDocs) {
    const codeDocsPath = path.join(pathPrefix, configJson.codeDocs.path)
    if (!fs.existsSync(codeDocsPath)) {
      console.error(`Code docs directory '${codeDocsPath}' does not exist. Set 'codeDocs: null' to disable`)
      process.exit(1)
    }

    fse.copySync(codeDocsPath, './code-docs', { overwrite: true })
  }
}

process.chdir(__dirname)
process.argv.push('build')
const { commands } = require('next/dist/bin/next')
const path = require('path')
const fs = require('fs')

commands.export()
