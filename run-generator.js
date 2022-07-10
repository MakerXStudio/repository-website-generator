#!/usr/bin/env node

const path = require('path')
const fs = require('fs')
const fse = require('fs-extra')
const os = require('os')
const cp = require('child_process')

process.chdir(__dirname)

let outPath = path.resolve(path.join(__dirname, 'out'))

const chars = ['a', 'b', 'c', 'd', 'e', 'f', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
let tempDir = path.join(os.tmpdir(), 'rwb-' + chars.sort(() => 0.5 - Math.random()).slice(0, 6).join(''))

console.log(`Repo website gen: copying build files to '${tempDir}'`)
fse.mkdirSync(tempDir)
fse.copySync(__dirname, tempDir, { filter: (src, dest) => !src.endsWith('node_modules') })

const parentDirectoryName = path.basename(path.join(__dirname, '../'))
if (parentDirectoryName === '@makerx') {
  let pathPrefix = './../../../'
  const webGenConfigFilePath = path.resolve(path.join(pathPrefix, 'website-generator.json'))
  const packageConfigFilePath = path.resolve(path.join(pathPrefix, 'package.json'))

  console.log(`Repo website gen: running under node_modules`)
  console.log(`Repo website gen: website-generator.json is '${webGenConfigFilePath}'`)
  console.log(`Repo website gen: package.json is '${packageConfigFilePath}'`)

  if (!fs.existsSync(webGenConfigFilePath)) {
    fs.copyFileSync('./website-generator.json', webGenConfigFilePath)
    console.warn('Website generator configuration file missing. A sample configuration file has been created. Please edit and rebuild')
    process.exit(1)
  }

  if (!fs.existsSync(packageConfigFilePath)) {
    console.error('The package.json file could not be found.')
    process.exit(1)
  }

  console.log(`Repo website gen: copying website-generator.json to '${tempDir}'`)
  console.log(`Repo website gen: copying package.json to '${tempDir}'`)
  fs.copyFileSync(webGenConfigFilePath, path.join(tempDir, 'website-generator-repo.json'))
  fs.copyFileSync(packageConfigFilePath, path.join(tempDir, 'package-repo.json'))

  configJson = require(path.join(tempDir, './website-generator-repo.json'))

  outPath = path.resolve(path.join(pathPrefix, configJson.outPath))
  console.log(`Repo website gen: build out will be copied to '${outPath}'`)

  const readmeFilePath = path.resolve(path.join(pathPrefix, configJson.readmeFileName ?? 'README.md'))

  if (!fs.existsSync(readmeFilePath)) {
    console.error(`The readme markdown file could not be found at ${readmeFilePath}`)
    process.exit(1)
  }

  console.log(`Repo website gen: ${configJson.readmeFileName ?? 'README.md'} to '${tempDir}'`)
  fs.copyFileSync(readmeFilePath, './readme-repo.md')

  if (configJson.markdownPages) {
    const markdownPagesPath = path.resolve(path.join(pathPrefix, configJson.markdownPages.path))
    if (!fs.existsSync(markdownPagesPath)) {
      console.error(`Markdown pages directory '${markdownPagesPath}' does not exist. Set 'markdownPages: null' to disable`)
      process.exit(1)
    }
    console.log(`Repo website gen: copying markdown pages to '${path.join(tempDir, 'docs')}'`)
    fse.copySync(markdownPagesPath, path.join(tempDir, 'docs'), { overwrite: true })
  }

  if (configJson.codeDocs) {
    const codeDocsPath = path.resolve(path.join(pathPrefix, configJson.codeDocs.path))
    if (!fs.existsSync(codeDocsPath)) {
      console.error(`Code docs directory '${codeDocsPath}' does not exist. Set 'codeDocs: null' to disable`)
      process.exit(1)
    }
    console.log(`Repo website gen: copying code docs '${path.join(tempDir, 'code-docs')}'`)
    fse.copySync(codeDocsPath, path.join(tempDir, 'code-docs'), { overwrite: true })
  }
}

process.chdir(tempDir)

var npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'

const afterBuild = (success) => {
  if (success) {
    console.log(`Repo website gen: copying static website to '${outPath}'`)

    if (fs.existsSync(outPath))
      fse.rmSync(outPath, { recursive: true })

    fse.mkdirSync(outPath)
    fse.copySync(path.join(tempDir, 'out'), outPath)
  }
  console.log(`Repo website gen: removing temp directory '${tempDir}'`)
  fse.removeSync(tempDir)
}

const captureOut = (proc) => {
  proc.stdout.on('data', (data) => {
    console.log(data.toString())
  })
  proc.stderr.on('data', (data) => {
    console.error(data.toString())
  })
  return proc
}

if (process.platform === 'win32') {
  console.log(`Repo website gen: restoring packages`)
  const install = captureOut(cp.spawn('cmd.exe', ['/c', npm, 'install', '--ignore-scripts']))
  install.on('exit', (code) => {
    if (code !== 0) {
      afterBuild(false)
      process.exit(1)
    }

    console.log(`Repo website gen: building static website`)
    const build = captureOut(cp.spawn('cmd.exe', ['/c', npm, 'run', 'build', '--repo_website']))
    build.on('exit', (code) => {
      afterBuild(code === 0)
    })
  })
} else {
  console.log(`Repo website gen: restoring packages`)
  const install = captureOut(cp.spawn(npm, ['install']))
  install.on('exit', (code) => {
    if (code !== 0) {
      afterBuild(false)
      process.exit(1)
    }
    console.log(`Repo website gen: building static website`)
    const build = captureOut(cp.spawn(npm, ['run', 'build']))
    build.on('exit', (code) => {
      afterBuild(code === 0)
    })
  })
}
