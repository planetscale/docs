# docs.planetscale.com

<img width="1380" alt="CleanShot 2021-05-27 at 16 00 47@2x" src="https://user-images.githubusercontent.com/623670/120054072-a19f0700-bfe2-11eb-9de3-3afb03fe6866.png">

## Internals

- NextJS
- Deployed via Vercel

### How to setup local development (on MacOS)

- Install homebrew (https://brew.sh/)
- Install node and npm
- Git clone this repository (`git@github.com:planetscale/docs.planetscale.com.git`)
- Switch to the repository's folder
- Install package dependencies with `npm install`
- Execute `npx next dev` to start a local nextJS server
- Open `http://localhost:3000` to access the local server instance. Check terminal to find the actual port being used by your nextJS local server.

### How to add a new document

- All pages in the documentation are markdown (.mdx) files with a frontmatter block on the top. The frontmatter block defines the title of the page.
- When creating a new page, also create a corresponding entry in `meta.json` file to define the category and position of the file in the table of contants.

### How to add a theme sensitive asset (image)

- An image can be added with corresponding `light` and `dark` equivalents by having two assets: `ASSET_NAME_light.png` and `ASSET_NAME_dark.png`.
- The image link to be used in a `.mdx` document needs to be the `light` version of the asset i.e. `ASSET_NAME_light.png`.

### Notes

- Search is powered by [DocSearch](https://docsearch.algolia.com/). PlanetScale's configuration on DocSearch can be viewed [here](https://github.com/algolia/docsearch-configs/blob/master/configs/planetscale.json)
