If you want to share your plugin with the Obsidian community, the best way is to submit it to the Obsidian Community directory at [community.obsidian.md](https://community.obsidian.md). Once we've reviewed and published your plugin, users can install it directly from within Obsidian. It'll also be featured in the [plugin directory](https://community.obsidian.md/plugins) on the Obsidian website.

You only need to submit the initial version of your plugin. After your plugin has been published, users can download new releases from GitHub directly from within Obsidian.

## Prerequisites

To complete this guide, you'll need:

- A [GitHub](https://github.com/signup) account.
- An [Obsidian](https://obsidian.md) account.

## Before you begin

Before you submit your plugin, make sure you have the following files in the root folder of your repository:

- A `README.md` that describes the purpose of the plugin, and how to use it.
- A `LICENSE` that determines how others are allowed to use the plugin and its source code. If you need help to [add a license](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/adding-a-license-to-a-repository) for your plugin, refer to [Choose a License](https://choosealicense.com/).
- A `manifest.json` that describes your plugin. For more information, refer to [[Manifest]].

Also make sure that you follow the [[Developer policies]] and the [[Submission requirements for plugins|submission requirements]] before you submit your plugin.

## Step 1: Publish your plugin to GitHub

> [!note] Template repositories
> If you created your plugin from one of our template repositories, you may skip this step.

To review your plugin, we need to access to the source code on GitHub. If you're unfamiliar with GitHub, refer to the GitHub docs for how to [Create a new repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository).

## Step 2: Create a release

In this step, you'll prepare a release for your plugin that's ready to be submitted.

1. In `manifest.json`, update `version` to a new version that follows the [Semantic Versioning](https://semver.org/) specification, for example `1.0.0` for your initial release. Versions supported only in the format `x.y.z`.
2. [Create a GitHub release](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository#creating-a-release). The "Tag version" of the release must match the version in your `manifest.json`.
3. Enter a name for the release, and describe it in the description field. Obsidian doesn't use the release name for anything, so feel free to name it however you like.
4. Upload the following plugin assets to the release as binary attachments:

   - `main.js`
   - `manifest.json`
   - `styles.css` (optional)

## Step 3: Submit your plugin to the community directory

In this step, you'll submit your plugin through the Obsidian Community directory.

1. Go to [community.obsidian.md](https://community.obsidian.md) and sign in with your Obsidian account.
2. Link your GitHub account to your profile. This lets the directory verify that you own the repository you're submitting.
3. In the sidebar, select **Plugins**, and then select **New plugin**.
4. Enter the URL of your GitHub repository, for example `https://github.com/your-username/your-repo-name`.
5. Review and agree to the [[Developer policies]], and confirm that you'll continue to support your plugin.
6. Select **Submit**.

The directory processes the `manifest.json` at the HEAD of your repository's default branch, so make sure it's accurate and committed before submitting. The `id` must be unique across all published plugins and can't contain `obsidian`.

When a user installs your plugin, Obsidian downloads `main.js`, `manifest.json`, and `styles.css` from the GitHub release whose tag matches the `version` in your manifest, so the release from Step 2 is required in addition to the committed manifest.

## Step 4: Address review feedback

After you submit, your plugin is reviewed automatically and the directory shows guidance for anything that needs to be corrected. To address feedback, update your repository and publish a new GitHub release with an incremented version.

You can edit the description and select **Publish** at any time, but your plugin won't be installable from within Obsidian until the automated review passes.

## Next steps

Once we've reviewed and published your plugin, it's time to announce it to the community:

- Announce in [Share & showcase](https://forum.obsidian.md/c/share-showcase/9) in the forums.
- Announce in the `#updates` channel on [Discord](https://discord.gg/veuWUTm). You need the [`developer` role](https://discord.com/channels/686053708261228577/702717892533157999/830492034807758859) to post in `#updates`.
