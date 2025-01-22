import { defineComponent } from 'vue'
import type {
  Directive,
  SlotsType,
  PublicProps,
  EmitsOptions,
  EmitsToProps,
  MethodOptions,
  DefineComponent,
  ComputedOptions,
  ExtractPropTypes,
  ComponentTypeEmits,
  ComponentOptionsBase,
  ComponentOptionsMixin,
  ComponentInjectOptions,
  ComponentProvideOptions,
  ExtractDefaultPropTypes,
  Component as VueComponent,
  ComponentObjectPropsOptions,
  CreateComponentPublicInstanceWithMixins,
} from 'vue'
import { exclude, isFunction, toHiddenField } from './utils'
import { PageLifecycle } from './enums'
import { deepToRaw, deepWatch } from './shared'
import { flushPostFlushCbs } from './scheduler'

type IfAny<T, Y, N> = 0 extends 1 & T ? Y : N
type IsKeyValues<T, K = string> = IfAny<T, false, T extends object ? (keyof T extends K ? true : false) : false>

type IsStringLiteral<T> = T extends string ? (string extends T ? false : true) : false

type ParametersToFns<T extends any[]> = {
  [K in T[0]]: IsStringLiteral<K> extends true
    ? (...args: T extends [e: infer E, ...args: infer P] ? (K extends E ? P : never) : never) => any
    : never
}

type OverloadUnion<TOverload extends (...args: any[]) => any> = Exclude<
  OverloadUnionRecursive<(() => never) & TOverload>,
  TOverload extends () => never ? never : () => never
>
type OverloadUnionRecursive<TOverload, TPartialOverload = unknown> = TOverload extends (
  ...args: infer TArgs
) => infer TReturn
  ? TPartialOverload extends TOverload
    ? never
    :
        | OverloadUnionRecursive<
            TPartialOverload & TOverload,
            TPartialOverload & ((...args: TArgs) => TReturn) & OverloadProps<TOverload>
          >
        | ((...args: TArgs) => TReturn)
  : never
type OverloadProps<TOverload> = Pick<TOverload, keyof TOverload>

type OverloadParameters<T extends (...args: any[]) => any> = Parameters<OverloadUnion<T>>

type TypeEmitsToOptions<T extends ComponentTypeEmits> = {
  [K in keyof T & string]: T[K] extends [...args: infer Args] ? (...args: Args) => any : () => any
} & (T extends (...args: any[]) => any ? ParametersToFns<OverloadParameters<T>> : {})

type ToResolvedProps<Props, Emits extends EmitsOptions> = Readonly<Props> & Readonly<EmitsToProps<Emits>>

let currentPage: any

function callSetup(setup: Function, query: Record<string, string | undefined>, ctx: any) {
  const bindings = setup?.(query as any, ctx) as Record<string, any> | void
  if (bindings !== undefined) {
    let data: Record<string, unknown> | undefined
    Object.keys(bindings).forEach((key) => {
      const value = bindings[key]
      if (isFunction(value)) {
        if (ctx) {
          ctx[key] = value
        }
        return
      }

      data = data || {}
      data[key] = deepToRaw(value)
      if (ctx) {
        deepWatch.call(currentPage, key, value)
      }
    })
    if (data !== undefined && ctx && ctx.setData) {
      ctx.setData(data, flushPostFlushCbs)
    }
    return data
  }
}

export function getCurrentPage() {
  return currentPage
}

