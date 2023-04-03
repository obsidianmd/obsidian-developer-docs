### Create a Publish theme

To create a Publish theme, add your custom CSS rules to a file named `publish.css`. See the [[Publish CSS variables]] you can use to customize your site.

The contents of the `publish.css` file can be as simple as:

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

### Enable a Publish theme

To enable a custom theme for your Publish site, add the `publish.css` file to your vault, and publish it as you would any other file. [Learn more about customizing your Publish site](https://help.obsidian.md/Obsidian+Publish/Customize+your+site).
