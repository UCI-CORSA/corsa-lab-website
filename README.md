# CORSA Lab Website

Repository for the redesigned [CORSA Lab](https://corsa.eng.uci.edu/) website, live at https://uci-corsa.github.io.

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/UCI-CORSA/uci-corsa.github.io.git
   ```

2. Install dependencies and set up type checkers and linters:

   ```bash
   yarn && yarn setup-checkers
   ```

   `setup-checkers` sets up type checkers and linters so that TypeScript and style errors can be caught at commit time.

3. Launch a local development build:

   ```bash
   yarn dev
   ```

## Contributing Workflow

The `main` branch is protected: only repository and organization admins can push to it or merge into it. Everyone else makes changes on a separate branch and submits a Pull Request (PR), which an admin reviews and merges.

1. Create a new branch from `main`:

   ```bash
   git checkout -b my-branch-name
   ```

2. Make your changes (see [Adding Content](#adding-content)), then run the same checks the CI runs on every PR, plus a production build:

   ```bash
   yarn type-check
   yarn lint
   yarn style-check
   yarn build
   ```

   If `style-check` reports formatting issues, run `yarn format` to fix them automatically.

3. Add and commit your changes:

   ```bash
   git status
   git add .
   git commit -m "Describe your changes here"
   ```

4. Push your branch:

   ```bash
   git push -u origin my-branch-name
   ```

5. Go to the [CORSA Lab website repository](https://github.com/UCI-CORSA/uci-corsa.github.io) and create a new Pull Request for your branch.

6. After review, an admin merges the PR into `main`, and the site is deployed automatically (see [Deployment](#deployment)).

## Adding Content

All content lives in data files under `src/data/` and assets under `public/`. The sections below describe each page.

**Images:** use JPG or PNG files. Avoid HEIC (the default iPhone photo format), since Chrome and Firefox cannot display it. Keep file sizes small (ideally under 500 KB) so pages load quickly.

### People

1. Go to `src/data/members.ts`.

2. Add a new entry anywhere in `MEMBERS`. Follow the format indicated in `interface Props`.

3. Use the key format `[firstName][lastName]`, without middle names or aliases.

   Example:

   ```text
   John David Smith -> johnsmith
   ```

4. Set `position` to exactly one of the values in `LabPositions`: `'Faculty'`, `'Ph.D. Student'`, `'M.S. Student'`, `'Visiting Researcher'`, `'Past Researcher'`, or `'Undergraduate Student'`.

5. For the profile picture, use an image with a 1:1 aspect ratio, consistent with the existing member images. A suggested size is 500x500 px.

6. Place the image inside `public/members/` and make sure the filename exactly matches the value entered in the `img` field in `members.ts`, including the file extension. Members without a photo show a default image, and members with a photo are listed first within their position.

7. Links on the member card are optional. Each button appears only when its field is filled in; leave the field out (or empty) to hide the button:

   ```typescript
   email: 'netid@uci.edu', // email button
   site: 'https://example.com/', // personal website button
   linkedin: 'https://www.linkedin.com/in/username/', // LinkedIn button, shown to the right of the website button
   ```

8. To add a former member instead of a current one, also set the following fields so they show up under "Alumni" instead of their `position` section:

   ```typescript
   isAlumni: true,
   endYear: 2024, // year they left the lab (used for sorting, newest first)
   endSeason: 'Spring', // season they left: 'Winter' | 'Spring' | 'Summer' | 'Fall'
   currentPosition: 'Software Engineer at Google', // shown on their alumni card
   ```

   The Alumni section appears automatically once at least one member has `isAlumni: true`. Alumni are grouped by position; Visiting Researchers and Past Researchers are listed together under "Past Researcher".

### News

1. Go to `src/data/posts.ts`.
2. Add a new entry at the top of `POSTS`. Follow the format indicated in `interface Props`.
3. For longer text or images, create a separate `.md` file in `public/posts/` and enter its path in the `contentMdFilePath` field.
4. If the post includes images, place them inside `public/posts/postImages/` and reference their paths from the Markdown file.

### Publications

1. Go to `src/data/publications.ts`.

2. Add a new entry at the top of `PUBLICATIONS`. Follow the format indicated in `interface Props`.

3. In the `authors` field, CORSA Lab members should be referenced as:

   ```typescript
   MEMBERS.firstnamelastname
   ```

   This ensures that CORSA Lab members are displayed prominently among the authors.

4. For co-authors or authors with equal contribution, group them into an array within the `authors` field. Asterisks will appear next to their names to indicate equal contribution.

5. In the `topics` field, pick one or more existing keys from the `ResearchTopics` object defined near the top of the file:

   ```typescript
   topics: ['compiler', 'fpga']
   ```

   To introduce a brand-new research topic (not just tag a paper with an existing one), add a new entry to `ResearchTopics` itself (with an emoji and label). It will then automatically show up in the Publications page filter and the homepage's "Research Themes" section — no other changes needed.

### Courses

1. Go to `src/data/courses.ts`.
2. Add a new entry to `COURSES`. Follow the format indicated in `interface Props`.
3. Courses are displayed in the order they appear in the array.
4. In the `editions` field, list each past offering as a `{ semester, url }` pair (e.g. `{ semester: 'Spring 2024', url: 'https://...' }`), with the most recent semester listed first.
5. Note: the `image` field is currently unused by the Courses page.

### Gallery

1. Go to `src/data/groupPhotos.ts`.
2. Add a new entry to `GROUPPHOTOS`. Follow the format indicated in `interface Props`.
3. Place the image inside `public/images/group/` and make sure the filename exactly matches the value entered in the `filename` field, including the file extension.
4. The **first** entry in `GROUPPHOTOS` is featured on the homepage hero (clicking it opens the full gallery), so keep the most recent photo at the top of the array.

### Projects

Each project appears as a card on the Projects page (`/projects`), and each card links to the project's own page (`/projects/<slug>`).

1. Go to `src/data/projects.ts`.
2. Add a new entry to `PROJECTS`. Follow the format indicated in `interface Props`. The `slug` becomes the page URL, so use lowercase letters, numbers, and hyphens only (e.g. `pylog`).
3. Place the project image inside `public/images/projects/` and make sure the filename exactly matches the `image` field. This image is used on the card and at the top of the project page.
4. (Optional) For a longer write-up, create a `.md` file in `public/projects/` and enter its filename in the `contentMdFilePath` field. Without it, the project page shows only the title, description, and image. See `public/projects/pylog.md` for an example.
5. To add figures in the Markdown file, place them inside `public/images/projects/` and reference them with an absolute path. The optional title in quotes is shown as the caption:
   ```md
   ![Alt text](/images/projects/my_figure.png 'Caption shown under the figure')
   ```

## Deployment

The site is deployed to GitHub Pages at https://uci-corsa.github.io.

- Every push to `main` (including a merged Pull Request) triggers the **Deploy to GitHub Pages** workflow (`.github/workflows/deploy.yml`), which builds the site and publishes it automatically. There is no manual deploy step.
- The update usually goes live within a few minutes. Check progress in the repository's **Actions** tab; if the workflow fails, the live site keeps showing the previous version.
- The site is a static export served from the root of the domain, which only works because the repository is named `uci-corsa.github.io`. If the repository is renamed, update `basePath` in `next.config.js` to match the new URL path.

## Development

| Command            | What it does                                                 |
| ------------------ | ------------------------------------------------------------ |
| `yarn dev`         | Starts a local development server at http://localhost:3000   |
| `yarn build`       | Builds the static site into `out/`, the same way deploys do  |
| `yarn type-check`  | Checks for TypeScript errors                                 |
| `yarn lint`        | Checks for ESLint errors (`yarn lint:fix` fixes what it can) |
| `yarn style-check` | Checks Prettier formatting                                   |
| `yarn format`      | Reformats all files with Prettier                            |

Every Pull Request runs `type-check`, `lint`, and `style-check` in CI (`.github/workflows/ci.yml`). CI does not run `build`, so run it locally before opening a PR to catch problems that only show up when pages are generated, such as a project whose Markdown file is missing.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Noto Sans, a Google Font.

## Attribution

The design and codebase of this website were adapted from the [KIXLAB website](https://www.kixlab.org/) and its [public GitHub repository](https://github.com/kixlab/website), with permission from KIXLAB.
