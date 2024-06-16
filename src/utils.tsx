import {
  createVNode,
  render as vueRender,
  type VNode,
  type Ref,
  type ExtractPublicPropTypes,
  inject
} from 'vue'
import type { ModalFuncProps } from 'ant-design-vue'
import { ConfigProvider } from 'ant-design-vue'

export type PopupOpenOptions<S> = Partial<Omit<S, keyof ModalPublicProps>> & ModalFuncProps
import { modalProps } from 'ant-design-vue/es/modal/Modal'

type ModalPublicProps = ExtractPublicPropTypes<ReturnType<typeof modalProps>>
export const POPUP_KEY = Symbol('popup')

export function createPopupApi<
  T extends { new (): { $props: any } },
  S = InstanceType<T>['$props']
>(component: T) {
  const container = document.createDocumentFragment()
  let instance: VNode | null = null

  function destroy() {
    if (instance) {
      vueRender(null, container as any)
      instance = null
    }
  }

  const Wrapper = (props: PopupOpenOptions<S>) => {
    return <ConfigProvider>{createVNode(component as any, props)}</ConfigProvider>
  }

  function render(props: PopupOpenOptions<S>) {
    const oldAfterClose = props.afterClose
    const vm = createVNode(Wrapper, {
      ...props,
      open: true,
      afterClose() {
        oldAfterClose?.()
        destroy()
      }
    })
    vm.appContext = props.appContext
    vueRender(vm, container as any)
    return vm
  }

  function open(props: PopupOpenOptions<S> = {}) {
    instance = render(props)
  }

  function close() {
    if (!instance) return
    const open = inject<Ref<boolean>>(POPUP_KEY)
    if (open) {
      open.value = false
    }
  }

  return {
    open,
    close,
    destroy
  }
}
