# docs.planetscale.com

<img width="1380" alt="CleanShot 2021-05-27 at 16 00 47@2x" src="https://user-images.githubusercontent.com/623670/120054072-a19f0700-bfe2-11eb-9de3-3afb03fe6866.png">


## Internals

- GatsbyJS
- Deployed via Vercel

## How to setup local development (on MacOS)

- Install homebrew (https://brew.sh/)
- Install node and npm
- Install gatsby-cli with `npm install -g gatsby-cli`
- Git clone this repository (`git@github.com:planetscale/docs.planetscale.com.git`)
- Switch to the repository's folder
- Install package dependencies with `npm install`
- Execute `gatsby develop` to start a local gatsby server
- Open `http://localhost:8000` to access the local server instance. Check terminal to find the actual port being used by your gatsby local server.

## How to add a new document

- All pages in the documentation are markdown files with a frontmatter block on the top. The frontmatter block defines the title of the page.
- When creating a new page, also create a corresponding entry in `meta.yml` file to define the category and position of the file in the table of contants. The title defined in the frontmatter is also used here to provide the text for the link in the table of contents.

## Notes

- Although it is preferable to have a single title used across the table of contents and the document, there will be times when a longer title needs to be truncated to provide a succinct link text for the navigation list. You can use the smaller title in the frontmatter to enable this behavior.
- If you are adding a new document to any of the external repositories, you'd have to edit the `meta.yml` file in this repository as well.
- Search is powered by [DocSearch](https://docsearch.algolia.com/). PlanetScale's configuration on DocSearch can be viewed [here](https://github.com/algolia/docsearch-configs/blob/master/configs/planetscale.json)