export function definePage<
  // props
  TypeProps,
  RuntimePropsOptions extends ComponentObjectPropsOptions = ComponentObjectPropsOptions,
  RuntimePropsKeys extends string = string,
  // emits
  TypeEmits extends ComponentTypeEmits = {},
  RuntimeEmitsOptions extends EmitsOptions = {},
  RuntimeEmitsKeys extends string = string,
  // other options
  Data = {},
  SetupBindings = {},
  Computed extends ComputedOptions = {},
  Methods extends MethodOptions = {},
  Mixin extends ComponentOptionsMixin = ComponentOptionsMixin,
  Extends extends ComponentOptionsMixin = ComponentOptionsMixin,
  InjectOptions extends ComponentInjectOptions = {},
  InjectKeys extends string = string,
  Slots extends SlotsType = {},
  LocalComponents extends Record<string, VueComponent> = {},
  Directives extends Record<string, Directive> = {},
  Exposed extends string = string,
  Provide extends ComponentProvideOptions = ComponentProvideOptions,
  // resolved types
  ResolvedEmits extends EmitsOptions = {} extends RuntimeEmitsOptions
    ? TypeEmitsToOptions<TypeEmits>
    : RuntimeEmitsOptions,
  InferredProps = IsKeyValues<TypeProps> extends true
    ? TypeProps
    : string extends RuntimePropsKeys
      ? ComponentObjectPropsOptions extends RuntimePropsOptions
        ? {}
        : ExtractPropTypes<RuntimePropsOptions>
      : Partial<Record<RuntimePropsKeys, any>>,
  TypeRefs extends Record<string, unknown> = {},
  TypeEl extends Element = any,
>(
  options: {
    props?: (RuntimePropsOptions & ThisType<void>) | RuntimePropsKeys[]
    /**
     * @private for language-tools use only
     */
    __typeProps?: TypeProps
    /**
     * @private for language-tools use only
     */
    __typeEmits?: TypeEmits
    /**
     * @private for language-tools use only
     */
    __typeRefs?: TypeRefs
    /**
     * @private for language-tools use only
     */
    __typeEl?: TypeEl
  } & ComponentOptionsBase<
    ToResolvedProps<InferredProps, ResolvedEmits>,
    SetupBindings,
    Data,
    Computed,
    Methods,
    Mixin,
    Extends,
    RuntimeEmitsOptions,
    RuntimeEmitsKeys,
    {}, // Defaults
    InjectOptions,
    InjectKeys,
    Slots,
    LocalComponents,
    Directives,
    Exposed,
    Provide
  > &
    ThisType<
      CreateComponentPublicInstanceWithMixins<
        ToResolvedProps<InferredProps, ResolvedEmits>,
        SetupBindings,
        Data,
        Computed,
        Methods,
        Mixin,
        Extends,
        ResolvedEmits,
        {},
        {},
        false,
        InjectOptions,
        Slots,
        LocalComponents,
        Directives,
        Exposed
      >
    >,
): DefineComponent<
  InferredProps,
  SetupBindings,
  Data,
  Computed,
  Methods,
  Mixin,
  Extends,
  ResolvedEmits,
  RuntimeEmitsKeys,
  PublicProps,
  ToResolvedProps<InferredProps, ResolvedEmits>,
  ExtractDefaultPropTypes<RuntimePropsOptions>,
  Slots,
  LocalComponents,
  Directives,
  Exposed,
  Provide,
  // MakeDefaultsOptional - if TypeProps is provided, set to false to use
  // user props types verbatim
  unknown extends TypeProps ? true : false,
  TypeRefs,
  TypeEl
> {
  if (!__MINIVUE__) {
    return defineComponent(options as any) as any
  }
  const setup = options.setup
  const props = options.props
  options.data = callSetup(setup as any, {}, {}) as any
  options = exclude(options, ['setup', 'props'])
  options[PageLifecycle.ON_LOAD] = function (this: any, query: Record<string, string | undefined>) {
    currentPage = this
    callSetup(setup as any, query, currentPage)
    const hooks = currentPage[toHiddenField(PageLifecycle.ON_LOAD)]
    hooks?.forEach((hook: Function) => hook(query))
    currentPage = null
  }

  options[PageLifecycle.ON_UNLOAD] = function () {
    const hooks = this[toHiddenField(PageLifecycle.ON_UNLOAD)]
    hooks?.forEach((hook: Function) => hook())
  }
  options[PageLifecycle.ON_SHOW] = function () {
    const hooks = this[toHiddenField(PageLifecycle.ON_SHOW)]
    hooks?.forEach((hook: Function) => hook())
  }
  options[PageLifecycle.ON_HIDE] = function () {
    const hooks = this[toHiddenField(PageLifecycle.ON_HIDE)]
    hooks?.forEach((hook: Function) => hook())
  }
  console.log(options)
  Page(options as any)

  return null as any
}
