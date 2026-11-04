@tanstack/svelte-virtual: rows missing when the scroll element is bound after the store subscribes

Requires Node.js 20 or newer.

Run:
  npm ci
  npm run dev

Open the printed URL. Each list has 1000 rows and a 200px scroll container
assigned with bind:this.

With @tanstack/svelte-virtual 3.13.52 and Svelte 5.57.3:
  $derived: 0 rows        (empty container)
  created once: 0 rows    (empty container)
  control: 7 rows

Expected: the first two lists render rows like the control. The control only
works because its getScrollElement reads the element inside $derived, so the
virtualizer is re-created after bind:this runs.
