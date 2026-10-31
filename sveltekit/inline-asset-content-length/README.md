# SvelteKit: `read()` truncates an inline SVG with non-ASCII text

```sh
npm install && npm run build && npm run preview
curl -i http://localhost:4173/
```

Expected: the full 73-byte SVG ending in `</svg>`.
Observed: `Content-Length: 68`, and the body stops before `</svg>`.
