# Vue virtualizer null scroll element

Requires Node.js 20.19+ or 22.12+, npm and a browser. Tested with Node.js 24.8.0.

Run from this directory:

```sh
HUSKY=0 LEFTHOOK=0 npm ci --registry=https://registry.npmjs.org && npm run dev
```

Open the local URL printed by Vite. The app uses published `@tanstack/vue-virtual` 3.13.50, `@tanstack/virtual-core` 3.19.9 and Vue 3.5.22; `package-lock.json` pins the dependency tree.

1. Click **Hide catalog**. The component stays mounted while its scroll container is removed.
2. Click **Dispatch detached scroll**.
3. Click **Show catalog** to attach a new container.

Observed with the pinned release:

```text
Hidden: getterIsNull=true, attached=true, connected=false, cleanups=0
Detached scroll: callbackDelta=1
Shown again: cleanups=1
```

Expected after the fix:

```text
Hidden: getterIsNull=true, attached=false, connected=false, cleanups=1
Detached scroll: callbackDelta=0
```

The app wraps the built-in `observeElementOffset` only to count cleanup; registration and removal still use the library. The options and getter remain stable. It retains the old node to test its listener, so these observations demonstrate a stale subscription rather than heap growth. Console controls: `probe.state()` and `await probe.detachedScroll()`.
