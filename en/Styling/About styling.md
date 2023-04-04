The Obsidian app uses [Cascading Style Sheets](https://en.wikipedia.org/wiki/CSS) (CSS) to control the design of the user interface. CSS is the same markup language used for websites and web-based apps, which means you can find many resources online to help you learn how to use and edit CSS.

Obsidian includes hundreds of [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) that enable consistently beautiful user interfaces.

## I'm building a plugin

By using the built-in CSS variables for you own custom elements, you can create native-looking user interfaces in your plugin that look beautiful no matter the theme.

**styles.css**:

```css
.todo-list {
  background-color: var(--background-secondary);
}
```

## I'm building a theme

By overriding the default values for the Obsidian CSS variables, you can create beautiful themes without the need for complex CSS selectors.

**theme.css**:

```css
.theme-dark {
  --background-primary: #18004F;
  --background-secondary: #220070;
}

.theme-light {
  --background-primary: #ECE4FF;
  --background-secondary: #D9C9FF;
}
```

To learn more about how to build a theme using CSS variables, refer to [[Build a theme]].