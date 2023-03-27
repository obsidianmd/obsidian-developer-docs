---
cssClass: reference
---

#reference

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

---

## Theme colors

Theme color variables define the raw color values used throughout the app. These variables are mapped to semantic color names.

Each variable is applied to both `.theme-light` and `.theme-dark` classes with appropriate values for light and dark mode. For example:

```css
/* Set the base colors for light and dark mode */
.theme-light {
  --color-base-00: #ffffff;
  --color-base-100: #000000;
}
.theme-light {
  --color-base-00: #000000;
  --color-base-100: #ffffff;
}
```

#### Base colors

The base color palette is a monochromatic set of values from light to dark, used for the backgrounds and borders throughout the app.

| Variable           | Default value (light mode) | Default value (dark mode) | 
| ------------------ | -------------------------- | ------------------------- |
| `--color-base-00`  | `#ffffff`                  | `#1e1e1e`                 |
| `--color-base-05`  | `#fcfcfc`                  | `#212121`                 |
| `--color-base-10`  | `#fafafa`                  | `#242424`                 |
| `--color-base-20`  | `#f6f6f6`                  | `#262626`                 |
| `--color-base-25`  | `#e3e3e3`                  | `#2a2a2a`                 |
| `--color-base-30`  | `#e0e0e0`                  | `#363636`                 |
| `--color-base-35`  | `#d4d4d4`                  | `#3f3f3f`                 |
| `--color-base-40`  | `#bdbdbd`                  | `#555555`                 |
| `--color-base-50`  | `#ababab`                  | `#666666`                 |
| `--color-base-60`  | `#707070`                  | `#999999`                 |
| `--color-base-70`  | `#5a5a5a`                  | `#bababa`                 |
| `--color-base-100` | `#222222`                  | `#dadada`                 |

#### Accent color

Accent color can be defined by the theme, and overidden by the user in Obsidian Appearance Settings. The accent color used to draw attention to interactive elements such as links, active states, and primary buttons.

