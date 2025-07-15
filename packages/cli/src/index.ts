import { cac } from 'cac'
import { version } from '../package.json'
import { build } from 'tsup'
import { rimraf } from 'rimraf'
import { getBuildOptions } from './utils'

const cli = cac('minivue')

cli
  .command('dev', 'dev your app')
  .option('--lib', 'dev a lib')
  .action(async (options) => {
    const buildOpitons = getBuildOptions(options.lib, true)
    const outDirs = buildOpitons.map((item) => item.outDir || 'dist')
    for (const item of outDirs) {
      await rimraf(item)
    }
    await Promise.all(buildOpitons.map((item) => build(item)))
    console.log('watching...')
  })

cli
  .command('build', 'build your app')
  .option('--lib', 'build a lib')
  .action(async (options) => {
    const buildOpitons = getBuildOptions(options.lib)
    const outDirs = buildOpitons.map((item) => item.outDir || 'dist')
    console.log('building...')
    for (const item of outDirs) {
      await rimraf(item)
    }
    await Promise.all(buildOpitons.map((item) => build(item)))
  })

cli.option('--lib', 'build a lib')

cli.help()

cli.version(version)
cli.parse()
