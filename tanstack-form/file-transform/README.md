# TanStack Form: File values lost in a no-op transform

Requires Node.js 20 or later (global `File`) and npm. Tested with Node.js 24.16.0.

Run from this directory:

```sh
HUSKY=0 LEFTHOOK=0 npm ci --registry=https://registry.npmjs.org && npm start
```

The script uses published `@tanstack/form-core` 1.33.5 (`package-lock.json` pins the tree). It creates a form whose default value holds a `File`, runs `mergeAndUpdate` with an identity transform, and reads the value back.

Observed with 1.33.5:

```text
instanceof File: false
same object: false
name/size: undefined undefined
```

Expected:

```text
instanceof File: true
same object: true
name/size: attachment.txt 7
```
