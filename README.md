# Corsa Lab Website

Repository for the redesigned [Corsa Lab](https://corsa.eng.uci.edu/) website.

This website is based on and adapted from the [KIXLAB website](https://www.kixlab.org/) and its public source code, with permission from KIXLAB.

# How to Contribute

## Initializing & Running the Repo

Run the following commands:

1. Clone the repository:

   ```bash
   git clone https://github.com/Lalalander5212/corsa-lab-revamp.git
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

4. Go to the [Corsa Lab website repository](https://github.com/Lalalander5212/corsa-lab-revamp) and create a new Pull Request for your branch.

5. After review, the changes can be merged into `main`.

### People

1. Go to `src/data/members.ts`.

2. Add a new entry at the top of `MEMBERS`. Follow the format indicated in `interface Props`.

3. Use the key format `[firstName][lastName]`, without middle names or aliases.

   Example:

   ```text
   Alex Tio Suryapranata -> alexsuryapranata
   ```

4. For the profile picture, use an image with a 1:1 aspect ratio, consistent with the existing member images. A suggested size is 500x500 px.

5. Place the image inside `public/members/` and make sure the filename exactly matches the value entered in the `img` field in `members.ts`, including the file extension.

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

## Development

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a Google Font.

## Attribution

The design and codebase of this website were adapted from the [KIXLAB website](https://www.kixlab.org/) and its public GitHub repository, with permission from KIXLAB.
