import { createApp, h, nextTick, onMounted, ref } from 'vue'
import { observeElementOffset, useVirtualizer } from '@tanstack/vue-virtual'

createApp({
  setup() {
    const visible = ref(true)
    const scrollElement = ref(null)
    let detachedElement
    let cleanups = 0
    let callbacks = 0
    const virtualizer = useVirtualizer({
      count: 100,
      estimateSize: () => 40,
      getScrollElement: () => scrollElement.value,
      observeElementOffset(instance, callback) {
        const cleanup = observeElementOffset(instance, callback)
        return () => {
          cleanups++
          cleanup?.()
        }
      },
      onChange() {
        callbacks++
      },
    })
    const state = () => ({
      visible: visible.value,
      getterIsNull: scrollElement.value === null,
      attached: virtualizer.value.scrollElement !== null,
      connected: virtualizer.value.scrollElement?.isConnected ?? false,
      cleanups,
      callbacks,
    })
    const show = (result) => {
      document.querySelector('#output').textContent = JSON.stringify(result, null, 2)
      return result
    }
    const toggle = async () => {
      if (visible.value) detachedElement = scrollElement.value
      visible.value = !visible.value
      await nextTick()
      show(state())
    }
    const detachedScroll = async () => {
      if (visible.value || !detachedElement) {
        throw new Error('Hide the scroll container first')
      }
      const before = state()
      detachedElement.scrollTop = 400
      detachedElement.dispatchEvent(new Event('scroll'))
      await nextTick()
      const after = state()
      return show({ before, after, callbackDelta: after.callbacks - before.callbacks })
    }
    window.probe = { state, detachedScroll }
    onMounted(async () => {
      await nextTick()
      show(state())
    })
    return () => h('main', [
      h('h1', 'Remove a Vue virtualizer scroll container'),
      h('p', 'The component stays mounted. Only its scroll container is removed.'),
      h('button', { onClick: toggle }, visible.value ? 'Hide catalog' : 'Show catalog'),
      h('button', { disabled: visible.value, onClick: detachedScroll }, 'Dispatch detached scroll'),
      visible.value && h('div', {
        ref: scrollElement,
        style: 'height: 200px; width: 400px; overflow: auto; border: 1px solid black',
      }, [h('div', {
        style: `height: ${virtualizer.value.getTotalSize()}px; position: relative`,
      }, virtualizer.value.getVirtualItems().map((item) => h('div', {
        key: item.key,
        style: `position: absolute; height: 40px; transform: translateY(${item.start}px)`,
      }, `Product ${item.index}`))) ]),
    ])
  },
}).mount('#app')
