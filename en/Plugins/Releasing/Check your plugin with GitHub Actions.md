To catch TypeScript errors and Obsidian-specific plugin issues as soon as you push, you can configure [GitHub Actions](https://github.com/features/actions) to type-check and lint your plugin on every push and pull request.

Unlike [[Release your plugin with GitHub Actions|the release workflow]], which only runs when you push a new tag, this workflow runs continuously as you work, so problems surface before you cut a release.

1. In the root directory of your plugin, create a file called `lint.yml` under `.github/workflows` with the following content:

   ```yml
   name: Node.js build

   on:
     push:
       branches: ["**"]
     pull_request:
       branches: ["**"]

   jobs:
     build:
       runs-on: ubuntu-latest

       strategy:
         matrix:
           node-version: [20.x, 22.x, 24.x]
           # See supported Node.js release schedule at https://nodejs.org/en/about/releases/

       steps:
         - uses: actions/checkout@v6
         - name: Use Node.js ${{ matrix.node-version }}
           uses: actions/setup-node@v6
           with:
             node-version: ${{ matrix.node-version }}
             cache: "npm"
         - run: npm ci
         - run: npm run build --if-present
         - run: npm run lint
   ```

   The `node-version` matrix runs the job once per listed version, so you catch issues that only show up on a specific Node.js version your users' environments might use.

   In the sample plugin, `npm run build` type-checks your code with `tsc -noEmit` and produces a production bundle with esbuild, and `npm run lint` runs ESLint with [`eslint-plugin-obsidianmd`](https://www.npmjs.com/package/eslint-plugin-obsidianmd), which flags common Obsidian plugin API misuse and issues checked during submission review. If your plugin's `package.json` defines these scripts differently, the workflow runs whatever they're configured to do.

2. In your terminal, commit the workflow.

   ```bash
   git add .github/workflows/lint.yml
   git commit -m "Add lint workflow"
   git push origin main
   ```

3. Browse to your repository on GitHub and select the **Actions** tab to see the workflow run against your latest push.

From now on, GitHub runs this workflow automatically on every push and pull request, and reports build or lint failures directly on the commit or pull request.
