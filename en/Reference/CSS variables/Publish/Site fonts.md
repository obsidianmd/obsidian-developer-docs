---
cssClass: reference
---

To load remote fonts we recommend using CSS with `@import` or defining your fonts with `@font-face` and an absolute URL. [Learn more.](https://css-tricks.com/snippets/css/using-font-face-in-css/)

For example you can use [Google Fonts](https://fonts.google.com/) in your `publish.css` file. Here's how you would use the font Poppins:

```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital@1&display=swap');

.published-container {
  --font-text-theme: 'Poppins';
}
```

## CSS variables

Publish-specific variables should be defined on the `.published-container`.

| Variable                 | Description                                           |
| ------------------------ | ----------------------------------------------------- |
| `--font-text-size`       | Font size for page text                               |
| `--font-text-theme`      | Font family for page text                             |
| `--font-monospace-theme` | Font family for code                                  |
| `--font-interface-theme` | Font family for interface elements such as navigation |
| `--font-mermaid`         | Font family for Mermaid diagrams                      |
| `--page-title-font`      | Font family for [[Site pages\|page titles]]                                                       |
