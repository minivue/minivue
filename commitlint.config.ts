export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'fix', // 类型 为 fix 的提交表示在代码库中修复了一个 bug（这和语义化版本中的 PATCH 相对应）。
        'feat', // 类型 为 feat 的提交表示在代码库中新增了一个功能（这和语义化版本中的 MINOR 相对应）。
        'build', // 用于修改项目构建系统，例如修改依赖库、外部接口或者升级 Node 版本等；
        'chore', // 用于对非业务性代码进行修改，例如修改构建流程或者工具配置等；
        'docs', // 用于修改文档，例如修改 README 文件、API 文档等；
        'style', // 用于修改代码的样式，例如调整缩进、空格、空行等；
        'refactor', // 用于重构代码，例如修改代码结构、变量名、函数名等但不修改功能逻辑；
        'perf', // 用于优化性能，例如提升代码的性能、减少内存占用等；
        'test', // 用于修改测试用例，例如添加、删除、修改代码的测试用例等。
        'ci', // 用于修改持续集成流程，例如修改 Travis、Jenkins 等工作流配置；
        'revert', // 回滚之前的提交
      ],
    ],
    'type-case': [2, 'always', 'lower-case'], // 类型必须小写
    'scope-case': [2, 'always', 'lower-case'], // 范围必须小写
    'subject-max-length': [2, 'always', 72], // 描述不超过72字符
    'body-max-line-length': [2, 'always', 100], // 正文每行不超过100字符
    'footer-max-line-length': [2, 'always', 100], // 脚注每行不超过100字符
    'header-max-length': [2, 'always', 100], // 头部总长度限制
  },

  // // 自定义插件（可选）
  // plugins: [
  //   // 例如：校验 Issue 引用格式
  //   {
  //     rules: {
  //       'issue-key': ({ footer }: { footer: string[] }) => {
  //         const pattern = /(Closes|Fixes) #\d+/
  //         return [
  //           footer && footer.some((line) => pattern.test(line)),
  //           'Footer must contain "Closes #123" or "Fixes #45"',
  //         ]
  //       },
  //     },
  //   },
  // ],

  // 帮助消息（在验证失败时显示）
  helpUrl: 'https://www.conventionalcommits.org/zh-hans/v1.0.0/',
}
