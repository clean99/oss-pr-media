Svelte virtualizer store resubscription reproduction

Requires Node.js 24.8.0 or newer.

Run:
  npm ci
  npm run repro

With @tanstack/svelte-virtual 3.13.50, the output is:
  Before unsubscribe: 100 4000
  After resubscribe: 10 400
  Expected: 100 4000
  FAIL: subscribing again reset the updated options

The nonzero exit is intentional: the same store should retain the count set
before unsubscribing. The script models a long-lived virtualizer store whose
list consumer is removed and added again. It uses the real Svelte store
subscription lifecycle, without browser layout or a custom observer.
