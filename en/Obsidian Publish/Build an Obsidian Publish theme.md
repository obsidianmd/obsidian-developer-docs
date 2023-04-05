You can build themes for your [Obsidian Publish](https://help.obsidian.md/Obsidian+Publish/Introduction+to+Obsidian+Publish) site. Themes for Obsidian Publish use the same [[CSS variables]] as the Obsidian app along with [[CSS variables#Obsidian Publish|Publish-specific CSS variables]].

To build a theme for your site:

1. Add a file called `publish.css` to the root folder of your vault.
2. Publish `publish.css` to enable the theme on your live Publish site.

**Example:**

```css
.published-container {
  --readable-width: 1000px;
  --bold-weight: 600;
  /* ... CSS variables */
}
.theme-light {
  --background-primary: #ebf2ff;
  /* ... CSS color variables for light mode */
}
.theme-dark {
  --background-primary: #1f2a3f;
  /* ... CSS color variables for dark mode */
}
```

For more information on how to customize your site, refer to [Customize your site](https://help.obsidian.md/Obsidian+Publish/Customize+your+site).
