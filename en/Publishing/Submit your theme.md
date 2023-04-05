If you want to share your theme with the Obsidian community, the best way is to submit it to the [official list of themes](https://github.com/obsidianmd/obsidian-releases/blob/master/community-css-themes.json). Once we've reviewed and published your theme, users can install it directly from within Obsidian. It'll also be featured in the [plugin directory](https://obsidian.md/plugins) on the Obsidian website.

You only need to submit the initial version of your theme. After your theme has been published, users can automatically download new releases from GitHub directly from within Obsidian.

## Prerequisites

To complete this guide, you'll need:

- [Git](https://git-scm.com/) installed on your local machine.
- A [GitHub](https://github.com/signup) account.

## Before you begin

Before you submit your theme, make sure you have the following files in the root folder of your repository:

- A `README.md` that describes the theme.
- A `LICENSE` that determines how others are allowed to use the theme and its source code. If you need help to pick a license for your theme, refer to [Choose a License](https://choosealicense.com/).
- A screenshot of your theme to be displayed in the community theme store. We recommend using an image of 1920×1080px.
- A `manifest.json` that describes your theme. For more information, refer to [[Manifest]].

## Step 1: Publish your theme to GitHub

> [!note] Template repositories
> If you created your theme from one of our template repositories, you may skip this step.

To review your theme, we need to access to the source code on GitHub. If you're unfamiliar with GitHub, refer to the GitHub docs for how to [Create a new repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository).

## Step 2: Submit your theme for review

In this step, you'll submit your theme to the Obsidian team for review.

1. Fork the [obsidian-releases](https://github.com/obsidianmd/obsidian-releases) repository on GitHub. For more information on how to fork a repository, refer to [Fork a repo](https://docs.github.com/en/get-started/quickstart/fork-a-repo).
2. In `community-css-themes.json`, create a new entry in the JSON array. The following example shows the entry for the [Minimal](https://github.com/kepano/obsidian-minimal) theme.

   ```json
   {
     "name": "Minimal",
     "author": "kepano",
     "repo": "kepano/obsidian-minimal",
     "screenshot": "dark-simple.png",
     "modes": ["dark", "light"],
     "branch": "master"
   },
   ```

   - `name` and `author` determines how your plugin appears to the user, and should match the corresponding properties in your [[Manifest]].
   - `repo` is the path to your GitHub repository. For example, if your GitHub repo is located at https://github.com/your-username/your-repo-name, the path is `your-username/your-repo-name`.
   - `screenshot` is the path to a screenshot of your theme.
   - `modes` lists the color modes that your theme supports.
   - (Optional) `branch` lets you specify the Git branch you want to use. It defaults to `master`, if omitted.

   Remember to add a comma after the closing brace, `}`, of the previous entry.

3. [Create a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request).
4. Follow the instructions in the description field for the pull request to create a pull request from the required template.
5. Click **Create pull request**.
6. Fill in the details in the description for the pull request. For the checkboxes, insert an `x` between the brackets, `[x]`, to mark them as done.
7. Click **Create pull request** (for the last time 🤞).

You've now submitted your theme to the Obsidian theme directory. Sit back and wait for the team to review your plugin. The time it takes to review your theme depends on the current workload of the Obsidian team. The team is still small, so please be patient while you wait for your plugin to be reviewed.

## Step 3: Address review comments

Once a reviewer has reviewed your theme, they'll add a comment to your pull request with the result of the review. The reviewer may require that you update your theme, or they can offer suggestions on how you can improve it.

Address any required changes and update the GitHub release with the new changes.

We'll publish the theme as soon we've verified that all required changes have been addressed.

> [!note]
> While only Obsidian team members can publish your theme, other community members may also offer to review your submission in the meantime.

## Next steps

Once we've reviewed and published your theme, it's time to announce it to the community:

- Announce in [Share & showcase](https://forum.obsidian.md/c/share-showcase/9) in the forums.
- Announce in the `#updates` channel on [Discord](https://discord.gg/veuWUTm). You need the [`developer` role](https://discord.com/channels/686053708261228577/702717892533157999/830492034807758859) to post in `#updates`.
