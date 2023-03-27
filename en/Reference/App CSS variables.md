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

| Variable                    | Description                             |
| --------------------------- | --------------------------------------- |
| `--embed-max-height`        | Embed max height                        |
| `--embed-canvas-max-height` | Embedded Canvas element max height      |
| `--embed-background`        | Embed background color                  |
| `--embed-border-left`       | Embed left border, shorthand property   |
| `--embed-border-right`      | Embed right border, shorthand property  |
| `--embed-border-top`        | Embed top border, shorthand property    |
| `--embed-border-bottom`     | Embed bottom border, shorthand property |
| `--embed-padding`           | Embedd padding                          |
| `--embed-font-style`        | Embed `font-style`                      | 

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
| `--tag-border-width`       | Tag border thickness         |
| `--tag-padding-x`          | Tag left/right padding       |
| `--tag-padding-y`          | Tag top/down padding         |
| `--tag-radius`             | Tag radius                   | 

---

## Interface elements



### Canvas

| Variable                    | Description |
| --------------------------- | ----------- |
| `--canvas-background`       |             |
| `--canvas-card-label-color` |             |
| `--canvas-color-1`          |             |
| `--canvas-color-2`          |             |
| `--canvas-color-3`          |             |
| `--canvas-color-4`          |             |
| `--canvas-color-5`          |             |
| `--canvas-color-6`          |             |
| `--canvas-dot-pattern`      |             |

### Dividers

| Variable                    | Description |
| --------------------------- | ----------- |
| `--divider-color`           |             |
| `--divider-color-hover`     |             |
| `--divider-width`           |             |
| `--divider-width-hover`     |             |
| `--divider-vertical-height` |             |

### Dragging

| Variable                  | Description |
| ------------------------- | ----------- |
| `--drag-ghost-background` |             |
| `--drag-ghost-text-color` |             |

### Blocks

| Variable                     | Description |
| ---------------------------- | ----------- |
| `--embed-block-shadow-hover` |             |

### File layout

| Variable                    | Description |
| --------------------------- | ----------- |
| `--file-line-width`         |             |
| `--file-folding-offset`     |             |
| `--file-margins`            |             |
| `--file-header-font-size`   |             |
| `--file-header-font-weight` |             |
| `--file-header-border`      |             |
| `--file-header-justify`     |             |

### Graphs

Applies to local and global graphs

| Variable                  | Description |
| ------------------------- | ----------- |
| `--graph-controls-width`  |             |
| `--graph-text`            |             |
| `--graph-line`            |             |
| `--graph-node`            |             |
| `--graph-node-unresolved` |             |
| `--graph-node-focused`    |             |
| `--graph-node-tag`        |             |
| `--graph-node-attachment` |             |

### View header

| Variable          | Description |
| ----------------- | ----------- |
| `--header-height` |             |

### Icons

| Variable                  | Description |
| ------------------------- | ----------- |
| `--icon-size`             |             |
| `--icon-stroke`           |             |
| `--icon-xs`               |             |
| `--icon-s`                |             |
| `--icon-m`                |             |
| `--icon-l`                |             |
| `--icon-xl`               |             |
| `--icon-xs-stroke-width`  |             |
| `--icon-s-stroke-width`   |             |
| `--icon-m-stroke-width`   |             |
| `--icon-l-stroke-width`   |             |
| `--icon-xl-stroke-width`  |             |
| `--icon-color`            |             |
| `--icon-color-hover`      |             |
| `--icon-color-active`     |             |
| `--icon-color-focused`    |             |
| `--icon-opacity`          |             |
| `--icon-opacity-hover`    |             |
| `--icon-opacity-active`   |             |
| `--clickable-icon-radius` |             |

### Indentation guides

| Variable                           | Description |
| ---------------------------------- | ----------- |
| `--indentation-guide-width`        |             |
| `--indentation-guide-color`        |             |
| `--indentation-guide-color-active` |             |

### File navigator

| Variable                              | Description |
| ------------------------------------- | ----------- |
| `--nav-item-size`                     |             |
| `--nav-item-color`                    |             |
| `--nav-item-color-hover`              |             |
| `--nav-item-color-active`             |             |
| `--nav-item-color-selected`           |             |
| `--nav-item-color-highlighted`        |             |
| `--nav-item-background-hover`         |             |
| `--nav-item-background-active`        |             |
| `--nav-item-background-selected`      |             |
| `--nav-item-padding`                  |             |
| `--nav-item-parent-padding`           |             |
| `--nav-item-children-padding-left`    |             |
| `--nav-item-children-margin-left`     |             |
| `--nav-item-weight`                   |             |
| `--nav-item-weight-hover`             |             |
| `--nav-item-weight-active`            |             |
| `--nav-item-white-space`              |             |
| `--nav-indentation-guide-width`       |             |
| `--nav-indetation-guide-color`        |             |
| `--nav-collapse-icon-color`           |             |
| `--nav-collapse-icon-color-collapsed` |             |

#### Vault name

| Variable                   | Description |
| -------------------------- | ----------- |
| `--vault-name-font-size`   |             |
| `--vault-name-font-weight` |             |
| `--vault-name-color`       |             |

### Modals

| Variable                          | Description |
| --------------------------------- | ----------- |
| `--modal-background`              |             |
| `--modal-width`                   |             |
| `--modal-height`                  |             |
| `--modal-max-width`               |             |
| `--modal-max-height`              |             |
| `--modal-max-width-narrow`        |             |
| `--modal-border-width`            |             |
| `--modal-border-color`            |             |
| `--modal-radius`                  |             |
| `--modal-community-sidebar-width` |             |

#### Dialogs

Smaller modals primarily used for confirmations

