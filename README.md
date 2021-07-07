# docs.planetscale.com

<img width="1380" alt="CleanShot 2021-05-27 at 16 00 47@2x" src="https://user-images.githubusercontent.com/623670/120054072-a19f0700-bfe2-11eb-9de3-3afb03fe6866.png">


## Docs and Engineering review processes
Engineering and Docs partnered to create and implement the following processes for _including doc PRs_ as **part of each release**. The following new processes and guidelines enable us to ship spectacular Docs that truly address our user's needs. Ready to turn PlanetScale Docs into a delightful user experience? Let's go, team! 😁✌🏽

- **Documentation review response time should be no more than 1-business day.**

  - If at all possible, engineers should balance reviews across the team requested so that no one person or group of people does most of the work.

  - When working on a new feature, shipping documentation for each feature should be part of the overall feature work/success criteria.

- **Features and Documentation should go live at the same time, side-by-side, not one after another.**

  - Leadership must align Product and Engineering on which features are prioritized for release so that both docs and new features are shipped simultaneously.

- **Documentation can start with an async "brain dump" from an engineering representative to kick off the process.**

  - These should happen within the same 1-business day turnaround.

### How are Doc issues labeled and prioritized?

- **P3:** Low priority; "nice to have"

- **P2:** This is something we need but don't have all of the information yet; "next in line."

- **P1:** This is the first thing in line, and we have all of the information needed to start the Documentation.

_NOTE: If you feel a specific doc is important to add and also have all of the information, feel free to add the P1 label directly._

---

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

### Notes

- Search is powered by [DocSearch](https://docsearch.algolia.com/). PlanetScale's configuration on DocSearch can be viewed [here](https://github.com/algolia/docsearch-configs/blob/master/configs/planetscale.json)


