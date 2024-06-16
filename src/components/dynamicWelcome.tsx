import { defineComponent, ref, type PropType } from 'vue'
import { createPopupApi } from '../utils'
import { Modal } from 'ant-design-vue'
import TheWelcome from './TheWelcome.vue'

export const WelcomeModal = defineComponent({
  name: 'welcome-modal',
  props: {
    open: {
      type: Boolean,
      default: false
    },
    afterClose: Function as PropType<() => void>
  },
  emits: ['update:open'],
  setup(props, { emit }) {
    const open = ref(props.open)
    return () => (
      <Modal
        open={open.value}
        onUpdate:open={(value) => {
          open.value = value
          emit('update:open', value)
        }}
        width={560}
        closable={false}
        afterClose={props.afterClose}
      >
        <TheWelcome />
      </Modal>
    )
  }
})

export const WelcomeDialog = createPopupApi(WelcomeModal)
