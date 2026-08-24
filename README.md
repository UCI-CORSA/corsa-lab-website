# Corsa Lab Website

Repository for the redesigned [Corsa Lab](https://corsa.eng.uci.edu/) website.

This website is based on and adapted from the [KIXLAB website](https://www.kixlab.org/) and its public source code, with permission from KIXLAB.

# How to Contribute

## Initializing & Running the Repo

Run the following commands:

1. Clone the repository:

   ```bash
   git clone https://github.com/UCI-CORSA/corsa-lab-revamp.git
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

## Adding Content / Creating Pull Requests

Please avoid committing directly to the `main` branch. Instead, create a separate branch and submit a Pull Request (PR).

1. Create a new branch from `main`:

   ```bash
   git checkout -b my-branch-name
   ```

2. Add and commit your changes:

   ```bash
   git status
   git add .
   git commit -m "Describe your changes here"
   ```

3. Push your branch:

   ```bash
   git push
   ```

4. Go to the [Corsa Lab website repository](https://github.com/UCI-CORSA/corsa-lab-revamp) and create a new Pull Request for your branch.

5. After review, the changes can be merged into `main`.

### People

1. Go to `src/data/members.ts`.

2. Add a new entry anywhere in `MEMBERS`. Follow the format indicated in `interface Props`.

3. Use the key format `[firstName][lastName]`, without middle names or aliases.

   Example:

   ```text
   John David Smith -> johnsmith
   ```

4. For the profile picture, use an image with a 1:1 aspect ratio, consistent with the existing member images. A suggested size is 500x500 px.

5. Place the image inside `public/members/` and make sure the filename exactly matches the value entered in the `img` field in `members.ts`, including the file extension.

6. To add a former member instead of a current one, also set the following fields so they show up under "Alumni" instead of their `position` section:

   ```typescript
   isAlumni: true,
   endYear: 2024, // year they left the lab (used for sorting, newest first)
   endSeason: 'Spring', // season they left: 'Winter' | 'Spring' | 'Summer' | 'Fall'
   currentPosition: 'Software Engineer at Google', // shown on their alumni card
   ```

### News

1. Go to `src/data/posts.ts`.
2. Add a new entry at the top of `POSTS`. Follow the format indicated in `interface Props`.
3. For longer text or images, create a separate `.md` file in `public/posts/` and enter its path in the `contentMdFilePath` field.
4. If the post includes images, place them inside `public/posts/postImages/` and reference their paths from the Markdown file.

### Publications

1. Go to `src/data/publications.ts`.

2. Add a new entry at the top of `PUBLICATIONS`. Follow the format indicated in `interface Props`.

3. In the `authors` field, Corsa Lab members should be referenced as:

   ```typescript
   MEMBERS.firstnamelastname
   ```

   This ensures that Corsa Lab members are displayed prominently among the authors.

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

### Research

1. Go to `src/data/research.ts`.
2. Add a new entry to `RESEARCH_PROJECTS`. Follow the format indicated in `interface Props`.
3. Place the project image inside `public/images/research/` and make sure the filename exactly matches the `image` field.

## Development

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Noto Sans, a Google Font.

## Attribution

The design and codebase of this website were adapted from the [KIXLAB website](https://www.kixlab.org/) and its public GitHub repository, with permission from KIXLAB.
