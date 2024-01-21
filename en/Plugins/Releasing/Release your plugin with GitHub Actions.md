Manually releasing your plugin can be time-consuming and error-prone. In this guide, you'll configure your plugin to use [GitHub Actions](https://github.com/features/actions) to automatically create a release when you create a new tag.

1. In the root directory of your plugin, create a file called `release.yml` under `.github/workflows` with the following content:

   ```yml
   name: Release Obsidian plugin

   on:
     push:
       tags:
         - "*"

   jobs:
     build:
       runs-on: ubuntu-latest

       steps:
         - uses: actions/checkout@v3

         - name: Use Node.js
           uses: actions/setup-node@v3
           with:
             node-version: "18.x"

         - name: Build plugin
           run: |
             npm install
             npm run build

         - name: Create release
           env:
             GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
           run: |
             tag="${GITHUB_REF#refs/tags/}"

             gh release create "$tag" \
               --title="$tag" \
               --draft \
               main.js manifest.json styles.css
   ```

2. In your terminal, commit the workflow.

   ```bash
   git add .github/workflows/release.yml
   git commit -m "Add release workflow"
   git push origin main
   ```

3. Browse to your repository on GitHub and select the **Settings** tab. Expand the **Actions** menu in the left sidebar, navigate to the **General** menu, scroll to the **Workflow permissions** section, select the **Read and write permissions** option, and save.

4. Create a tag that matches the version in the `manifest.json` file.

   ```bash
   git tag -a 1.0.1 -m "1.0.1"
   git push origin 1.0.1
   ```

   - `-a` creates an [annotated tag](https://git-scm.com/book/en/v2/Git-Basics-Tagging#_creating_tags).
   - `-m` specifies the name of your release. For Obsidian plugins, this must be the same as the version.

5. Browse to your repository on GitHub and select the **Actions** tab. Your workflow might still be running, or it might have finished already.

6. When the workflow finishes, go back to the main page for your repository and select **Releases** in the sidebar on the right side. The workflow has created a draft GitHub release and uploaded the required assets as binary attachments.

7. Select **Edit** (pencil icon) on the right side of the release name.

8. Add release notes to let users know what happened in this release, and then select **Publish release**.

You've successfully set up your plugin to automatically create a GitHub release whenever you create a new tag.

- If this is the first release for this plugin, you're now ready to [[Submit your plugin]].
- If this is an update to an already published plugin, your users can now update to the latest version.
