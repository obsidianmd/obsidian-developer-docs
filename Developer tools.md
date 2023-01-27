This page lists tools for plugin developers. While they're not required for building plugins, they can simplify plugin development.

## Obsidian Tools

[Obsidian Tools](https://github.com/obsidian-tools/obsidian-tools) is a collection of tools for plugin developers.

## Download all plugins locally

If you run into a problem, it can be helpful to see how others have solved it. By downloading the entire plugin library to your computer, you can search the source code to find inspiration.

- [konhi/obsidian-repositories-downloader](https://github.com/konhi/obsidian-repositories-downloader)
- [luckman212/obsidian-plugin-downloader](https://github.com/luckman212/obsidian-plugin-downloader)
- [claremacrae/obsidian-repos-downloader](https://github.com/claremacrae/obsidian-repos-downloader)

## Beta testing

Before you [[Submit your plugin]] your plugin, you may want to let users try it out first.

With the [BRAT](https://github.com/TfTHacker/obsidian42-brat) plugin, your beta testers can install the plugin even if it's not published yet.

## Badges

To add a badge with the number of downloads for your plugin, paste the following in your README and replace `<PLUGIN_ID>` with your plugin id:

```md
![Obsidian Downloads](https://img.shields.io/badge/dynamic/json?logo=obsidian&color=%23483699&label=downloads&query=%24%5B%22<PLUGIN_ID>%22%5D.downloads&url=https%3A%2F%2Fraw.githubusercontent.com%2Fobsidianmd%2Fobsidian-releases%2Fmaster%2Fcommunity-plugin-stats.json)
```

For example, here's the download count for the Calendar plugin:

![Obsidian Downloads](https://img.shields.io/badge/dynamic/json?logo=obsidian&color=%23483699&label=downloads&query=%24%5B%22calendar%22%5D.downloads&url=https%3A%2F%2Fraw.githubusercontent.com%2Fobsidianmd%2Fobsidian-releases%2Fmaster%2Fcommunity-plugin-stats.json)

> [!tip]
>
> If you'd like to customize the badge, use [Shields.io dynamic badge](https://shields.io/#dynamic-badge) with the following values:
>
> | Parameter | Value |
> |-|-|
> | `data type` | `json` |
> | `data url` | `https://raw.githubusercontent.com/obsidianmd/obsidian-releases/master/community-plugin-stats.json` |
> | `query` | `$["your-plugin-id"].downloads` |
>
> To add a logo, add `&logo=obsidian` to the image URL.
