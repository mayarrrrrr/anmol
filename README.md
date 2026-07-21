# One Year — Anniversary Website

A personalized, animated anniversary site: a wax-seal button that opens
into a letter you write and edit directly on the site, and a scattered
polaroid photo gallery. Floating hearts drift throughout, and hovering
over the seal, the letter, and each photo tilts them in 3D toward your
cursor for a more playful, tactile feel.

## Running it locally

You'll need [Node.js](https://nodejs.org) (v18 or newer) installed.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Then open the URL it prints (usually `http://localhost:5173`) in your browser.

## Personalizing it

**Names and photos live in `src/config.js`:**

- `yourName` / `partnerName` — the names shown throughout the site
- `photos` — the gallery images and captions

### Writing the letter

The love letter is no longer hard-coded in the code. Open the site,
scroll to the letter card, and click **edit** — type your message,
then click **save**. There's no character limit and you can add as
many paragraphs as you like (leave a blank line between paragraphs).

The message is saved with `localStorage` in the browser, so it
persists across visits/reloads **on the same device and browser**.
Because it isn't stored on a server, it won't automatically show up
if the site is opened on a different device or browser — if you need
the same letter to appear everywhere, the simplest option is to write
it once, then hardcode that saved text as the default `PLACEHOLDER` in
`src/components/LetterSection.jsx` before deploying.

### Adding real photos

The gallery currently uses placeholder images. To use real photos:

1. Put your image files in the `public/photos/` folder (create it if it doesn't exist)
2. In `src/config.js`, change each photo's `src` to `"/photos/your-filename.jpg"`

```js
photos: [
  { src: "/photos/first-date.jpg", caption: "the day it started" },
  ...
]
```

## Project structure

```
anniversary-website/
├── index.html              entry HTML
├── src/
│   ├── main.jsx             React entry point
│   ├── App.jsx               composes all sections
│   ├── config.js             ← edit this to personalize names/photos
│   ├── index.css             all styling / design tokens
│   ├── hooks/
│   │   ├── useReveal.js       scroll-reveal-on-view hook
│   │   └── useTilt.js         pointer-driven 3D tilt hook
│   └── components/
│       ├── FloatingHearts.jsx
│       ├── Hero.jsx
│       ├── LetterSection.jsx  ← editable letter (write it here on the site)
│       ├── GallerySection.jsx
│       ├── ClosingSection.jsx
│       └── BurstParticles.jsx
└── public/
    └── photos/               put real photos here
```

## Building for deployment

```bash
npm run build
```

This outputs a static site to `dist/` that you can deploy anywhere
(Vercel, Netlify, GitHub Pages, or any static host — just upload the
contents of `dist/`).

## Notes

- Motion respects `prefers-reduced-motion` for accessibility.
