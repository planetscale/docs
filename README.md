[![Netlify Status](https://api.netlify.com/api/v1/badges/169b6b58-dbd7-4f25-a4fc-5906221132c8/deploy-status)](https://app.netlify.com/sites/planetscale/deploys)

# Codebase for docs.planetscale.com

## Internals

- GatsbyJS
- Hosted and deployed via Netlify

## How to setup local development (on MacOS)

- Install homebrew (https://brew.sh/)
- Install yarn (MacOS: `brew install yarn`)
- Install netlify CLI (MacOS: `yarn global add netlify-cli`)
- Login to netlify via `netlify login`
- Git clone this repository (`git clone git@github.com:planetscale/website.git`)
- Switch to the repository's folder
- Link your repository to the planetscale.com project on netlify via `netlify link`
- `yarn install` to install all dependencies
- `netlify dev` to start a local server
- Open `http://localhost:8888` to access the local server instance

## Notes

- The main website hosted on webflow embeds the greenhouse job board which uses a custom stylesheet. A copy of it is available in this repository at src/styles/greenhouse.css
- Favicons are generated via https://favicon.io/favicon-converter/