| Variable              | Description |
| --------------------- | ----------- |
| `--dialog-width`      |             |
| `--dialog-max-width`  |             |
| `--dialog-max-height` |             |

### Inputs

#### Buttons

| Variable          | Description |
| ----------------- | ----------- |
| `--button-radius` |             |

#### Color inputs

| Variable          | Description |
| ----------------- | ----------- |
| `--swatch-radius` |             |
| `--swatch-height` |             |
| `--swatch-width`  |             |
| `--swatch-shadow` |             |

#### Sliders

| Variable                      | Description |
| ----------------------------- | ----------- |
| `--slider-thumb-border-width` |             |
| `--slider-thumb-border-color` |             |
| `--slider-thumb-height`       |             |
| `--slider-thumb-width`        |             |
| `--slider-thumb-y`            |             |
| `--slider-thumb-radius`       |             |
| `--slider-s-thumb-size`       |             |
| `--slider-s-thumb-position`   |             |
| `--slider-track-background`   |             |
| `--slider-track-height`       |             |

#### Text inputs

| Variable               | Description |
| ---------------------- | ----------- |
| `--input-height`       |             |
| `--input-radius`       |             |
| `--input-font-weight`  |             |
| `--input-border-width` |             |

#### Toggles

| Variable                  | Description |
| ------------------------- | ----------- |
| `--toggle-border-width`   |             |
| `--toggle-width`          |             |
| `--toggle-radius`         |             |
| `--toggle-thumb-color`    |             |
| `--toggle-thumb-radius`   |             |
| `--toggle-thumb-height`   |             |
| `--toggle-thumb-width`    |             |
| `--toggle-s-border-width` |             |
| `--toggle-s-width`        |             |
| `--toggle-s-thumb-height` |             |
| `--toggle-s-thumb-width`  |             |

### Popovers (file previews)

| Variable               | Description |
| ---------------------- | ----------- |
| `--popover-width`      |             |
| `--popover-height`     |             |
| `--popover-max-height` |             |
| `--popover-pdf-width`  |             |
| `--popover-pdf-height` |             |
| `--popover-font-size`  |             |

### Prompts

E.g. quick switcher, command palette

| Variable                | Description |
| ----------------------- | ----------- |
| `--prompt-width`        |             |
| `--prompt-max-width`    |             |
| `--prompt-max-height`   |             |
| `--prompt-border-width` |             |
| `--prompt-border-color` |             |

### Ribbon

Controls styling of the [[Ribbon]] element

| Variable                        | Description |
| ------------------------------- | ----------- |
| `--ribbon-background`           |             |
| `--ribbon-background-collapsed` |             |
| `--ribbon-width`                |             |
| `--ribbon-padding`              |             |

### Scrollbars

| Variable                      | Description |
| ----------------------------- | ----------- |
| `--scrollbar-active-thumb-bg` |             |
| `--scrollbar-bg`              |             |
| `--scrollbar-thumb-bg`        |             |

### Search

| Variable                      | Description |
| ----------------------------- | ----------- |
| `--search-clear-button-color` |             |
| `--search-clear-button-size`  |             |
| `--search-icon-color`         |             |
| `--search-icon-size`          |             |
| `--search-result-background`  |             |

### Sidebar

| Variable                       | Description |
| ------------------------------ | ----------- |
| `--sidebar-markdown-font-size` |             |
| `--sidebar-tab-text-display`   |             |

### Status bar

| Variable                      | Description |
| ----------------------------- | ----------- |
| `--status-bar-background`     |             |
| `--status-bar-border-color`   |             |
| `--status-bar-border-width`   |             |
| `--status-bar-font-size`      |             |
| `--status-bar-text-color`     |             |
| `--status-bar-position`       |             |
| `--status-bar-radius`         |             |
| `--status-bar-scroll-padding` |             |

### Tabs

| Variable                                  | Description |
| ----------------------------------------- | ----------- |
| `--tab-background-active`                 |             |
| `--tab-text-color`                        |             |
| `--tab-text-color-active`                 |             |
| `--tab-text-color-focused`                |             |
| `--tab-text-color-focused-active`         |             |
| `--tab-text-color-focused-highlighted`    |             |
| `--tab-text-color-focused-active-current` |             |
| `--tab-font-size`                         |             |
| `--tab-font-weight`                       |             |
| `--tab-container-background`              |             |
| `--tab-divider-color`                     |             |
| `--tab-outline-color`                     |             |
| `--tab-outline-width`                     |             |
| `--tab-curve`                             |             |
| `--tab-radius`                            |             |
| `--tab-radius-active`                     |             |
| `--tab-width`                             |             |
| `--tab-max-width`                         |             |


### Tab stacks

| Variable                          | Description |
| --------------------------------- | ----------- |
| `--tab-stacked-pane-width`        |             |
| `--tab-stacked-header-width`      |             |
| `--tab-stacked-font-size`         |             |
| `--tab-stacked-font-weight`       |             |
| `--tab-stacked-text-align`        |             |
| `--tab-stacked-text-transform`    |             |
| `--tab-stacked-text-writing-mode` |             |
| `--text-stacked-shadow`           |             |

### Window frame

| Variable                        | Description |
| ------------------------------- | ----------- |
| `--titlebar-background`         |             |
| `--titlebar-background-focused` |             |
| `--titlebar-border-width`       |             |
| `--titlebar-border-color`       |             |
| `--titlebar-text-color`         |             |
| `--titlebar-text-color-focused` |             |
| `--titlebar-text-weight`        |             |

### Workspace

| Variable                             | Description |
| ------------------------------------ | ----------- |
| `--workspace-background-translucent` |             |
