#tutorials

## Overview

Obsidian Publish allows you to customize the look of your site using CSS. This guide explains how you can create a custom Publish theme.

## Create and enable Publish themes

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

## Best practices for Publish themes

### Obsidian App and Obsidian Publish are different contexts

Obsidian Publish shares common code and UI principles with Obsidian App, but also has some important differences that you should consider when creating themes. A few rules of thumb to keep in mind:

- Avoid complex selectors, use the available CSS variables instead.
- Avoid including CSS selectors and rules that are specific to Obsidian App.
- Keep CSS file size small so it loads fast for visitors.
- Consider compatibility across browsers and screen sizes.

### App-specific and Publish-specific CSS rules

While Obsidian App and Obsidian Publish share some common code, most App themes are designed to target CSS classes that are not present in the Publish context. For this reason, we recommend building Publish themes from the ground up, to minimize the amount of unnecessary code.

### File size

Obsidian App themes are stored locally on the user's device, whereas Obsidian Publish themes are loaded each time a user vists the site. For this reason, Obsidian Publish themes should be mindful of file size.

Keeping your theme file small will avoid [flashes of unstyled content](https://en.wikipedia.org/wiki/Flash_of_unstyled_content), and load faster on a variety of devices and internet connections. Ideally your `publish.css` file should be as small as possible.

In the App context it is acceptable to embed fonts and images in the CSS file using base64 encoding. In the Publish context, we recommend that you avoid this approach, especially if it leads to larger file sizes (multiple megabytes) that may block rendering when a visitor accesses the site.

### Browser compatibility

Visitors to Publish sites may use older browsers that are not compatible with new CSS features. For this reason we recommend being conservative with advanced CSS features in the Publish context. This is in contrast to Obsidian App themes which target a narrow scope of rendering engines (recent versions of Chromium/Blink) that support newer browser features. Try searching [caniuse.com](https://caniuse.com/) to see which CSS features are broadly available across browsers.

### Small screens and mobile devices

Obsidian Publish has two breakpoints by default:

| Breakpoint | Device | Effect | 
| ----------- | - | - |
| 1000px | Tablet | Right sidebar is hidden |
| 750px | Mobile | Left and right sidebars are hidden. If enabled, navigation is accessible via hamburger menu in the top left corner |

You can target these devices using CSS. Any rules defined outside of the `@media` query will apply to all devices.

```css
@media screen and (min-width: 1000px) {
  /* ... rules and variables for screens larger than tablet */
}
@media screen and (max-width: 1000px) {
  /* ... rules and variables for tablet devices and smaller */
}
@media screen and (max-width: 750px) {
  /* ... rules and variables for mobile devices and smaller */
}
```

## Optional UI features and components

The following elements can be turned on or off in the Publish site settings and influence the layout of the site.

#### Reading experience

- **Readable line length** sets a maximum width for notes and centers the content on wide screens.
- **Theme toggle** displays a switch for light/dark mode.
- **Stacked notes** enables notes to stack and scroll horizontally when links are clicked, similar to [Tab stacks](https://help.obsidian.md/User+interface/Use+tabs+in+Obsidian#Stack+tab+groups) in the Obsidian App.

#### Components

- **Navigation** adds a left sidebar similar with a list of folders and files.
- **Search** displays a search input field, it may be positioned in the left sidebar, right sidebar or top navigation depending on which UI elements are active.
- **Backlinks** displays a list of backlinks at the bottom of the page.
- **Graph** displays the local graph in the right sidebar.
- **Table of contents** displays an outline of headings in the current page in the right sidebar.

## CSS variables

Theming for Obsidian Publish is made simple with CSS variables. [Learn more about CSS variables and how to use them.](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) 

The list of CSS variables available for customization fall into two groups:

- [[App CSS variables]] are inherited from the Obsidian App theme. These primarily control the colors and styling of the content.
- [[Publish CSS variables]] control the elements specific to Obsidian Publish.