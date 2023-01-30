If you want to share your plugin with the Obsidian community, the best way is to submit it to the [official list of plugins](https://github.com/obsidianmd/obsidian-releases/blob/master/community-plugins.json). Once your plugin has been reviewed, users can install your plugin directly from within Obsidian. It'll also be featured in the [plugin directory](https://obsidian.md/plugins) on the Obsidian website. In this guide, you'll submit your own plugin.

> [!caution]
> The purpose of this guide is to provide richer instructions for how to submit a plugin. Before you submit your plugin however, make sure that you have reviewed the [official instructions](https://github.com/obsidianmd/obsidian-sample-plugin#adding-your-plugin-to-the-community-plugin-list).

## Before you begin

To follow this guide, make sure you have the following files at the root of your repository:

- A `README.md` that describes the purpose of the plugin, and how to use it.
- A `LICENSE` that determines how others are allowed to use the plugin and its source code. If you need help to pick a license for your plugin, refer to [Choose a License](https://choosealicense.com/).
- A `manifest.json` that describes your plugin. For more information, refer to [[Manifest]].

## Step 1 — Create a release

In this step, you'll prepare a release for your plugin that's ready to be submitted.

1. In `manifest.json`, update `version` to a new version that follows the [Semantic Versioning](https://semver.org/) specification.

2. [Create a GitHub release](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository#creating-a-release).
   - The  "Tag version" of the release must match the version in your `manifest.json`.
   - Don't include a `v` in the tag version.
3. Enter a name for the release, and describe it in the description field.

4. Upload the following plugin assets to the release, as binary attachments:

   - `main.js`
   - `manifest.json`
   - `styles.css` (optional)

> [!tip]
> To automate the process of creating a release, refer to [Release your plugin with GitHub Actions](Release%20your%20plugin%20with%20GitHub%20Actions.md).

## Step 2 — Submit your plugin for review

In this step, you'll submit your plugin to the Obsidian team for review.

1. Fork the [obsidian-releases](https://github.com/obsidianmd/obsidian-releases) repository on GitHub. For more information on how to fork a repository, refer to [Fork a repo](https://docs.github.com/en/get-started/quickstart/fork-a-repo).

2. In `community-plugins.json`, create a new entry in the JSON array. The following example shows the entry for the [Recent Files](https://github.com/tgrosinger/recent-files-obsidian) plugin.

   ```json
   {
     "id": "recent-files-obsidian",
     "name": "Recent Files",
     "author": "Tony Grosinger",
     "description": "Display a list of recently opened files",
     "repo": "tgrosinger/recent-files-obsidian",
     "branch": "main"
   }
   ```

   - `id`, `name`, `author`, and `description` determines how your plugin appears to the user, and should match the corresponding properties in your [[Manifest]].
   - `id` is unique to your plugin. Search `community-plugins.json` to confirm that there's no existing plugin with the same id.
   - `repo` is the path to your GitHub repository. For example, if your GitHub repo is located at https://github.com/your-username/your-repo-name, the path is `your-username/your-repo-name`.
   - (Optional) `branch` lets you specify the Git branch you want to use. It defaults to `master`, if omitted.

   Remember to add a comma after the closing brace, `}`, of the previous entry.

3. [Create a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request).
4. Follow the instructions in the description field for the pull request to create a pull request from the required template.
5. Click **Create pull request**.
6. Fill in the details in the description for the pull request. For the checkboxes, insert an `x` between the brackets, `[x]`, to mark them as done.
7. Click **Create pull request** (for the last time 🤞).

You've now submitted your plugin to the Obsidian plugin directory. Sit back and wait for the team to review your plugin. The time it takes to review your plugin depends on the current workload of the Obsidian team. The team is still small, so please be patient while you wait for your plugin to be reviewed.

## Step 3 — Address review comments

Once a reviewer has reviewed your plugin, they'll add a comment to your pull request with the result of the review. The reviewer may require that you update your plugin, or they can offer suggestions on how you can improve it.

While only Obsidian team members can publish your plugin, other community members may also offer to review your submission in the meantime.

Users can install your plugin as soon as your pull request has been merged.

> [!tip] Want to help?
> If you'd like to help review community plugins, refer to the [Plugin Review Guidelines](https://liamca.in/Obsidian/Plugin+Review+Guide/index) by Liam Cain.

## Update an already published plugin

You only need to submit the initial version of your plugin. After that, users can automatically download any new updates to your plugin directly from within Obsidian.

To release a new update of your plugin, follow the instructions in [[#Step 1 — Create a release]].

For more information about how Obsidian pulls new versions of community plugins, refer to [How community plugins are pulled](https://github.com/obsidianmd/obsidian-releases#how-community-plugins-are-pulled).
