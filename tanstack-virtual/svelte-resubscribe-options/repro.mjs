import { createVirtualizer } from '@tanstack/svelte-virtual'
import { get } from 'svelte/store'

const store = createVirtualizer({
  count: 10,
  estimateSize: () => 40,
  getScrollElement: () => null,
})

const unsubscribe = store.subscribe(() => {})
const virtualizer = get(store)
virtualizer.setOptions({ count: 100 })
console.log('Before unsubscribe:', virtualizer.options.count, virtualizer.getTotalSize())
unsubscribe()

const resubscribe = store.subscribe(() => {})
const actual = [virtualizer.options.count, virtualizer.getTotalSize()]
console.log('After resubscribe:', ...actual)
console.log('Expected: 100 4000')
resubscribe()

if (actual[0] !== 100 || actual[1] !== 4000) {
  console.error('FAIL: subscribing again reset the updated options')
  process.exitCode = 1
}
