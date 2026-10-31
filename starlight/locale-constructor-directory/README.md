# Starlight: localized routes for a directory named `constructor`

```sh
npm install && npm run build
```

Expected: the build completes and writes the French fallback to `dist/fr/constructor/overview/index.html`.

Observed with Starlight 0.42.8: the build fails with `TypeError: otag() attribute "hreflang" value must be a string, received function`. With `site` removed from `astro.config.mjs` the build finishes, but the fallback is written to `dist/fr/overview/index.html` and the language links drop `constructor`.
