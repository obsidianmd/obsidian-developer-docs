You can build themes for your [Obsidian Publish](https://help.obsidian.md/Obsidian+Publish/Introduction+to+Obsidian+Publish) site. Themes for Obsidian Publish use the same [[CSS variables]] as the Obsidian app along with [[CSS variables#Obsidian Publish|Publish-specific CSS variables]].

> [!tip] See [[Build a theme]] for more in-depth information on the `body`, `:root`, `.theme-dark`, and `.theme-light` selectors.

To build a theme for your site:

1. Add a file called `publish.css` to the root folder of your vault.
	- You need to use a external editor to create this file, as Obsidian does not support editing CSS files.
2. Publish `publish.css` to enable the theme on your live Publish site.

**Example:**

```css
.published-container {
  --page-width: 800px;
  --page-side-padding: 48px;
  
  /* ... CSS variables for Publish that do not change when light or dark mode is enabled. They sometimes link to color variables in .theme-light or .theme-dark */
}

.theme-light {
  --background-primary: #ebf2ff;
  --h1-color: #000000;
 
  /* ... CSS color variables for when light mode is enabled */
}
.theme-dark {
  --background-primary: #1f2a3f;
  --h1-color: #ffffff;
  
  /* ... CSS color variables for when dark mode is enabled */
}
```

For more information on how to customize your site, refer to [Customize your site](https://help.obsidian.md/Obsidian+Publish/Customize+your+site).
