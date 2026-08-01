---
aliases:
  - Manage a plugin or theme entry
description: Review scanner results, manage releases, edit attribution, and transfer ownership for a plugin or theme entry.
permalink: community-directory/manage-entry
publish: true
---

From the **Plugins** or **Themes** page in the sidebar, under **Your entries**, select an entry to manage it.

## Entry actions

At the top of the entry page, you can:

- **View listing**: open the [[Public plugin or theme listing|entry's public page]] in the community directory.
- **Edit listing**: edit the entry's public description and details, covered below.
- Select **...** for more actions:
  - **Check for new releases**: manually check GitHub for a new release.
  - **Request review**: request a new automated review of the entry.
  - **View on GitHub**: open the entry's repository on GitHub.
  - **Archive**: removes the entry from the directory and prevents new installations. Select **Yes, archive** to confirm.

## Edit listing

Select **Edit listing** to update the entry's public details:

- **Icon**: select **Choose icon** to change the entry's icon, and select a background color from the swatches. Select the trash icon to remove the icon.
- **Short description**: a brief, plain-English summary, up to 200 characters.
- **Long description**: a more detailed, plain-English description, up to 1000 characters.
- **Categories**: up to 3 categories that describe the entry. Drag to reorder them; the first category is used as the **Primary** category. Select the trash icon to remove a category.
- **Payments**: whether the entry is **Free**, **Paid**, or **Optional payment**.
- **Screenshots**: up to 5 screenshots. Recommended size 1200 by 800px (3:2 ratio). JPEG, PNG, or WebP, up to 5 MB each.
- **Mobile screenshots**: up to 5 screenshots for mobile. Recommended size 900 by 1600px (9:16 ratio). JPEG, PNG, or WebP, up to 5 MB each.

Select **Save** to apply your changes, or **Cancel** to discard them.

## Reviews

Select **Review branch** to preview a scan without requiring a release. In **Branch, tag, or commit SHA**, optionally enter what to scan, or leave it blank to use the default branch, then select **Run preview scan**.

Each review shows its **Date**, **Version**, **Commit**, and status, for example **Completed**.

Plugins and themes go through the same review sections, but the specific checks and warnings within each section differ depending on the entry type. Results are grouped into sections, each with a copy icon to copy that section's content:

- **Manifest**: issues with `manifest.json`, such as missing fields or formatting.
- **Releases**: issues with the GitHub release assets, such as unsupported extra files.
- **Source code**: issues found in the plugin or theme's source code, such as disallowed packages or vulnerable dependencies.
- **Build verification**: whether the published release assets were reproduced byte-for-byte from the repository's source, so users can trust they're running the code visible in the repository.

Each result has a severity: **Warning**, **Recommendation**, or **Pass**.

## Current release

Shows the entry's **Version**, when it was **Published**, **Total releases**, and **Total downloads**.

## Repository

Shows the linked **GitHub** repository, when it was **Last pushed**, its **Stars**, and **Open issues** count.

## Attribution

Under **Attribution**, manage public credit for the listing. Attribution doesn't grant edit permissions, and never changes who owns the entry.

- Select **Add contributor** to credit someone else.
- Use the up and down arrows to reorder contributors.
- Select the trash icon to remove a contributor.

## Transfer ownership

Under **Ownership**, select **Transfer ownership** to transfer ownership of the entry to someone else.
