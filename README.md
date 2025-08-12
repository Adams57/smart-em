# Drilling Intervention and Activity Planner (DIAP)

## Installation

- npm ci or npm i or use yarn.
- copy .env.example to .env and fill out values appropriately
- If using VSCode please install eslint and editorconfig extension before you begin writing code

## Branch naming

- Please ensure your working branch name includes the id of your task from clickup.
- We use semantic git when naming branches (here)[https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716]
- So if your task ID is #123 and your ticket's title is "Do stuff" feel free to name your branch feature/do-stuff/#123

## Creating PRs

- Put the task id on your PR title eg "[#123] Did stuff to app"

# Important notes

- If you want to use a primevue component check the `config/primevue.ts` file, it may already be installed there if it isn't, you'll probably want to import it there.
- If you create a global component(a component that is being used in a lot of files), create it in the `components` folder
  and install it in `config/component.ts`.
- Images are mixed between pngs and svgs. We should attempt to make just about every image an svg
- User Dynamic imports
- Types for api responses to `types/responses/[api].ts`
