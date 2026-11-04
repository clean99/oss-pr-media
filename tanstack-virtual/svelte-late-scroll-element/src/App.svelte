<script>
  import { createVirtualizer } from '@tanstack/svelte-virtual'
  import List from './List.svelte'

  // 1. Created inside $derived, as in #866.
  let derivedEl = $state(null)
  const derivedVirtualizer = $derived(
    createVirtualizer({
      count: 1000,
      getScrollElement: () => derivedEl,
      estimateSize: () => 35,
    }),
  )

  // 2. Created once for the component's lifetime.
  let onceEl = $state(null)
  const onceVirtualizer = createVirtualizer({
    count: 1000,
    getScrollElement: () => onceEl,
    estimateSize: () => 35,
  })

  // 3. Control: reads the element in $derived so the virtualizer is re-created once it is bound.
  let controlEl = $state(null)
  const controlVirtualizer = $derived(
    createVirtualizer({
      count: 1000,
      getScrollElement: controlEl ? () => controlEl : () => null,
      estimateSize: () => 35,
    }),
  )
</script>

<List title="$derived" virtualizer={derivedVirtualizer} bind:ref={derivedEl} />
<List title="created once" virtualizer={onceVirtualizer} bind:ref={onceEl} />
<List title="control" virtualizer={controlVirtualizer} bind:ref={controlEl} />
