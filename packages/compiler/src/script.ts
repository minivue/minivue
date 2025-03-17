import { compileScript, type SFCDescriptor } from '@vue/compiler-sfc'
import { transformCode } from './component'
import { hash } from './utils'

interface CompileParams {
  descriptor: SFCDescriptor
  path: string
  componentLibs: string[]
  eventNames: string[]
  isApp: boolean
  isComponent: boolean
}

/**
 * 将给定的单文件组件 (SFC) 描述符编译成小程序js。
 */
export async function compile({
  descriptor,
  path,
  componentLibs = [],
  eventNames = [],
  isApp = false,
  isComponent = false,
}: CompileParams) {
  const result = compileScript(descriptor, {
    id: hash(path),
    isProd: true,
    sourceMap: false,
    hoistStatic: false,
  })
  const scriptContent = result.content

  const type = isApp ? 'App' : isComponent ? 'Component' : 'Page'

  const { code, importedComponentMap } = await transformCode(
    type,
    scriptContent,
    componentLibs,
    eventNames,
  )

  return {
    contents: code,
    importedComponentMap,
  }
}
