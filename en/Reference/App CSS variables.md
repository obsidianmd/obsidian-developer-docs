---
cssClass: reference
---

#reference

## Overview

The Obsidian App uses [Cascading Style Sheets](https://en.wikipedia.org/wiki/CSS) (CSS) to control the design of the user interface. CSS is the same markup language used for websites and web-based apps, which means you can find many resources online to help you learn how to use and edit CSS.

Obsidian includes hundreds of [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) that allow you to customize almost every aspect of the Obsidian UI. Default values for App CSS variables are defined alphabetically at the top of the `app.css` file. You can access `app.css` by using Developer Tools.

CSS variables make it easy to create custom Themes and Snippets for Obsidian. CSS variables are also useful to create Plugin UIs that feel cohesive with the Obsidian App and are compatible with Community Themes.

### CSS structure

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

Theme color variables define the raw color values used throughout the app. These variables are mapped to semantic color names in the next section (see [[App CSS variables#Color mappings]])

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

| Variable           | Description                                              |
| ------------------ | -------------------------------------------------------- |
| `--color-base-00`  | Lightest color in light mode, darkest color in dark mode |
| `--color-base-05`  |                                                          |
| `--color-base-10`  |                                                          |
| `--color-base-20`  |                                                          |
| `--color-base-25`  |                                                          |
| `--color-base-30`  |                                                          |
| `--color-base-35`  |                                                          |
| `--color-base-40`  |                                                          |
| `--color-base-50`  |                                                          |
| `--color-base-60`  |                                                          |
| `--color-base-70`  |                                                          |
| `--color-base-100` | Darkest color in light mode, lightest color in dark mode | 

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

This example uses the standard color variable to set the text color, and the RGB variable to set a background color to red with 20% opacity.

| Variable             | Property | Description |
| -------------------- | ------------- | ----------- |
| `--color-red`        |               |             |
| `--color-red-rgb`    |               |             |
| `--color-orange`     |               |             |
| `--color-orange-rgb` |               |             |
| `--color-yellow`     |               |             |
| `--color-yellow-rgb` |               |             |
| `--color-green`      |               |             |
| `--color-green-rgb`  |               |             |
| `--color-cyan`       |               |             |
| `--color-cyan-rgb`   |               |             |
| `--color-blue`       |               |             |
| `--color-blue-rgb`   |               |             |
| `--color-purple`     |               |             |
| `--color-purple-rgb` |               |             |
| `--color-pink`       |               |             |
| `--color-pink-rgb`   |               |             |

#### Black and white

These variables define RGB values for black and white. These are used primarily to create semi-translucent masks with RGBA. We do not recommend changing these variables.

| Variable         |
| ---------------- |
| `--mono-rgb-0`   |
| `--mono-rgb-100` |

---

## Semantic color mappings

Color mappings are defined on the `body` element and are semantic names that refer to the [[App CSS variables#Theme colors|theme colors]] defined above.

#### Background and border colors

| Variable                             | Property | Description |
| ------------------------------------ | ------------- | ----------- |
| `--background-primary`               |               |             |
| `--background-primary-alt`           |               |             |
| `--background-secondary`             |               |             |
| `--background-modifier-hover`        |               |             |
| `--background-modifier-active-hover` |               |             |
| `--background-modifier-border`       |               |             |
| `--background-modifier-border-hover` |               |             |
| `--background-modifier-border-focus` |               |             |
| `--background-modifier-error-rgb`    |               |             |
| `--background-modifier-error`        |               |             |
| `--background-modifier-error-hover`  |               |             |
| `--background-modifier-success-rgb`  |               |             |
| `--background-modifier-success`      |               |             |
| `--background-modifier-message`      |               |             |
| `--background-modifier-form-field`   |               |             |

#### Text colors

| Variable                    | Description |
| --------------------------- | ----------- |
| `--text-normal`             |             |
| `--text-muted`              |             |
| `--text-faint`              |             |
| `--text-on-accent`          |             |
| `--text-on-accent-inverted` |             |
| `--text-error`              |             |
| `--text-success`            |             |
| `--text-selection`          |             |
| `--text-accent`             |             |
| `--text-accent-hover`       |             |

#### Buttons and interactive element colors

| Variable                     | Property | Description |
| ---------------------------- | ------------- | ----------- |
| `--interactive-normal`       |               |             |
| `--interactive-hover`        |               |             |
| `--interactive-accent-hsl`   |               |             |
| `--interactive-accent`       |               |             |
| `--interactive-accent-hover` |               |             |

---

## Structure

### Borders

| Variable         | Default value | Description |
| ---------------- | ------------- | ----------- |
| `--border-width` | `1px`         |             |

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

| Variable      | Property | Description |
| ------------- | ------------- | ----------- |
| `--radius-s`  |               |             |
| `--radius-m`  |               |             |
| `--radius-l`  |               |             |
| `--radius-xl` |               |             |

### Z-index

| Variable               | Property | Description |
| ---------------------- | ------------- | ----------- |
| `--layer-cover`        |               |             |
| `--layer-sidedock`     |               |             |
| `--layer-status-bar`   |               |             |
| `--layer-popover`      |               |             |
| `--layer-slides`       |               |             |
| `--layer-modal`        |               |             |
| `--layer-notice`       |               |             |
| `--layer-menu`         |               |             |
| `--layer-tooltip`      |               |             |
| `--layer-dragged-item` |               |             |

---

## Content types

### Blockquotes

| Variable                        | Property | Description |
| ------------------------------- | ------------- | ----------- |
| `--blockquote-border-thickness` |               |             |
| `--blockquote-border-color`     |               |             |
| `--blockquote-font-style`       |               |             |
| `--blockquote-color`            |               |             |
| `--blockquote-background-color` |               |             |

### Bold

| Variable        | Property | Description |
| --------------- | -------- | ----------- |
| `--bold-weight` |          |             |
| `--bold-color`  |          |             |

### Callouts

| Variable                       | Property | Description |
| ------------------------------ | -------- | ----------- |
| `--callout-border-width`       |          |             |
| `--callout-border-opacity`     |          |             |
| `--callout-padding`            |          |             |
| `--callout-radius`             |          |             |
| `--callout-blend-mode`         |          |             |
| `--callout-title-color`        |          |             |
| `--callout-title-padding`      |          |             |
| `--callout-title-size`         |          |             |
| `--callout-content-padding`    |          |             |
| `--callout-content-background` |          |             |

#### Callout type colors

| Variable              | Property | Description |
| --------------------- | ------------- | ----------- |
| `--callout-bug`       |               |             |
| `--callout-default`   |               |             |
| `--callout-error`     |               |             |
| `--callout-example`   |               |             |
| `--callout-fail`      |               |             |
| `--callout-important` |               |             |
| `--callout-info`      |               |             |
| `--callout-question`  |               |             |
| `--callout-success`   |               |             |
| `--callout-summary`   |               |             |
| `--callout-tip`       |               |             |
| `--callout-todo`      |               |             |
| `--callout-warning`   |               |             |
| `--callout-quote`     |               |             |

### Checkboxes

| Variable                        | Property | Description |
| ------------------------------- | ------------- | ----------- |
| `--checkbox-radius`             |               |             |
| `--checkbox-size`               |               |             |
| `--checkbox-marker-color`       |               |             |
| `--checkbox-color`              |               |             |
| `--checkbox-color-hover`        |               |             |
| `--checkbox-border-color`       |               |             |
| `--checkbox-border-color-hover` |               |             |
| `--checklist-done-decoration`   |               |             |
| `--checklist-done-color`        |               |             |

### Code

| Variable             | Property | Description |
| -------------------- | ------------- | ----------- |
| `--code-white-space` |               |             |
| `--code-size`        |               |             |
| `--code-background`  |               |             |

#### Syntax highlighting colors

Note that for technical reasons Obsidian currently uses two different syntax highlighting libraries for Edit and Read mode. The syntax highlighting does not perfectly match between the two modes.

| Variable             | Property | Description |
| -------------------- | ------------- | ----------- |
| `--code-normal`      |               |             |
| `--code-comment`     |               |             |
| `--code-function`    |               |             |
| `--code-important`   |               |             |
| `--code-keyword`     |               |             |
| `--code-operator`    |               |             |
| `--code-property`    |               |             |
| `--code-punctuation` |               |             |
| `--code-string`      |               |             |
| `--code-tag`         |               |             |
| `--code-value`       |               |             |

### Embeds

| Variable                    | Property | Description |
| --------------------------- | ------------- | ----------- |
| `--embed-max-height`        |               |             |
| `--embed-canvas-max-height` |               |             |
| `--embed-background`        |               |             |
| `--embed-border-left`       |               |             |
| `--embed-border-right`      |               |             |
| `--embed-border-top`        |               |             |
| `--embed-border-bottom`     |               |             |
| `--embed-padding`           |               |             |
| `--embed-font-style`        |               |             |

### Footnotes

| Variable         | Property | Description |
| ---------------- | ------------- | ----------- |
| `--footnote-size` |               |             |

### Headings

| Variable               | Property | Description |
| ---------------------- | ------------- | ----------- |
| `--heading-formatting` |               |             |
| `--h1-color`           |               |             |
| `--h2-color`           |               |             |
| `--h3-color`           |               |             |
| `--h4-color`           |               |             |
| `--h5-color`           |               |             |
| `--h6-color`           |               |             |
| `--h1-font`            |               |             |
| `--h2-font`            |               |             |
| `--h3-font`            |               |             |
| `--h4-font`            |               |             |
| `--h5-font`            |               |             |
| `--h6-font`            |               |             |
| `--h1-line-height`     |               |             |
| `--h2-line-height`     |               |             |
| `--h3-line-height`     |               |             |
| `--h4-line-height`     |               |             |
| `--h5-line-height`     |               |             |
| `--h6-line-height`     |               |             |
| `--h1-size`            |               |             |
| `--h2-size`            |               |             |
| `--h3-size`            |               |             |
| `--h4-size`            |               |             |
| `--h5-size`            |               |             |
| `--h6-size`            |               |             |
| `--h1-style`           |               |             |
| `--h2-style`           |               |             |
| `--h3-style`           |               |             |
| `--h4-style`           |               |             |
| `--h5-style`           |               |             |
| `--h6-style`           |               |             |
| `--h1-variant`         |               |             |
| `--h2-variant`         |               |             |
| `--h3-variant`         |               |             |
| `--h4-variant`         |               |             |
| `--h5-variant`         |               |             |
| `--h6-variant`         |               |             |
| `--h1-weight`          |               |             |
| `--h2-weight`          |               |             |
| `--h3-weight`          |               |             |
| `--h4-weight`          |               |             |
| `--h5-weight`          |               |             |
| `--h6-weight`          |               |             |

### Horizontal rules

| Variable         | Property | Description |
| ---------------- | ------------- | ----------- |
| `--hr-color`     |               |             |
| `--hr-thickness` |               |             |

### Italic

| Variable | Property | Description |
| -------- | ------------- | ----------- |
| `--italic-color`     |               |             |

### Inline titles

| Variable                     | Property | Description |
| ---------------------------- | ------------- | ----------- |
| `--inline-title-color`       |               |             |
| `--inline-title-font`        |               |             |
| `--inline-title-line-height` |               |             |
| `--inline-title-size`        |               |             |
| `--inline-title-style`       |               |             |
| `--inline-title-variant`     |               |             |
| `--inline-title-weight`      |               |             |

### Links

| Variable                             | Property | Description |
| ------------------------------------ | ------------- | ----------- |
| `--link-color`                       |               |             |
| `--link-color-hover`                 |               |             |
| `--link-decoration`                  |               |             |
| `--link-decoration-hover`            |               |             |
| `--link-decoration-thickness`        |               |             |
| `--link-external-color`              |               |             |
| `--link-external-color-hover`        |               |             |
| `--link-external-decoration`         |               |             |
| `--link-external-decoration-hover`   |               |             |
| `--link-unresolved-color`            |               |             |
| `--link-unresolved-opacity`          |               |             |
| `--link-unresolved-filter`           |               |             |
| `--link-unresolved-decoration-style` |               |             |
| `--link-unresolved-decoration-color` |               |             |


### Lists

| Variable                        | Property | Description |
| ------------------------------- | ------------- | ----------- |
| `--list-indent`                 |               |             |
| `--list-spacing`                |               |             |
| `--list-marker-color`           |               |             |
| `--list-marker-color-hover`     |               |             |
| `--list-marker-color-collapsed` |               |             |
| `--list-bullet-border`          |               |             |
| `--list-bullet-radius`          |               |             |
| `--list-bullet-size`            |               |             |
| `--list-bullet-transform`       |               |             |
| `--list-numbered-style`         |               |             |

### Tables

| Variable                            | Property | Description |
| ----------------------------------- | ------------- | ----------- |
| `--table-background`                |               |             |
| `--table-border-width`              |               |             |
| `--table-border-color`              |               |             |
| `--table-white-space`               |               |             |
| `--table-header-background`         |               |             |
| `--table-header-background-hover`   |               |             |
| `--table-header-border-width`       |               |             |
| `--table-header-border-color`       |               |             |
| `--table-header-font`               |               |             |
| `--table-header-size`               |               |             |
| `--table-header-weight`             |               |             |
| `--table-header-color`              |               |             |
| `--table-text-size`                 |               |             |
| `--table-text-color`                |               |             |
| `--table-column-max-width`          |               |             |
| `--table-column-alt-background`     |               |             |
| `--table-column-first-border-width` |               |             |
| `--table-column-last-border-width`  |               |             |
| `--table-row-background-hover`      |               |             |
| `--table-row-alt-background`        |               |             |
| `--table-last-border-width`         |               |             |

### Tags

| Variable                   | Property | Description |
| -------------------------- | ------------- | ----------- |
| `--tag-size`               |               |             |
| `--tag-color`              |               |             |
| `--tag-color-hover`        |               |             |
| `--tag-decoration`         |               |             |
| `--tag-decoration-hover`   |               |             |
| `--tag-background`         |               |             |
| `--tag-background-hover`   |               |             |
| `--tag-border-color`       |               |             |
| `--tag-border-color-hover` |               |             |
| `--tag-border-width`       |               |             |
| `--tag-padding-x`          |               |             |
| `--tag-padding-y`          |               |             |
| `--tag-radius`             |               |             |

---

## Inputs

### Buttons

| Variable          | Property | Description |
| ----------------- | ------------- | ----------- |
| `--button-radius` |               |             |

### Color swatch inputs

| Variable          | Property | Description |
| ----------------- | ------------- | ----------- |
| `--swatch-radius` |               |             |
| `--swatch-height` |               |             |
| `--swatch-width`  |               |             |
| `--swatch-shadow` |               |             |

### Sliders

| Variable                      | Property | Description |
| ----------------------------- | ------------- | ----------- |
| `--slider-thumb-border-width` |               |             |
| `--slider-thumb-border-color` |               |             |
| `--slider-thumb-height`       |               |             |
| `--slider-thumb-width`        |               |             |
| `--slider-thumb-y`            |               |             |
| `--slider-thumb-radius`       |               |             |
| `--slider-s-thumb-size`       |               |             |
| `--slider-s-thumb-position`   |               |             |
| `--slider-track-background`   |               |             |
| `--slider-track-height`       |               |             |

### Text inputs

| Variable               | Property | Description |
| ---------------------- | ------------- | ----------- |
| `--input-height`       |               |             |
| `--input-radius`       |               |             |
| `--input-font-weight`  |               |             |
| `--input-border-width` |               |             |

### Toggles

| Variable                  | Property | Description |
| ------------------------- | ------------- | ----------- |
| `--toggle-border-width`   |               |             |
| `--toggle-width`          |               |             |
| `--toggle-radius`         |               |             |
| `--toggle-thumb-color`    |               |             |
| `--toggle-thumb-radius`   |               |             |
| `--toggle-thumb-height`   |               |             |
| `--toggle-thumb-width`    |               |             |
| `--toggle-s-border-width` |               |             |
| `--toggle-s-width`        |               |             |
| `--toggle-s-thumb-height` |               |             |
| `--toggle-s-thumb-width`  |               |             |

---

## Interface elements



### Canvas

| Variable                    | Property | Description |
| --------------------------- | ------------- | ----------- |
| `--canvas-background`       |               |             |
| `--canvas-card-label-color` |               |             |
| `--canvas-color-1`          |               |             |
| `--canvas-color-2`          |               |             |
| `--canvas-color-3`          |               |             |
| `--canvas-color-4`          |               |             |
| `--canvas-color-5`          |               |             |
| `--canvas-color-6`          |               |             |
| `--canvas-dot-pattern`      |               |             |

### Dividers

| Variable                    | Property | Description |
| --------------------------- | ------------- | ----------- |
| `--divider-color`           |               |             |
| `--divider-color-hover`     |               |             |
| `--divider-width`           |               |             |
| `--divider-width-hover`     |               |             |
| `--divider-vertical-height` |               |             |

### Dragging

| Variable                  | Property | Description |
| ------------------------- | ------------- | ----------- |
| `--drag-ghost-background` |               |             |
| `--drag-ghost-text-color` |               |             |

### Blocks

| Variable | Property | Description |
| -------- | ------------- | ----------- |
| `--embed-block-shadow-hover`     |               |             |

### File layout

| Variable                    | Property | Description |
| --------------------------- | ------------- | ----------- |
| `--file-line-width`         |               |             |
| `--file-folding-offset`     |               |             |
| `--file-margins`            |               |             |
| `--file-header-font-size`   |               |             |
| `--file-header-font-weight` |               |             |
| `--file-header-border`      |               |             |
| `--file-header-justify`     |               |             |

### Graphs

Applies to local and global graphs

| Variable                  | Property | Description |
| ------------------------- | ------------- | ----------- |
| `--graph-controls-width`  |               |             |
| `--graph-text`            |               |             |
| `--graph-line`            |               |             |
| `--graph-node`            |               |             |
| `--graph-node-unresolved` |               |             |
| `--graph-node-focused`    |               |             |
| `--graph-node-tag`        |               |             |
| `--graph-node-attachment` |               |             |

### View header

| Variable          | Property | Description |
| ----------------- | ------------- | ----------- |
| `--header-height` |               |             |

### Icons

| Variable                  | Property | Description |
| ------------------------- | ------------- | ----------- |
| `--icon-size`             |               |             |
| `--icon-stroke`           |               |             |
| `--icon-xs`               |               |             |
| `--icon-s`                |               |             |
| `--icon-m`                |               |             |
| `--icon-l`                |               |             |
| `--icon-xl`               |               |             |
| `--icon-xs-stroke-width`  |               |             |
| `--icon-s-stroke-width`   |               |             |
| `--icon-m-stroke-width`   |               |             |
| `--icon-l-stroke-width`   |               |             |
| `--icon-xl-stroke-width`  |               |             |
| `--icon-color`            |               |             |
| `--icon-color-hover`      |               |             |
| `--icon-color-active`     |               |             |
| `--icon-color-focused`    |               |             |
| `--icon-opacity`          |               |             |
| `--icon-opacity-hover`    |               |             |
| `--icon-opacity-active`   |               |             |
| `--clickable-icon-radius` |               |             |

### Indentation guides

| Variable                           | Property | Description |
| ---------------------------------- | ------------- | ----------- |
| `--indentation-guide-width`        |               |             |
| `--indentation-guide-color`        |               |             |
| `--indentation-guide-color-active` |               |             |

### File navigator

| Variable                              | Property | Description |
| ------------------------------------- | ------------- | ----------- |
| `--nav-item-size`                     |               |             |
| `--nav-item-color`                    |               |             |
| `--nav-item-color-hover`              |               |             |
| `--nav-item-color-active`             |               |             |
| `--nav-item-color-selected`           |               |             |
| `--nav-item-color-highlighted`        |               |             |
| `--nav-item-background-hover`         |               |             |
| `--nav-item-background-active`        |               |             |
| `--nav-item-background-selected`      |               |             |
| `--nav-item-padding`                  |               |             |
| `--nav-item-parent-padding`           |               |             |
| `--nav-item-children-padding-left`    |               |             |
| `--nav-item-children-margin-left`     |               |             |
| `--nav-item-weight`                   |               |             |
| `--nav-item-weight-hover`             |               |             |
| `--nav-item-weight-active`            |               |             |
| `--nav-item-white-space`              |               |             |
| `--nav-indentation-guide-width`       |               |             |
| `--nav-indetation-guide-color`        |               |             |
| `--nav-collapse-icon-color`           |               |             |
| `--nav-collapse-icon-color-collapsed` |               |             |

#### Vault name

| Variable                   | Property | Description |
| -------------------------- | ------------- | ----------- |
| `--vault-name-font-size`   |               |             |
| `--vault-name-font-weight` |               |             |
| `--vault-name-color`       |               |             |

### Modals

| Variable                          | Property | Description |
| --------------------------------- | ------------- | ----------- |
| `--modal-background`              |               |             |
| `--modal-width`                   |               |             |
| `--modal-height`                  |               |             |
| `--modal-max-width`               |               |             |
| `--modal-max-height`              |               |             |
| `--modal-max-width-narrow`        |               |             |
| `--modal-border-width`            |               |             |
| `--modal-border-color`            |               |             |
| `--modal-radius`                  |               |             |
| `--modal-community-sidebar-width` |               |             |

#### Dialogs

Smaller modals primarily used for confirmations

| Variable              | Property | Description |
| --------------------- | ------------- | ----------- |
| `--dialog-width`      |               |             |
| `--dialog-max-width`  |               |             |
| `--dialog-max-height` |               |             |

### File preview popovers

| Variable               | Property | Description |
| ---------------------- | ------------- | ----------- |
| `--popover-width`      |               |             |
| `--popover-height`     |               |             |
| `--popover-max-height` |               |             |
| `--popover-pdf-width`  |               |             |
| `--popover-pdf-height` |               |             |
| `--popover-font-size`  |               |             |

### Prompts

E.g. quick switcher, command palette

| Variable                | Property | Description |
| ----------------------- | ------------- | ----------- |
| `--prompt-width`        |               |             |
| `--prompt-max-width`    |               |             |
| `--prompt-max-height`   |               |             |
| `--prompt-border-width` |               |             |
| `--prompt-border-color` |               |             |

### Ribbon

Controls styling of the [[Ribbon]] element

| Variable                        | Property | Description |
| ------------------------------- | ------------- | ----------- |
| `--ribbon-background`           |               |             |
| `--ribbon-background-collapsed` |               |             |
| `--ribbon-width`                |               |             |
| `--ribbon-padding`              |               |             |

### Scrollbars

| Variable                      | Property | Description |
| ----------------------------- | ------------- | ----------- |
| `--scrollbar-active-thumb-bg` |               |             |
| `--scrollbar-bg`              |               |             |
| `--scrollbar-thumb-bg`        |               |             |

### Search

| Variable                      | Property | Description |
| ----------------------------- | ------------- | ----------- |
| `--search-clear-button-color` |               |             |
| `--search-clear-button-size`  |               |             |
| `--search-icon-color`         |               |             |
| `--search-icon-size`          |               |             |
| `--search-result-background`  |               |             |

### Sidebar

| Variable                       | Property | Description |
| ------------------------------ | ------------- | ----------- |
| `--sidebar-markdown-font-size` |               |             |
| `--sidebar-tab-text-display`   |               |             |

### Status bar

| Variable                      | Property | Description |
| ----------------------------- | ------------- | ----------- |
| `--status-bar-background`     |               |             |
| `--status-bar-border-color`   |               |             |
| `--status-bar-border-width`   |               |             |
| `--status-bar-font-size`      |               |             |
| `--status-bar-text-color`     |               |             |
| `--status-bar-position`       |               |             |
| `--status-bar-radius`         |               |             |
| `--status-bar-scroll-padding` |               |             |

### Tabs

| Variable                                  | Property | Description |
| ----------------------------------------- | ------------- | ----------- |
| `--tab-background-active`                 |               |             |
| `--tab-text-color`                        |               |             |
| `--tab-text-color-active`                 |               |             |
| `--tab-text-color-focused`                |               |             |
| `--tab-text-color-focused-active`         |               |             |
| `--tab-text-color-focused-highlighted`    |               |             |
| `--tab-text-color-focused-active-current` |               |             |
| `--tab-font-size`                         |               |             |
| `--tab-font-weight`                       |               |             |
| `--tab-container-background`              |               |             |
| `--tab-divider-color`                     |               |             |
| `--tab-outline-color`                     |               |             |
| `--tab-outline-width`                     |               |             |
| `--tab-curve`                             |               |             |
| `--tab-radius`                            |               |             |
| `--tab-radius-active`                     |               |             |
| `--tab-width`                             |               |             |
| `--tab-max-width`                         |               |             |


### Tab stacks

| Variable                          | Property | Description |
| --------------------------------- | ------------- | ----------- |
| `--tab-stacked-pane-width`        |               |             |
| `--tab-stacked-header-width`      |               |             |
| `--tab-stacked-font-size`         |               |             |
| `--tab-stacked-font-weight`       |               |             |
| `--tab-stacked-text-align`        |               |             |
| `--tab-stacked-text-transform`    |               |             |
| `--tab-stacked-text-writing-mode` |               |             |
| `--text-stacked-shadow`           |               |             |

### Window frame

| Variable                        | Property | Description |
| ------------------------------- | ------------- | ----------- |
| `--titlebar-background`         |               |             |
| `--titlebar-background-focused` |               |             |
| `--titlebar-border-width`       |               |             |
| `--titlebar-border-color`       |               |             |
| `--titlebar-text-color`         |               |             |
| `--titlebar-text-color-focused` |               |             |
| `--titlebar-text-weight`        |               |             |

### Workspace

| Variable                             | Property | Description |
| ------------------------------------ | ------------- | ----------- |
| `--workspace-background-translucent` |               |             |
