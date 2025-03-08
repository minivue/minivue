import {
  type AttributeNode,
  type DirectiveNode,
  type TemplateChildNode,
  NodeTypes,
} from '@vue/compiler-core'
import { SFCTemplateBlock } from '@vue/compiler-sfc'
import { writeFile } from './utils'
import { join } from 'path'

// const builtInComponents = [
//   'Block',
//   'CoverImage',
//   'CoverView',
//   'MatchMedia',
//   'MovableArea',
//   'MovableView',
//   'PageContainer',
//   'RootPortal',
//   'ScrollView',
//   'Swiper',
//   'SwiperItem',
//   'View',
//   'Icon',
//   'Progress',
//   'RichText',
//   'Selection',
//   'Button',
//   'Checkbox',
//   'CheckboxGroup',
//   'Editor',
//   'Form',
//   'Input',
//   'KeyboardAccessory',
//   'Label',
//   'Picker',
//   'PickerView',
//   'PickerViewColumn',
//   'Radio',
//   'RadioGroup',
//   'Slider',
//   'Switch',
//   'Textarea',
//   'DoubleTapGestureHandler',
//   'ForcePressGestureHandler',
//   'HorizontalDragGestureHandler',
//   'LongPressGestureHandler',
//   'PanGestureHandler',
//   'ScaleGestureHandler',
//   'TapGestureHandler',
//   'VerticalDragGestureHandler',
//   'DraggableSheet',
//   'GridBuilder',
//   'GridView',
//   'ListBuilder',
//   'ListView',
//   'NestedScrollBody',
//   'NestedScrollHeader',
//   'OpenContainer',
//   'OpenDataItem',
//   'OpenDataList',
//   'ShareElement',
//   'Snapshot',
//   'Span',
//   'StickyHeader',
//   'StickySection',
//   'FunctionalPageNavigator',
//   'Navigator',
//   'Audio',
//   'Camera',
//   'ChannelLive',
//   'ChannelVideo',
//   'Image',
//   'LivePlayer',
//   'LivePusher',
//   'Video',
//   'VoipRoom',
//   'Map',
//   'Canvas',
//   'Ad',
//   'AdCustom',
//   'OfficialAccount',
//   'OpenData',
//   'StoreHome',
//   'StoreProduct',
//   'WebView',
//   'NavigationBar',
//   'PageMeta',
// ]

// 标签映射
const TAG_MAP: Record<string, string> = {
  div: 'view',
  span: 'text',
  p: 'text',
  h1: 'view',
  h2: 'view',
  h3: 'view',
  h4: 'view',
  h5: 'view',
  h6: 'view',
  ul: 'view',
  li: 'view',
  template: 'block',
}

// 缓存上一次生成的内容，以便在下一次写入文件时检查是否需要更新
const cache = new Map<string, string>()

/**
 * 将字符串转换为 kebab-case。
 *
 * @param str - 要转换的字符串。
 * @returns 转换后的 kebab-case 字符串。
 */
function toKebabCase(str: string): string {
  return str
    .replace(/[A-Z]/g, function (match) {
      return '-' + match.toLowerCase()
    })
    .replace(/^-/, '')
}

/**
 * 使用预定义的标签映射转换给定的标签。
 *
 * @param tag - 要转换的标签。
 * @returns 如果标签映射中存在转换后的标签，则返回转换后的标签，否则返回原始标签。
 */
function transformTag(tag: string): string {
  tag = TAG_MAP[tag] || tag
  return toKebabCase(tag)
}

/**
 * 解析 v-for 表达式并提取项目、索引和列表。
 *
 * Vue.js 中的 v-for 指令用于渲染项目列表。
 * 此函数接受一个 v-for 表达式字符串，并返回一个包含从表达式中提取的项目、索引和列表的对象。
 *
 * @param expression - 要解析的 v-for 表达式字符串。
 * @returns 如果表达式有效，则返回包含项目、索引和列表的对象；如果表达式无效，则返回 null。
 *
 * @example
 * ```typescript
 * const result = parseVFor("(item, index) in items");
 * // result: { item: 'item', index: 'index', list: 'items' }
 * ```
 */
function parseVFor(expression: string) {
  const match = expression.match(/^\(?(.+?)(?:,\s*(.+?))?\)?\s+in\s+(.+)$/)
  if (match) {
    const [, item, index, list] = match
    return { item, index: index || 'index', list }
  }
  return null
}

