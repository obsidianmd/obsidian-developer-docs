This page lists our recommendations for building themes that are both reliable and maintainable. By following these guidelines, you can minimize the maintenance work to keep your theme updated with future versions of Obsidian.

For more information about general guidelines for developers, refer to [[Developer policies]].

## Use CSS variables

Since most of Obsidian's user interface uses CSS variables, you can create highly expressive themes by merely overriding the built-in CSS variables.

Override general variables under `body`, and colors under `.theme-light` or `.theme-dark`.

```css
:root {
  --input-focus-border-color: Highlight;
}

body {
  --font-text-size: 18px;
}

.theme-light {
  --background-primary: white;
}

.theme-dark {
  --background-primary: black;
}
```

## Use selectors with low specificity

Avoid overly complex selectors targeting specific classes. [[#Use CSS variables]] to keep your selectors simple.

The most common issues when maintaining a theme are due to broken selectors as a result of new versions of Obsidian, which may change class names and how elements are nested.

## Keep assets local

Per [[Developer policies]] community themes must not load remote assets, such as fonts and images, that are unavailable when the user is offline. Even if the user has access to the internet, loading remote assets may violate user privacy.

If you wish to submit your theme to the official Community Themes directory, your theme must not make network calls, and therefore all resources must be bundled into your theme. See our guide [[Embed fonts and images in your theme]].

## Avoid `!important` declarations

Declaring styles as `!important` prevents users from overriding styles from your theme using snippets.
