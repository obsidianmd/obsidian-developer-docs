If you want to share your theme with the Obsidian community, the best way is to submit it to the [official list of themes](https://github.com/obsidianmd/obsidian-releases/blob/master/community-css-themes.json). Once we've reviewed and published your theme, users can install it directly from within Obsidian. It'll also be featured in the [plugin directory](https://obsidian.md/plugins) on the Obsidian website.

You only need to submit the initial version of your theme. After your theme has been published, users can automatically download new releases from GitHub directly from within Obsidian.

## Prerequisites

To complete this guide, you'll need:

- A [GitHub](https://github.com/signup) account.

## Before you begin

Before you submit your theme, make sure you have the following files in the root folder of your repository:

- A `README.md` that describes the theme.
- A `LICENSE` that determines how others are allowed to use the theme and its source code. If you need help to pick a license for your theme, refer to [Choose a License](https://choosealicense.com/).
- A screenshot of your theme to be displayed in the community theme store. Recommended image dimensions: 512 x 288 pixels.
- A `manifest.json` that describes your theme. For more information, refer to [[Manifest]].

## Step 1: Publish your theme to GitHub

> [!note] Template repositories
> If you created your theme from one of our template repositories, you may skip this step.

To review your theme, we need to access to the source code on GitHub. If you're unfamiliar with GitHub, refer to the GitHub docs for how to [Create a new repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository).

## Step 2: Submit your theme for review

In this step, you'll submit your theme to the Obsidian team for review.

1. In [community-css-themes.json](https://github.com/obsidianmd/obsidian-releases/edit/master/community-css-themes.json), add a new entry at the end of the JSON array. The following example shows the entry for the [Minimal](https://github.com/kepano/obsidian-minimal) theme.

   ```json
   {
     "name": "Minimal",
     "author": "kepano",
     "repo": "kepano/obsidian-minimal",
     "screenshot": "dark-simple.png",
     "modes": ["dark", "light"]
   },
   ```

   - `name` and `author` determines how your plugin appears to the user, and should match the corresponding properties in your [[Manifest]].
   - `repo` is the path to your GitHub repository. For example, if your GitHub repo is located at https://github.com/your-username/your-repo-name, the path is `your-username/your-repo-name`.
   - `screenshot` is the path to a screenshot of your theme. The screenshot looks best with a 16:9 aspect ratio. Recommended image dimensions: 512 x 288 pixels.
   - `modes` lists the color modes that your theme supports.

   Remember to add a comma after the closing brace, `}`, of the previous entry.

2. Select **Commit changes...** in the upper-right corner.
3. Select **Propose changes**.
4. Select **Create pull request**.
5. Select **Preview**, and then select **Community Theme**.
6. Click **Create pull request**.
7. In the name of the pull request, enter "Add [...] theme", where [...] is the name of your theme.
8. Fill in the details in the description for the pull request. For the checkboxes, insert an `x` between the brackets, `[x]`, to mark them as done.
9. Click **Create pull request** (for the last time 🤞).

You've now submitted your theme to the Obsidian theme directory. Sit back and wait for us to review your submission.

> [!question] How long does it take to review my theme?
> The time it takes to review your submission depends on the current workload of the Obsidian team. The team is still small, so please be patient while you wait for your theme to be reviewed. We're currently unable to give any estimates on when we'll be able to review your submission.

## Step 4: Address review comments

Once a reviewer has reviewed your theme, they'll add a comment to your pull request with the result of the review. The reviewer may require that you update your theme, or they can offer suggestions on how you can improve it.

Address any required changes and update the GitHub release with the new changes. Leave a comment on the PR to let us know you've addressed the feedback. Don't open a new PR.

We'll publish the theme as soon we've verified that all required changes have been addressed.

> [!note]
> While only Obsidian team members can publish your theme, other community members may also offer to review your submission in the meantime.

## Next steps

Once we've reviewed and published your theme, it's time to announce it to the community:

- Announce in [Share & showcase](https://forum.obsidian.md/c/share-showcase/9) in the forums.
- Announce in the `#updates` channel on [Discord](https://discord.gg/veuWUTm). You need the [`developer` role](https://discord.com/channels/686053708261228577/702717892533157999/830492034807758859) to post in `#updates`.