The accent color is defined as three HSL variables (hue, saturation, lightness) that can be modified in CSS with `calc()`. Using [CSS calculations](https://developer.mozilla.org/en-US/docs/Web/CSS/calc) allows themes to create a variety of shades from the user's accent color.

| Variable     | Default value | Description       |
| ------------ | ------------- | ----------------- |
| `--accent-h` | `254`           | Accent hue        |
| `--accent-s` | `80%`           | Accent saturation |
| `--accent-l` | `68%`           | Accent lightness  |

#### Extended colors

Extended color variables define the broader range of colors used for status messages (errors, warnings, success), callouts, syntax highlighting, graph nodes, and Canvas elements.

The variables can use any valid CSS color units, however an additional RGB variable is also defined for each color. The RGB variable is used wherever semi-translucent RGBA colors are needed. For example:

```css
color: var(--color-red);
background-color: rgba(var(--color-red-rgb), 0.2);
```

The example above uses the standard color variable to set the text color, and the RGB variable to set a background color to red with 20% opacity.

| Variable             | Default value (light mode) | Default value (dark mode) |
| -------------------- | -------------------------- | ------------------------- |
| `--color-red`        | `#e93147`                  | `#fb464c`                 |
| `--color-orange`     | `#ec7500`                  | `#e9973f`                 |
| `--color-yellow`     | `#e0ac00`                  | `#e0de71`                 |
| `--color-green`      | `#08b94e`                  | `#44cf6e`                 |
| `--color-cyan`       | `#00bfbc`                  | `#53dfdd`                 |
| `--color-blue`       | `#086ddd`                  | `#027aff`                 |
| `--color-purple`     | `#7852ee`                  | `#a882ff`                 |
| `--color-pink`       | `#d53984`                  | `#fa99cd`                 |
| `--color-red-rgb`    | `233, 49, 71`              | `251, 70, 76`             |
| `--color-orange-rgb` | `236, 117, 0`              | `233, 151, 63`            |
| `--color-yellow-rgb` | `224, 172, 0`              | `224, 222, 113`           |
| `--color-green-rgb`  | `8, 185, 78`               | `68, 207, 110`            |
| `--color-cyan-rgb`   | `0, 191, 188`              | `83, 223, 221`            |
| `--color-blue-rgb`   | `8, 109, 221`              | `2, 122, 255`             |
| `--color-purple-rgb` | `120, 82, 238`             | `168, 130, 255`           |
| `--color-pink-rgb`   | `213, 57, 132`             | `250, 153, 205`           | 

#### Black and white

These variables define RGB values for black and white. These are used primarily to create semi-translucent masks with RGBA. We do not recommend changing these variables.


| Variable         | Default value (light mode) | Default value (dark mode) |
| ---------------- | -------------------------- | ------------------------- |
| `--mono-rgb-0`   | `255, 255, 255`            | `0, 0, 0`                 |
| `--mono-rgb-100` | `0, 0, 0`                  | `255, 255, 255`           | 

---

## Semantic color mappings

Color mappings are defined on the `body` element and are semantic names that refer to the [[App CSS variables#Theme colors|theme colors]] defined above. These semantic color names are used 

#### Background and border colors

| Variable                             | Description                   |
| ------------------------------------ | ----------------------------- |
| `--background-primary`               | Primary background            |
| `--background-primary-alt`           | Alternate background          |
| `--background-secondary`             | Secondary background          |
| `--background-modifier-hover`        | Hovered elements              |
| `--background-modifier-active-hover` | Active hovered elements       |
| `--background-modifier-border`       | Border color                  |
| `--background-modifier-border-hover` | Border color (hovered)        |
| `--background-modifier-border-focus` | Border color (focused)        |
| `--background-modifier-error-rgb`    | Error background, RGB value   |
| `--background-modifier-error`        | Error background              |
| `--background-modifier-error-hover`  | Error background (hovered)    |
| `--background-modifier-success-rgb`  | Success background, RGB value |
| `--background-modifier-success`      | Success background            | 
| `--background-modifier-message`      | Messages background           |
| `--background-modifier-form-field`   | Form field background         |

#### Text colors

| Variable                    | Description                                    |
| --------------------------- | ---------------------------------------------- |
| `--text-normal`             | Normal text                                    |
| `--text-muted`              | Muted text                                     |
| `--text-faint`              | Faint text                                     |
| `--text-on-accent`          | Text on accent background (if accent is dark)  |
| `--text-on-accent-inverted` | Text on accent background (if accent is light) |
| `--text-error`              | Error text                                     |
| `--text-success`            | Success text                                   |
| `--text-accent`             | Accent text                                    |
| `--text-accent-hover`       | Accent text (hover)                            |

#### Text backgrounds

| Variable              | Description                 |
| --------------------- | --------------------------- |
| `--text-selection`    | Selected text background    |
| `--text-highlight-bg` | Highlighted text background | 

#### Buttons and interactive element colors

| Variable                     | Description                                             |
| ---------------------------- | ------------------------------------------------------- |
| `--interactive-normal`       | Background for standard interactive elements            |
| `--interactive-hover`        | Background for standard interactive elements (hover)    |
| `--interactive-accent`       | Background for accented interactive elements            |
| `--interactive-accent-hsl`   | Background for accented interactive elements, HSL units | 
| `--interactive-accent-hover` | Background for accented interactive elements (hover)    |

---

## Structure

### Borders

| Variable         | Default value |
| ---------------- | ------------- |
| `--border-width` | `1px`         |

### Cursors

Variables for [[Cursor|cursors]] used in the app. Note that in the App context, Obsidian follows operating system conventions for cursors, not web conventions. This means interactive elements use the default arrow cursor (not the pointer). The pointer cursor is only used for links.

| Variable        | Default value | Description                     |
| --------------- | ------------- | ------------------------------- |
| `--cursor`      | `default`     | Cursor for interactive elements |
| `--cursor-link` | `pointer`     | Cursor for links                |

### Fonts

#### Font sizes

The Editor font size is defined by the user in Obsidian Appearance Settings and uses `--font-text-size` variable. Relative font sizes are primarily used in the Editor context, whereas fixed font sizes are used for UI elements.

| Variable            | Default value | Description |
| ------------------- | ------------- | ----------- |
| `--font-text-size`  | `16px`          | Defined by user in Appearance Settings            |
| `--font-smallest`   | `0.8em`       |             |
| `--font-smaller`    | `0.875em`     |             |
| `--font-small`      | `0.933em`     |             |
| `--font-ui-smaller` | `12px`        |             |
| `--font-ui-small`   | `13px`        |             |
| `--font-ui-medium`  | `15px`        |             |
| `--font-ui-larger`  | `20px`        |             |

#### Font weights

| Variable            | Default value |
| ------------------- | ------------- |
| `--font-thin`       | `100`           |
| `--font-extralight` | `200`           |
| `--font-light`      | `300`           |
| `--font-normal`     | `400`           |
| `--font-medium`     | `500`           |
| `--font-semibold`   | `600`           |
| `--font-bold`       | `700`           |
| `--font-extrabold`  | `800`           |
| `--font-black`      | `900`              |

### Icon sizes

Variables for icon sizes. Should be used in conjuction with Icon variables.

| Variable                 | Default value |
| ------------------------ | ------------- |
| `--icon-xs`              | `14px`        |
| `--icon-s`               | `16px`        |
| `--icon-m`               | `18px`        |
| `--icon-l`               | `18px`        |
| `--icon-xl`              | `32px`        |
| `--icon-xs-stroke-width` | `2px`         |
| `--icon-s-stroke-width`  | `2px`         |
| `--icon-m-stroke-width`  | `1.75px`      | 
| `--icon-l-stroke-width`  | `1.75px`      |
| `--icon-xl-stroke-width` | `1.25px`      |

### Line heights

| Variable               | Default value | Description                                                            |
| ---------------------- | ------------- | ---------------------------------------------------------------------- |
| `--line-height-normal` | `1.5`         | Default line height                                                    | 
| `--line-height-tight`  | `1.3`         | Used in search results, tree items, tooltips, and other smaller spaces |

### Spacing and padding

See [[Padding, margins, and spacing]]

| Variable      | Default value |
| ------------- | ------------- |
| `--size-2-1`  | `2px`         |
| `--size-2-2`  | `4px`         |
| `--size-2-3`  | `6px`         |
| `--size-4-1`  | `4px`         |
| `--size-4-2`  | `8px`         |
| `--size-4-3`  | `12px`        |
| `--size-4-4`  | `16px`        |
| `--size-4-5`  | `20px`        |
| `--size-4-6`  | `24px`        |
| `--size-4-8`  | `32px`        |
| `--size-4-9`  | `36px`        |
| `--size-4-12` | `48px`        |
| `--size-4-16` | `64px`        |
| `--size-4-18` | `72px`        | 

### Radiuses

Styling for radiused corners used on buttons, inputs, modals, etc

| Variable      | Default value |
| ------------- | ------------- |
| `--radius-s`  | `4px`         |
| `--radius-m`  | `8px`         |
| `--radius-l`  | `12px`        | 
| `--radius-xl` | `16px`        |

### Z-index

Controls the z-index position of elements, to defined the stacking order

| Variable               | Default value |
| ---------------------- | ------------- |
| `--layer-cover`        | `5`           |
| `--layer-sidedock`     | `10`          |
| `--layer-status-bar`   | `15`          |
| `--layer-popover`      | `30`          |
| `--layer-slides`       | `45`          |
| `--layer-modal`        | `50`          |
| `--layer-notice`       | `60`          |
| `--layer-menu`         | `65`          |
| `--layer-tooltip`      | `70`          |
| `--layer-dragged-item` | `80`              |

---

## Content

### Blockquotes

Styling for blockquotes

| Variable                        | Description                                 |
| ------------------------------- | ------------------------------------------- |
| `--blockquote-background-color` | Blockquote background color                 |
| `--blockquote-border-thickness` | Blockquote left border thickness            |
| `--blockquote-border-color`     | Blockquote left border color                | 
| `--blockquote-font-style`       | Blockquote font style (e.g. normal, italic) |
| `--blockquote-color`            | Blockquote text color                       |

### Bold text

Styling for bolded text

| Variable        | Description             |
| --------------- | ----------------------- |
| `--bold-weight` | Bolded text font weight |
| `--bold-color`  | Bolded text color       | 

### Callouts

[Callouts](https://help.obsidian.md/Editing+and+formatting/Callouts) have a title and content that can be styled independently

| Variable                       | Description                                                 |
| ------------------------------ | ----------------------------------------------------------- |
| `--callout-border-width`       | Callout border width                                        |
| `--callout-border-opacity`     | Callout border opacity                                      |
| `--callout-padding`            | Callout padding                                             |
| `--callout-radius`             | Callout radius                                              |
| `--callout-blend-mode`         | Callout blend mode, allows color mixing for nested callouts |
| `--callout-title-color`        | Callout title text color                                    |
| `--callout-title-padding`      | Callout title padding                                       |
| `--callout-title-size`         | Callout title font size                                     |
| `--callout-content-padding`    | Callout content padding                                     |
| `--callout-content-background` | Callout content background color                            | 

#### Callout type colors

Callout types have unique icons and colors. Types also have aliases, listed in description below.

| Variable              | Callout type                      |
| --------------------- | --------------------------------- |
| `--callout-bug`       | `bug`                             |
| `--callout-default`   | `default`, `note`                 |
| `--callout-error`     | `error`, `danger`                 |
| `--callout-example`   | `example`                         |
| `--callout-fail`      | `fail`, `failure`, `missing`      |
| `--callout-important` | `important`                       |
| `--callout-info`      | `info`                            |
| `--callout-question`  | `question`, `help`, `faq`         |
| `--callout-success`   | `success`, `check`, `done`        |
| `--callout-summary`   | `summary`, `abstract`, `tldr`     |
| `--callout-tip`       | `tip`, `hint`                     |
| `--callout-todo`      | `todo`                            |
| `--callout-warning`   | `warning`, `caution`, `attention` | 
| `--callout-quote`     | `quote`, `cite`                   |

### Checkboxes

Styling for checkboxes and text inside of task lists

| Variable                        | Description                                |
| ------------------------------- | ------------------------------------------ |
| `--checkbox-radius`             | Checkbox radius                            |
| `--checkbox-size`               | Checkbox height and width                  |
| `--checkbox-marker-color`       | Checkbox marker color for the check itself |
| `--checkbox-color`              | Checkbox background color                  |
| `--checkbox-color-hover`        | Checkbox background color (hover)          |
| `--checkbox-border-color`       | Checkbox unchecked border color            |
| `--checkbox-border-color-hover` | Checkbox unchecked border color (hover)    |
| `--checklist-done-decoration`   | Checkbox checked text decoration           |
| `--checklist-done-color`        | Checkbox checked text color                | 

### Code

Styling for code and preformatted text elements

| Variable             | Description           |
| -------------------- | --------------------- |
| `--code-background`  | Code background color | 
| `--code-white-space` | Code `white-space`    |
| `--code-size`        | Code font size        |

#### Syntax highlighting colors

Note that for technical reasons Obsidian currently uses two different syntax highlighting libraries for Edit and Read mode. The syntax highlighting does not perfectly match between the two modes.

| Variable             | Description              |
| -------------------- | ------------------------ |
| `--code-normal`      | Non-highlighted syntax   |
| `--code-comment`     | Comments                 |
| `--code-function`    | Functions                |
| `--code-important`   | Important, regex         |
| `--code-keyword`     | Keywords                 |
| `--code-operator`    | Operators                |
| `--code-property`    | Properties               |
| `--code-punctuation` | Punctuation              |
| `--code-string`      | Strings                  | 
| `--code-tag`         | Tags, symbols, constants |
| `--code-value`       | Values                   |

### Embeds

Styling for embeds and transclusions

| Variable                     | Description                                            |
| ---------------------------- | ------------------------------------------------------ |
| `--embed-max-height`         | Embed max height                                       |
| `--embed-canvas-max-height`  | Embedded Canvas element max height                     |
| `--embed-background`         | Embed background color                                 |
| `--embed-border-left`        | Embed left border, shorthand property                  |
| `--embed-border-right`       | Embed right border, shorthand property                 |
| `--embed-border-top`         | Embed top border, shorthand property                   |
| `--embed-border-bottom`      | Embed bottom border, shorthand property                |
| `--embed-padding`            | Embedd padding                                         |
| `--embed-font-style`         | Embed `font-style`                                     | 

### Footnotes

Styling for footnotes

| Variable          | Description        |
| ----------------- | ------------------ |
| `--footnote-size` | Footnote font size | 

### Headings

Styling for headings, from H1 to H6

| Variable               | Description                                  |
| ---------------------- | -------------------------------------------- |
| `--heading-formatting` | Text color for Markdown heading depth syntax |
| `--h1-color`           | H1 text color                                |
| `--h2-color`           | H2 text color                                |
| `--h3-color`           | H3 text color                                |
| `--h4-color`           | H4 text color                                |
| `--h5-color`           | H5 text color                                |
| `--h6-color`           | H6 text color                                |
| `--h1-font`            | H1 font family                               |
| `--h2-font`            | H2 font family                               |
| `--h3-font`            | H3 font family                               |
| `--h4-font`            | H4 font family                               |
| `--h5-font`            | H5 font family                               |
| `--h6-font`            | H6 font family                               |
| `--h1-line-height`     | H1 line height                               |
| `--h2-line-height`     | H2 line height                               |
| `--h3-line-height`     | H3 line height                               |
| `--h4-line-height`     | H4 line height                               |
| `--h5-line-height`     | H5 line height                               |
| `--h6-line-height`     | H6 line height                               |
| `--h1-size`            | H1 font size                                 |
| `--h2-size`            | H2 font size                                 |
| `--h3-size`            | H3 font size                                 |
| `--h4-size`            | H4 font size                                 |
| `--h5-size`            | H5 font size                                 |
| `--h6-size`            | H6 font size                                 |
| `--h1-style`           | H1 font style                                |
| `--h2-style`           | H2 font style                                |
| `--h3-style`           | H3 font style                                |
| `--h4-style`           | H4 font style                                |
| `--h5-style`           | H5 font style                                |
| `--h6-style`           | H6 font style                                |
| `--h1-variant`         | H1 font variant                              |
| `--h2-variant`         | H2 font variant                              |
| `--h3-variant`         | H3 font variant                              |
| `--h4-variant`         | H4 font variant                              |
| `--h5-variant`         | H5 font variant                              |
| `--h6-variant`         | H6 font variant                              |
| `--h1-weight`          | H1 font weight                               |
| `--h2-weight`          | H2 font weight                               |
| `--h3-weight`          | H3 font weight                               |
| `--h4-weight`          | H4 font weight                               |
| `--h5-weight`          | H5 font weight                               |
| `--h6-weight`          | H6 font weight                               | 

### Horizontal rules

Styling for horizontal rules

| Variable         | Description                      |
| ---------------- | -------------------------------- |
| `--hr-color`     | Horizontal rule border color     |
| `--hr-thickness` | Horizontal rule border thickness | 

### Italic

Styling for italic text

| Variable         | Description       |
| ---------------- | ----------------- |
| `--italic-color` | Italic text color | 

### Inline titles

Styling for inline titles. Inline titles can be activated by the user in Appearance Settings to show the filename inline (can be used instead of an H1).

| Variable                     | Description               |
| ---------------------------- | ------------------------- |
| `--inline-title-color`       | Inline title text color   |
| `--inline-title-font`        | Inline title font family  |
| `--inline-title-line-height` | Inline title line height  |
| `--inline-title-size`        | Inline title font size    |
| `--inline-title-style`       | Inline title font style   |
| `--inline-title-variant`     | Inline title font variant |
| `--inline-title-weight`      | Inline title font weight  | 

### Links

Obsidian supports three different types of links: 

- **Resolved internal links** link to an existing note in Obsidian
- **Unresolved internal links** link to a non-existing note in Obsidian
- **External links** link to an external URL/URI

| Variable                             | Description                               |
| ------------------------------------ | ----------------------------------------- |
| `--link-color`                       | Resolved link text color                  |
| `--link-color-hover`                 | Resolved link text color (hover)          |
| `--link-decoration`                  | Resolved link text decoration             |
| `--link-decoration-hover`            | Resolved link text decoration (hover)     |
| `--link-decoration-thickness`        | Resolved link text decoration thickness   |
| `--link-unresolved-color`            | Unresolved link text color                |
| `--link-unresolved-opacity`          | Unresolved link opacity                   |
| `--link-unresolved-filter`           | Unresolved link filter, e.g. `hue-rotate` |
| `--link-unresolved-decoration-style` | Unresolved link text decoration style     |
| `--link-unresolved-decoration-color` | Unresolved link text decoration color     |
| `--link-external-color`              | External link text color                  |
| `--link-external-color-hover`        | External link text color (hover)          |
| `--link-external-decoration`         | External link text decoration             |
| `--link-external-decoration-hover`   | External link text decoration (hover)     | 


### Lists

Styling for numbered (ordered) and bullet (unordered) lists

| Variable                        | Description                                   |
| ------------------------------- | --------------------------------------------- |
| `--list-indent`                 | Horizontal indentation depth for nested items |
| `--list-spacing`                | Vertical spacing between list items           |
| `--list-marker-color`           | List marker color                             |
| `--list-marker-color-hover`     | List marker color (hover)                     |
| `--list-marker-color-collapsed` | List marker color for collapsed items         |
| `--list-bullet-border`          | List bullet border                            |
| `--list-bullet-radius`          | List bullet radius                            |
| `--list-bullet-size`            | List bullet width/height                      | 
| `--list-bullet-transform`       | List bullet `transform` property                                              |
| `--list-numbered-style`         | `list-style-type` for numbered lists                                          |

### Tables

Styling for tables

| Variable                            | Description                           |
| ----------------------------------- | ------------------------------------- |
| `--table-background`                | Table background color                |
| `--table-border-width`              | Table border width                    |
| `--table-border-color`              | Table border color                    |
| `--table-white-space`               | Table `white-space` property          |
| `--table-header-background`         | Table header background color         |
| `--table-header-background-hover`   | Table header background color (hover) |
| `--table-header-border-width`       | Table header border width             |
| `--table-header-border-color`       | Table header border color             |
| `--table-header-font`               | Table header font family              |
| `--table-header-size`               | Table header font size                |
| `--table-header-weight`             | Table header font weight              |
| `--table-header-color`              | Table header text color               |
| `--table-text-size`                 | Cell font size                        |
| `--table-text-color`                | Cell text color                       |
| `--table-column-max-width`          | Column maximum width                  |
| `--table-column-alt-background`     | Alternating column background color   |
| `--table-column-first-border-width` | First column left border width        |
| `--table-column-last-border-width`  | Last column right border width        |
| `--table-row-background-hover`      | Row background color (hover)          |
| `--table-row-alt-background`        | Alternating row background color      |
| `--table-last-border-width`         | Last row bottom border width          | 

### Tags

Styling for tags

| Variable                   | Description                  |
| -------------------------- | ---------------------------- |
| `--tag-size`               | Tag font size                |
| `--tag-color`              | Tag text color               |
| `--tag-color-hover`        | Tag text color (hover)       |
| `--tag-decoration`         | Tag text decoration          |
| `--tag-decoration-hover`   | Tag text decoration (hover)  |
| `--tag-background`         | Tag background color         |
| `--tag-background-hover`   | Tag background color (hover) |
| `--tag-border-color`       | Tag border color             |
| `--tag-border-color-hover` | Tag border color (hover)     |
| `--tag-border-width`       | Tag border width         |
| `--tag-padding-x`          | Tag left/right padding       |
| `--tag-padding-y`          | Tag top/down padding         |
| `--tag-radius`             | Tag radius                   | 

---

## Interface elements



### Canvas

Styling for Canvas plugin

| Variable                    | Description                  |
| --------------------------- | ---------------------------- |
| `--canvas-background`       | Canvas background color      |
| `--canvas-card-label-color` | Canvas card label text color |
| `--canvas-dot-pattern`      | Canvas dot pattern color     |
| `--canvas-color-1`          | Canvas card color 1          |
| `--canvas-color-2`          | Canvas card color 2          |
| `--canvas-color-3`          | Canvas card color 3          |
| `--canvas-color-4`          | Canvas card color 4          |
| `--canvas-color-5`          | Canvas card color 5          |
| `--canvas-color-6`          | Canvas card color 6          |

### Blocks

Styling for rendered blocks in Live Preview

| Variable                     | Description                                            |     |
| ---------------------------- | ------------------------------------------------------ | --- |
| `--embed-block-shadow-hover` | Hover shadow for rendered embed blocks in Live Preview |     | 

### Dividers

Styling for dividers and resize handles between interface elements such as sidebars, tabs, and split panes. Vertical height variable is present to accomodate Obsidian's various window frame modes.

| Variable                    | Description                  |
| --------------------------- | ---------------------------- |
| `--divider-color`           | Divider border color         |
| `--divider-color-hover`     | Divider border color (hover) |
| `--divider-width`           | Divider border width         |
| `--divider-width-hover`     | Divider border width (hover) |
| `--divider-vertical-height` | Divider vertical height      | 

### Dragging

Styling for the drag ghost element that follows the cursor, e.g. dragging files in the file navigator, or items in the outline.

| Variable                  | Description                 |
| ------------------------- | --------------------------- |
| `--drag-ghost-background` | Drag ghost background color |
| `--drag-ghost-text-color` | Drag ghost text color       | 

### File layout

Styling for open files in the Editor

| Variable                    | Description                                           |
| --------------------------- | ----------------------------------------------------- |
| `--file-line-width`         | Width of a line when readable line width is turned on |
| `--file-folding-offset`     | Width of the line offset for fold indicators          |
| `--file-margins`            | File margins                                          |
| `--file-header-font-size`   | File header font size                                 |
| `--file-header-font-weight` | File header font weight                               |
| `--file-header-border`      | File header `border-bottom` property                  |
| `--file-header-justify`     | File header text alignment, uses `justify-content`    | 

### Graphs

Styling for local and global graphs

| Variable                  | Description           |
| ------------------------- | --------------------- |
| `--graph-controls-width`  | Graph controls width  |
| `--graph-text`            | Node text color       |
| `--graph-line`            | Line color            |
| `--graph-node`            | Resolved node color   | 
| `--graph-node-unresolved` | Unresolved node color |
| `--graph-node-focused`    | Focused node color    |
| `--graph-node-tag`        | Tag node color        |
| `--graph-node-attachment` | Attachment node color |

### Icons

Icons are used throughout the Obsidian interface, particularly for [[Clickable Icon]] buttons.

| Variable                  | Description                         |
| ------------------------- | ----------------------------------- |
| `--icon-size`             | Shorthand for icon width and length |
| `--icon-stroke`           | Shorthand for icon stroke width     |
| `--icon-color`            | Icon color                          |
| `--icon-color-hover`      | Icon color (hovered)                |
| `--icon-color-active`     | Icon color (active)                 |
| `--icon-color-focused`    | Icon color (focused)                |
| `--icon-opacity`          | Icon opacity                        |
| `--icon-opacity-hover`    | Icon opacity (hovered)              |
| `--icon-opacity-active`   | Icon opacity (active)               |
| `--clickable-icon-radius` | Clickable icon button radius        | 

### Indentation guides

Indentation guides are lines present in nested lists, such as bulleted lists, and in file navigator.

| Variable                           | Description                             |
| ---------------------------------- | --------------------------------------- |
| `--indentation-guide-width`        | Indentation guide border width          |
| `--indentation-guide-color`        | Indentation guide border color          |
| `--indentation-guide-color-active` | Indentation guide border color (active) | 

### Navigation

Styling for items and folders within file navigation and outline

| Variable                              | Description                                 |
| ------------------------------------- | ------------------------------------------- |
| `--nav-item-size`                     | Nav item font size                          |
| `--nav-item-color`                    | Nav item text color                         |
| `--nav-item-color-hover`              | Nav item text color (hover)                 |
| `--nav-item-color-active`             | Nav item text color (active)                |
| `--nav-item-color-selected`           | Nav item text color (selected)              |
| `--nav-item-color-highlighted`        | Nav item text color (highlighted)           |
| `--nav-item-background-hover`         | Nav item background color (hover)           |
| `--nav-item-background-active`        | Nav item background color (active)          |
| `--nav-item-background-selected`      | Nav item background color (selected)        |
| `--nav-item-padding`                  | Nav item padding                            |
| `--nav-item-parent-padding`           | Nav item padding for parent elements        |
| `--nav-item-children-padding-left`    | Nav item children left padding              |
| `--nav-item-children-margin-left`     | Nav item children left margin               |
| `--nav-item-weight`                   | Nav item font weight                        |
| `--nav-item-weight-hover`             | Nav item font weight (hover)                |
| `--nav-item-weight-active`            | Nav item font weight (active)               |
| `--nav-item-white-space`              | Nav item `white-space`                      |
| `--nav-indentation-guide-width`       | Nav item indentation guide border width     |
| `--nav-indetation-guide-color`        | Nav item indentation guide border color     |
| `--nav-collapse-icon-color`           | Nav item collapse chevron color             | 
| `--nav-collapse-icon-color-collapsed` | Nav item collapse chevron color (collapsed) |

#### Vault name

Styling for vault name in the file navigator

| Variable                   | Description |
| -------------------------- | ----------- |
| `--vault-name-font-size`   | Font size   |
| `--vault-name-font-weight` | Font weight |
| `--vault-name-color`       | Text color  | 

### Modals

Modals such as Settings, Community Plugins, Community Themes, Dialog boxes.

| Variable                          | Description                          |
| --------------------------------- | ------------------------------------ |
| `--modal-background`              | Modal background color               |
| `--modal-width`                   | Modal default width                  |
| `--modal-height`                  | Modal default height                 |
| `--modal-max-width`               | Modal maximum width                  |
| `--modal-max-height`              | Modal maximum height                 |
| `--modal-max-width-narrow`        | Narrow modal maximum width           |
| `--modal-border-width`            | Modal border thickness               |
| `--modal-border-color`            | Modal border color                   |
| `--modal-radius`                  | Modal radius                         |
| `--modal-community-sidebar-width` | Community plugin/theme sidebar width | 

#### Dialogs

Smaller modals primarily used for confirmations

| Variable              | Description           |
| --------------------- | --------------------- |
| `--dialog-width`      | Dialog default width  |
| `--dialog-max-width`  | Dialog maximum width  |
| `--dialog-max-height` | Dialog maximum height | 

### Inputs

#### Buttons

Styling for standard buttons

| Variable          | Description   |
| ----------------- | ------------- |
| `--button-radius` | Button radius | 

#### Color inputs

Styling for color inputs, e.g. accent color picker

| Variable          | Description         |
| ----------------- | ------------------- |
| `--swatch-radius` | Color swatch radius |
| `--swatch-height` | Color swatch height |
| `--swatch-width`  | Color swatch width  |
| `--swatch-shadow` | Color swatch shadow | 

#### Sliders

Styling for slider controls, e.g. font size and zoom

| Variable                      | Description                     |
| ----------------------------- | ------------------------------- |
| `--slider-thumb-border-width` | Slider thumb border width       |
| `--slider-thumb-border-color` | Slider thumb border color       |
| `--slider-thumb-height`       | Slider thumb height             |
| `--slider-thumb-width`        | Slider thumb width              |
| `--slider-thumb-y`            | Slider thumb Y position         |
| `--slider-thumb-radius`       | Slider thumb radius             |
| `--slider-track-background`   | Slider track background color   |
| `--slider-track-height`       | Slider track height             | 

#### Text inputs

Styling for text inputs

| Variable               | Description        |
| ---------------------- | ------------------ |
| `--input-height`       | Input height       |
| `--input-radius`       | Input radius       |
| `--input-font-weight`  | Input font weight  |
| `--input-border-width` | Input border width | 

#### Toggles

Styling for toggle inputs

| Variable                  | Description                   |
| ------------------------- | ----------------------------- |
| `--toggle-border-width`   | Toggle border width           |
| `--toggle-width`          | Toggle width                  |
| `--toggle-radius`         | Toggle radius                 |
| `--toggle-thumb-color`    | Toggle thumb background color |
| `--toggle-thumb-radius`   | Toggle thumb radius           |
| `--toggle-thumb-height`   | Toggle thumb height           |
| `--toggle-thumb-width`    | Toggle thumb width            |
| `--toggle-s-border-width` | Small toggle border width     |
| `--toggle-s-width`        | Small toggle width            |
| `--toggle-s-thumb-height` | Small toggle thumb height     |
| `--toggle-s-thumb-width`  | Small toggle thumb width      | 

### Popovers (file previews)

Styling for popovers and file previews

| Variable               | Description             |
| ---------------------- | ----------------------- |
| `--popover-width`      | Popover default width   |
| `--popover-height`     | Popover default height  |
| `--popover-max-height` | Popover maximum height  |
| `--popover-font-size`  | Popover font size       |
| `--popover-pdf-width`  | PDF file preview width  |
| `--popover-pdf-height` | PDF file preview height |

### Prompts

E.g. quick switcher, command palette

| Variable                | Description                           |
| ----------------------- | ------------------------------------- |
| `--prompt-width`        | Prompt width                          |
| `--prompt-max-width`    | Prompt max width (for narrow windows) |
| `--prompt-max-height`   | Prompt max height                     |
| `--prompt-border-width` | Prompt border width                   |
| `--prompt-border-color` | Prompt border color                  | 

### Ribbon

Controls styling of the [[Ribbon]] element

| Variable                        | Description                                 |
| ------------------------------- | ------------------------------------------- |
| `--ribbon-background`           | Ribbon background color                     |
| `--ribbon-background-collapsed` | Ribbon background color (collapsed sidebar) |
| `--ribbon-width`                | Ribbon width                                |
| `--ribbon-padding`              | Ribbon padding                              | 

### Scrollbars

Styling for non-native scrollbars. Note that custom scrollbars are only used on Windows and Linux.

| Variable                      | Description                               |
| ----------------------------- | ----------------------------------------- |
| `--scrollbar-bg`              | Scrollbar background color                |
| `--scrollbar-thumb-bg`        | Scrollbar thumb background color          |
| `--scrollbar-active-thumb-bg` | Scrollbar thumb background color (active) | 

### Search

Styling for search inputs and search results in search pane

| Variable                      | Description                        |
| ----------------------------- | ---------------------------------- |
| `--search-clear-button-color` | Clear search button color          |
| `--search-clear-button-size`  | Clear search button size           |
| `--search-icon-color`         | Search magnifying glass icon color |
| `--search-icon-size`          | Search icon size                   |
| `--search-result-background`  | Search result background color     | 

### Sidebar

Styling for sidebar elements

| Variable                       | Description                                 |
| ------------------------------ | ------------------------------------------- |
| `--sidebar-markdown-font-size` | Font size for Markdown files in sidebars    |
| `--sidebar-tab-text-display`   | `display` property for tab text in sidebars | 

### Status bar

Styling for [[Status bar]] element

| Variable                      | Description                    |
| ----------------------------- | ------------------------------ |
| `--status-bar-background`     | Status bar background color    |
| `--status-bar-border-color`   | Status bar border color        |
| `--status-bar-border-width`   | Status bar border width        |
| `--status-bar-font-size`      | Status bar font size           |
| `--status-bar-text-color`     | Status bar text color          |
| `--status-bar-position`       | Status bar `position` property |
| `--status-bar-radius`         | Status bar radius              | 
| `--status-bar-scroll-padding` | Status bar scroll padding      |

### Tabs

Styling for [[Tabs]]

| Variable                                  | Description                                  |
| ----------------------------------------- | -------------------------------------------- |
| `--tab-background-active`                 | Tab background color (active tab)            |
| `--tab-text-color`                        | Tab text color                               |
| `--tab-text-color-active`                 | Tab text color (non-focused window, active)  |
| `--tab-text-color-focused`                | Tab text color (focused window)              |
| `--tab-text-color-focused-active`         | Tab text color (focused window, active)      |
| `--tab-text-color-focused-highlighted`    | Tab text color (focused window, highlighted) |
| `--tab-text-color-focused-active-current` | Tab text color (focused window, current tab) |
| `--tab-font-size`                         | Tab font size                                |
| `--tab-font-weight`                       | Tab font weight                              |
| `--tab-container-background`              | Tab container background color               |
| `--tab-divider-color`                     | Tab divider color                            |
| `--tab-outline-color`                     | Tab outline color                            |
| `--tab-outline-width`                     | Tab outline width                            |
| `--tab-curve`                             | Tab curve radius                             |
| `--tab-radius`                            | Tab outer radius                             |
| `--tab-radius-active`                     | Tab outer radius (active tab)                |
| `--tab-width`                             | Tab default width                            |
| `--tab-max-width`                         | Tab maximum width                            | 


### Tab stacks

Styling for stacked tabs

| Variable                          | Description                   |
| --------------------------------- | ----------------------------- |
| `--tab-stacked-pane-width`        | Stacked pane width            |
| `--tab-stacked-header-width`      | Stacked header width          |
| `--tab-stacked-font-size`         | Stacked tab font size         |
| `--tab-stacked-font-weight`       | Stacked tab font weight       |
| `--tab-stacked-text-align`        | Stacked tab text alignment    |
| `--tab-stacked-text-transform`    | Stacked tab text transform    |
| `--tab-stacked-text-writing-mode` | Stacked tab text writing mode |
| `--tab-stacked-shadow`            | Stacked tab shadow            | 

### Window frame

Custom titlebar can be turned on by user with `Appearance Settings → Window frame style` set to **Obsidian frame**

| Variable                        | Description                                |
| ------------------------------- | ------------------------------------------ |
| `--titlebar-background`         | Titlebar background color                  |
| `--titlebar-background-focused` | Titlebar background color (focused window) |
| `--titlebar-border-width`       | Titlebar border width                      |
| `--titlebar-border-color`       | Titlebar border color                      |
| `--titlebar-text-color`         | Titlebar text color                        |
| `--titlebar-text-color-focused` | Titlebar text color (focused window)       |
| `--titlebar-text-weight`        | Titlebar font weight                       |
| `--header-height`               | Default height for frame elements          | 

### Workspace

| Variable                             | Description                        |
| ------------------------------------ | ---------------------------------- |
| `--workspace-background-translucent` | Background for translucent windows | 
