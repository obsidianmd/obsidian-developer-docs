---
aliases:
  - Community directory FAQ
description: Common questions about submitting, owning, and reviewing plugins and themes in the Obsidian Community directory.
permalink: community-directory/faq
publish: true
---

This page lists some common questions about the [[Community directory]].

## General

### Do I need a GitHub account to submit a plugin or theme?

Yes. The directory reviews your plugin or theme from its GitHub repository, and you need to [[Set up and claim#Connect your GitHub account|connect your GitHub account]] before you can submit or claim an entry.

### Do I need to resubmit my plugin or theme for every update?

No. You only need to submit the initial version through [[Set up and claim#Add a plugin or theme|the submission form]]. After that, making a new release is enough for users to receive the update, for the full walkthrough see [[Submit your plugin]] or [[Submit your theme]].

### What should I do when I get an "invalid identifier" error?

You can't change an entry's identifier after it's been published. Open a thread in the `#community-directory` channel on [Discord](https://discord.com/channels/686053708261228577/1514299829474558013) for help.

Be aware that changing the identifier resets all downloads for your plugin or theme, and requires all current users to reinstall it.

### What's the difference between the Owner and a contributor?

The **Owner** is whoever manages the entry, submits releases, and can transfer or delete it. **Attribution** just gives someone public credit on the listing. It doesn't grant edit permissions and never changes who owns the entry. For more information, refer to [[Manage your plugin or theme#Credit a contributor|Attribution]] and [[Manage your plugin or theme#Transfer ownership|Transfer ownership]].

### How do I transfer my plugin to a different GitHub user?

This is different from [[Manage your plugin or theme#Transfer ownership|transferring ownership]] in the community directory. Only admins can transfer a plugin to a different GitHub location. Create a post in the `#community-directory` channel on [Discord](https://discord.com/channels/686053708261228577/1514299829474558013) that includes the new and old repository locations, and whether you've received permission from the original author.

### Can an organization own a plugin or theme?

Yes. When you submit or edit an entry, you can set its **Owner** to yourself or to an [[Organizations|organization]] you belong to.

### What happens if I archive my plugin or theme?

Archiving removes the entry from the directory and prevents new installations. For more information, refer to [[Manage your plugin or theme#Archive your entry|Archive your entry]].

### Can I keep my plugin's source code private?

Yes. Keep your built release assets in a public repository as usual, and your source code in a separate private repository. For more information, refer to [[Manage your plugin or theme#Add a private source repository|Add a private source repository]].

## Payments

### What's the difference between Free, Optional payment, and Paid?

- **Free**: choose this if there are no payments whatsoever.
- **Optional payment**: choose this if you rely on a third-party service that requires payment, or if you lock certain features behind payment.
- **Paid**: choose this if your plugin or theme is accessible by payment only.

Some common misconceptions:

- Offering a free alternative to a paid service doesn't make your plugin free. Some people may not be able to use the alternative, or it may not offer similar features. Mark it **Optional payment**.
- A limited free trial doesn't make your plugin free. If you can't use the plugin without the trial, it's **Paid**.

For more information, refer to [[Manage your plugin or theme#Update your listing|Update your listing]].

## Reviews and scanning

### What does the automated review check?

Reviews are grouped into sections: **Manifest**, **Releases**, **Source code**, and **Build verification**. Each result is an **Error**, **Warning**, **Recommendation**, or **Pass**. For more information, refer to [[Manage your plugin or theme#Fix a failed review|Fix a failed review]].

### Which build script is used when scanning?

The scanner uses the first command it finds, in this order: `build`, `build:plugin`, `compile`. Make sure this is your production build command, since that's what gets evaluated.

### Why are my test or development files being included in the scan?

The scanner ignores files and directories that match a fixed list of patterns. Make sure yours are named identically:

```
node_modules, dist, build, pkg, test-vault, .pnpm-store, .obsidian,
esbuild.config.mjs, version-bump.mjs, automation,
*.test.*, *.tests.*, *.spec.*, *.specs.*, test, tests, __tests__, testUtils, e2e-tests,
mocks, __mocks__,
*.cjs, *.mjs, *.cts, *.mts,
vite, scripts, docs,
i18n, i18next, locale, locales, translations, l10n
```

### Why do I get a "The repository does not have a recognized license" warning, despite having a valid license?

The scanner fetches the license type from GitHub. This warning appears if GitHub reports **Custom license** for your repository, or if your license is formatted differently and couldn't be matched against the list of accepted license types.

If you're not sure what license to use, check out [choosealicense.com](https://choosealicense.com/).

### Do plugins and themes go through the same review?

They go through the same review sections, but the specific checks and warnings within each section differ depending on whether the entry is a plugin or a theme.

### Why is my new release not detected by the automated review?

The directory checks for new releases periodically. To request a check manually, select **...** on the entry's management page, then select **Check for new releases**. For more information, refer to [[Manage your plugin or theme#Entry overview|Entry overview]].

### Can I test a review before publishing a release?

Yes. Select **Review branch** from the entry's management page to preview a scan against any branch, tag, or commit SHA, without requiring a release. For more information, refer to [[Manage your plugin or theme#Fix a failed review|Fix a failed review]].

### How can I run the review checks locally?

Install the official [ESLint plugin](https://github.com/obsidianmd/eslint-plugin). Its README covers how to install and set it up.

## Organizations

### What's the difference between a member and an admin in an organization?

Members can edit the organization's entries. Admins can also edit the organization's public profile and manage its members. For more information, refer to [[Organizations]].

### What happens if I delete an organization?

Deleting an organization is permanent. It removes the organization, its members, any pending invitations, and its public profile. For more information, refer to [[Organizations#Delete an organization|Delete an organization]].
