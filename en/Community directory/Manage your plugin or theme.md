---
aliases:
  - Manage a plugin or theme entry
description: Review scanner results, manage releases, edit attribution, and transfer ownership for a plugin or theme entry.
permalink: community-directory/manage-entry
publish: true
---

From the **Plugins** or **Themes** page in the sidebar, under **Your entries**, select an entry to manage it. From here you can also select **View listing** to open the entry's public listing page on the community directory, or open the **...** menu to view the repository on GitHub. For an explanation of what a listing page shows, refer to the [help docs](https://help.obsidian.md/community-directory).

## Entry overview

The entry page shows the current version and when it was published, along with the total number of releases and downloads. It also shows the linked GitHub repository, including when it was last pushed, its star count, and its open issue count.

If a release you've published isn't reflected yet, it may be because the directory check has not yet run since your release. To check immediately, open the **...** menu and select **Check for new releases**.

If your plugin uses a [[#Add a private source repository|private source repository]], this section also shows a warning if the GitHub App has lost read access to it, until access is restored.

## Fix a failed review

After each release, the directory scans your `manifest.json`, GitHub release assets, and source code, and verifies that the build matches what's committed. Results are grouped into sections covering the manifest, the release assets, the source code, and build verification, and each result is rated as an error, a warning, a recommendation, or a pass.

Address any items in your repository, then publish a new release to trigger a fresh review. To force an immediate recheck instead of waiting for the periodic check, open the **...** menu and select **Request review**.

> [!tip] Warnings don't block your submission, but we recommend addressing them where you can.

To preview a scan before creating a release, select **Review branch**, optionally enter a branch, tag, or commit SHA, or leave it blank to use the default branch, then select **Run preview scan**.

If you see a warning that your repository doesn't have a recognized license despite having one, refer to [[Frequently asked questions#Why do I get a "The repository does not have a recognized license" warning, despite having a valid license?|the FAQ]].

## Update your listing

Select **Edit listing** to update the entry's icon, short and long description, categories, payment type, and screenshots, then select **Save**.

If you're unsure whether your entry counts as free, paid, or optional payment, refer to [[Frequently asked questions#What's the difference between Free, Optional payment, and Paid?|the FAQ]].

Screenshots can include up to 5 desktop images at 1200 by 800 pixels, and up to 5 mobile images at 900 by 1600 pixels, as JPEG, PNG, or WebP files up to 5 MB each.

## Add a private source repository

Plugins can keep their source code in a private repository, and only make a repository with built release assets public. Submit your plugin as usual through [[Set up and claim#Add a plugin or theme|the submission form]], with your public repository as the GitHub repository URL. Then install the [Obsidian Community directory GitHub App](https://github.com/apps/obsidian-community-directory) on your private repository to grant it read access. The GitHub App will walk you through the steps to add the private source repository for scanning.

The directory verifies that your public release's build output matches what it reads from the private repository, so users can still trust that the release matches the source. If the GitHub App ever loses read access to the private repository, a warning appears under [[#Entry overview|Entry overview]] until access is restored.

## Credit a contributor

Attribution gives someone public credit on the listing without granting edit access, and never changes who owns the entry. Select **Add contributor** to credit someone, use the up and down arrows to reorder contributors, or select the trash icon to remove one.

## Transfer ownership

Choose who to transfer the entry to, either an organization you belong to or someone else by their community directory handle, not their GitHub handle, then select **Transfer**.

The new owner is credited as an author automatically, since edit rights move with ownership. If you'd rather not remain credited, select **Remove the previous owner's author credit** to exclude yourself from the entry's attribution instead.

This transfers ownership within the community directory only. If you've moved the entry's repository to a different GitHub user, refer to [[Frequently asked questions#How do I transfer my plugin to a different GitHub user?|the FAQ]] instead.

## Archive your entry

Archiving removes the entry from the directory and prevents new installations. Open the **...** menu, select **Archive**, then confirm by selecting **Yes, archive**.

To unarchive your entry, go to the same menu and select **Unarchive**.