// 处理属性转换
function transformAttributes(
  attrs: (AttributeNode | DirectiveNode)[],
  eventNames: string[],
): string {
  const newAttrs: Record<string, string> = {}
  attrs.forEach((attr) => {
    if (attr.type === NodeTypes.ATTRIBUTE) {
      const key = attr.name
      const value = attr.value?.content || ''
      newAttrs[key] = value
    } else {
      const exp = attr.exp
      const key = attr.rawName || ''
      if (exp) {
        if (exp.type === NodeTypes.SIMPLE_EXPRESSION) {
          const value = exp.content
          if (key === ':key') {
            // 处理 :key 转换为 wx:key
            newAttrs['wx:key'] = value.split('.').pop() || ''
          } else if (key.startsWith(':')) {
            // 数据绑定 (:属性)
            newAttrs[key.slice(1)] = `{{${value}}}`
          } else if (key.startsWith('@')) {
            const [eventName, modifier = 'bind'] = key.slice(1).split('.') // 移除 @
            const markKey = `mark:${eventName}`
            const funcMatch = value.match(/(\w+)\((.*)\)/)
            const funcName = funcMatch ? funcMatch[1] : value
            const funcArgsStr = funcMatch ? funcMatch[2] : ''
            const newModifier = modifier
              .replace('stop', 'catch')
              .replace('prevent', 'catch')
              .replace('self', 'bind')
              .replace('capture', 'capture-bind')
              .replace('once', 'bind')
              .replace('passive', 'bind')
            eventNames.push(funcName)
            newAttrs[`${newModifier}:${eventName}`] = funcName
            if (funcArgsStr) {
              newAttrs[markKey] = `{{[${funcArgsStr}]}}`
            }
            // console.log('EVENT:', key, value, funcArgsStr)
          } else if (key === 'v-for') {
            const vForData = parseVFor(value)
            if (vForData) {
              newAttrs['wx:for'] = `{{${vForData.list}}}`
              newAttrs['wx:for-item'] = vForData.item
              newAttrs['wx:for-index'] = vForData.index
            }
          } else if (key === 'v-if') {
            newAttrs['wx:if'] = `{{${value}}}`
          } else if (key === 'v-else-if') {
            newAttrs['wx:elif'] = `{{${value}}}`
          } else {
            newAttrs[key] = value
          }
        } else {
          console.log('UNKNOWN:', attr)
        }
      } else if (key === 'v-else') {
        newAttrs['wx:else'] = ''
      } else {
        console.log('UNKNOWN:', attr)
      }
    }
  })
  return Object.entries(newAttrs)
    .map(([key, value]) => (value ? `${key}="${value}"` : key))
    .join(' ')
}

/**
 * 将模板节点数组转换为 WXML 字符串。
 *
 * @param nodes - 模板节点数组。
 * @param eventNames - 事件名称数组。
 * @returns 转换后的 WXML 字符串。
 */
function templateToWxml(nodes: TemplateChildNode[], eventNames: string[]): string {
  let result = ''
  nodes.forEach((node) => {
    const type = node.type
    if (type === NodeTypes.ELEMENT) {
      // 表示 HTML 元素节点
      const tag = transformTag(node.tag)
      const attrs = transformAttributes(node.props, eventNames)
      result += attrs ? `<${tag} ${attrs}>` : `<${tag}>`
      result += templateToWxml(node.children, eventNames)
      result += `</${tag}>`
    } else if (type === NodeTypes.INTERPOLATION || type === NodeTypes.COMPOUND_EXPRESSION) {
      // 表示插值表达式（动态数据绑定）
      result += node.loc.source
    } else if (type === NodeTypes.TEXT) {
      // 表示纯文本节点
      result += node.content
    } else if (type === NodeTypes.COMMENT) {
      // 表示注释节点
      // result += `<!--${node.content}-->`
    } else {
      console.log('UNKNOWN:', node)
    }
  })
  return result
}

/**
 * 如果模板不为空且文件不是主应用文件，则将 WXML 内容写入文件。
 * 它在写入之前检查内容是否已更改，以避免不必要的文件操作。
 *
 * @param template - 包含模板 AST 的 SFC 模板块。
 * @param fileOutputDir - 应写入 WXML 文件的目录。
 * @param fileName - 要写入的 WXML 文件的名称。
 * @param eventNames - 事件名称数组。
 */
export function writeWxml(
  template: SFCTemplateBlock | null,
  fileOutputDir: string,
  fileName: string,
  eventNames: string[] = [],
  wxs: string,
) {
  const isApp = fileOutputDir === 'dist' && fileName === 'app'
  if (template && !isApp) {
    const cacheContent = cache.get(fileOutputDir)
    const templateContent = template.ast ? templateToWxml(template.ast.children, eventNames) : '' // template.content
    if (cacheContent !== templateContent) {
      writeFile(join(fileOutputDir, `${fileName}.wxml`), wxs + templateContent)
      cache.set(fileOutputDir, templateContent)
    }
  }
}
