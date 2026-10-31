# Starlight: edit link for a file named `c#.md`

```sh
npm install && npm run dev
```

Open `/languages/c-sharp/` and inspect "Edit this page".

Expected: the link ends in `/src/content/docs/languages/c%23.md`.
Observed: it ends in `/src/content/docs/languages/c#.md`, so the browser drops `#.md` as a fragment.
