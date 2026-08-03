---
aliases:
  - Plugin and theme listing page
description: What a plugin or theme's public listing page in the Obsidian Community directory shows to visitors.
permalink: community-directory/listing
publish: true
---

Each plugin and theme has a public listing page in the community directory, for example `https://community.obsidian.md/plugins/<id>` or `https://community.obsidian.md/themes/<id>`. Select **View listing** from [[Manage your plugin or theme|the entry's management page]] to open it.

## Header

- The entry's icon and name, with an **Official** badge if it was made by its original creators.
- The author's icon and name, and the entry's total downloads.
- A short description.
- **Add to Obsidian**: opens the entry directly in Obsidian to install it.

## Overview

The **Overview** tab shows the entry's screenshots, its long description, an excerpt of its `README.md`, and a grid of **Related plugins** or **related themes** in the same category.

Relative links and images in your README (for example, `./images/screenshot.png`) are automatically rewritten to resolve against your repository, so they display correctly on the listing page.

## Scorecard

The **Scorecard** tab shows automated health and review metrics for the entry.

### Health

An overall health rating, for example **Excellent**, broken down into:

- **Hygiene**: whether a README, license, contributing guide, and description are present.
- **Maintenance**: recent commit and release activity.
- **Responsiveness**: how many issues have been closed, and how many contributors have been active recently.
- **Adoption**: installation and star counts.

### Review

The result of the latest automated review, for example **Passed**, grouped into:

- **Passed**: checks the entry passed, such as no known vulnerable dependencies, no obfuscated code, verified GitHub artifact attestations, and which Obsidian APIs the entry uses, for example **Vault Read** or **Vault Write**.
- **Disclosures**: things the entry does that aren't necessarily issues, but that users should be aware of, such as making requests to external domains.
- **Other**: additional notes, such as using browser storage instead of Obsidian's plugin data APIs.

## Updates

The **Updates** tab lists the entry's release history, with each release's version and date. Select **View all releases on GitHub** to see the full history in the entry's repository.

## Sidebar

Alongside the entry's tabs, the sidebar shows:

- **Health** and **Review** summaries, matching the Scorecard tab.
- **About**: the entry's long description.
- **Details**: metadata such as current version, when it was last updated and created, its number of updates, downloads, compatible Obsidian version, supported platforms, and license.
- **Sponsor**: a **Support** link, if the author added [[Getting started#Add funding links|funding links]].
- **Author**: the author's or organization's icon, name, and links to their other profiles.
