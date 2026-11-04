<script>
  let { title, virtualizer, ref = $bindable() } = $props()
</script>

<h3>{title}: {$virtualizer.getVirtualItems().length} rows</h3>
<div bind:this={ref} style="height: 200px; width: 300px; overflow: auto; border: 1px solid #999;">
  <div style="position: relative; height: {$virtualizer.getTotalSize()}px;">
    {#each $virtualizer.getVirtualItems() as row (row.index)}
      <div style="position: absolute; top: 0; left: 0; width: 100%; height: {row.size}px; transform: translateY({row.start}px);">
        Row {row.index}
      </div>
    {/each}
  </div>
</div>
