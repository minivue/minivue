import { compileScript, type SFCDescriptor } from '@vue/compiler-sfc'
import { removeComponentImportsAndReferences } from './component'
import { hash } from './utils'

/**
 * 将给定的单文件组件 (SFC) 描述符编译成小程序js。
 *
 * @param descriptor - SFC 的描述符，包含脚本、脚本设置和自定义块。
 * @param path - SFC 的文件路径。
 * @returns 包含编译后的脚本内容和导入组件映射的对象。
 */
export async function compile(descriptor: SFCDescriptor, path: string) {
  const { script, scriptSetup, customBlocks } = descriptor
  const isComponent = customBlocks.some(({ content, type }) => {
    if (type === 'config') {
      const json = JSON.parse(content)
      return !!json.component
    }
    return false
  })
  let scriptContent = (script || scriptSetup)?.content || ''
  if (scriptContent) {
    const result = compileScript(descriptor, {
      id: hash(path),
      isProd: true,
      sourceMap: false,
      hoistStatic: false,
    })
    scriptContent = result.content
  }

  const { code, importedComponentMap } = await removeComponentImportsAndReferences(scriptContent)

  // 代码转换
  let contents = code.replace('export default ', '')

  if (!isComponent) {
    contents = contents.replace('defineComponent', 'definePage')
  }

  return {
    contents,
    importedComponentMap,
  }
}
