## Overview

The Obsidian App uses [Cascading Style Sheets](https://en.wikipedia.org/wiki/CSS) (CSS) to control the design of the user interface. CSS is the same markup language used for websites and web-based apps, which means you can find many resources online to help you learn how to use and edit CSS.

Obsidian includes hundreds of [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) that allow you to customize almost every aspect of the Obsidian UI. Default values for App CSS variables are defined alphabetically at the top of the `app.css` file. You can access `app.css` by using Developer Tools.

CSS variables make it easy to create custom Themes and Snippets for Obsidian. CSS variables are also useful to create Plugin UIs that feel cohesive with the Obsidian App and are compatible with Community Themes.

### CSS structure and levels of specificity

Obsidian's built-in variables are grouped into several categories. The variables are defined on selectors with low specificity to make it easier for you to override them.

Defined on the `.theme-light` and `.theme-dark` classes:

- **Theme colors** store the raw color values for light and dark mode

Defined on the `body` element:

- **Semantic color mappings** apply the theme colors to named variables for backgrounds, borders, text, etc
- **Structure variables** define abstracted values for font sizes, spacing, radiuses, layout
- **Content variables** define styling for blockquotes, callouts, code blocks, syntax highlighting, embeds, footnotes, headings, links, lists, tables, tags, and task lists
- **Component variables** define styling for user interface elements such as inputs, buttons, popovers