#reference

## Overview

Variables inherited from the Obsidian App fall into the following categories.

Defined on the `.theme-light` and `.theme-dark` classes:

- **Colors** for light and dark mode backgrounds, borders, text and accents

Defined on the `body` element:

- **Components** such as inputs, buttons, and popovers
- **Content types** such as blockquotes, callouts, code blocks, syntax highlighting, embeds, footnotes, headings, links, lists, tables, tags, and task lists

### Example

```css
body {

}
.theme-light {

}
.theme-dark {

}
```


## Naming of variables

---

## Colors

---

## Generics

### Cursors

| Variable        | Default value | Description              |
| --------------- | ------------- | ------------------------ |
| `--cursor`      | `default`     | Cursor for interactive elements |
| `--cursor-link` | `pointer`     | Cursor for links                |

### Fonts

### Line heights

### Spacing and padding

### Radiuses

### Z-index

---

## Content types

### Blockquotes

| Variable                        | Default value | Description |
| ------------------------------- | ------------- | ----------- |
| `--blockquote-border-thickness` |               |             |
| `--blockquote-border-color`     |               |             |
| `--blockquote-font-style`       |               |             |
| `--blockquote-color`            |               |             |
| `--blockquote-background-color` |               |             |

### Bold

| Variable        | Default value     | Description |
| --------------- | ----------------- | ----------- |
| `--bold-weight` | `--font-semibold` |             |
| `--bold-color`  | `inherit`         |             |

### Callouts

| Variable                       | Default value | Description |
| ------------------------------ | ------------- | ----------- |
| `--callout-border-width`       | `0`           |             |
| `--callout-border-opacity`     |               |             |
| `--callout-padding`            |               |             |
| `--callout-radius`             |               |             |
| `--callout-blend-mode`         |               |             |
| `--callout-title-color`        |               |             |
| `--callout-title-padding`      |               |             |
| `--callout-title-size`         |               |             |
| `--callout-content-padding`    |               |             |
| `--callout-content-background` |               |             |

#### Callout type colors

| Variable              | Default value | Description |
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

| Variable                        | Default value | Description |
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

| Variable             | Default value | Description |
| -------------------- | ------------- | ----------- |
| `--code-white-space` |               |             |
| `--code-size`        |               |             |
| `--code-background`  |               |             |

#### Syntax highlighting colors

Note that for technical reasons Obsidian currently uses two different syntax highlighting libraries for Edit and Read mode. The syntax highlighting does not perfectly match between the two modes.

| Variable             | Default value | Description |
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

| Variable                    | Default value | Description |
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

| Variable         | Default value | Description |
| ---------------- | ------------- | ----------- |
| `--footnote-size` |               |             |

### Headings

| Variable               | Default value | Description |
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

| Variable         | Default value | Description |
| ---------------- | ------------- | ----------- |
| `--hr-color`     |               |             |
| `--hr-thickness` |               |             |

### Italic

| Variable | Default value | Description |
| -------- | ------------- | ----------- |
| `--italic-color`     |               |             |

### Inline titles

| Variable                     | Default value | Description |
| ---------------------------- | ------------- | ----------- |
| `--inline-title-color`       |               |             |
| `--inline-title-font`        |               |             |
| `--inline-title-line-height` |               |             |
| `--inline-title-size`        |               |             |
| `--inline-title-style`       |               |             |
| `--inline-title-variant`     |               |             |
| `--inline-title-weight`      |               |             |

### Links

| Variable                             | Default value | Description |
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

| Variable                        | Default value | Description |
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

| Variable                            | Default value | Description |
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

| Variable                   | Default value | Description |
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

| Variable          | Default value | Description |
| ----------------- | ------------- | ----------- |
| `--button-radius` |               |             |

### Text inputs

| Variable               | Default value | Description |
| ---------------------- | ------------- | ----------- |
| `--input-height`       |               |             |
| `--input-radius`       |               |             |
| `--input-font-weight`  |               |             |
| `--input-border-width` |               |             |

### Toggles

| Variable                  | Default value | Description |
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


### Sliders

| Variable                      | Default value | Description |
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

### Color swatches

| Variable | Default value | Description |
| -------- | ------------- | ----------- |
| `--`     |               |             |

---

## UI

| Variable | Default value | Description |
| -------- | ------------- | ----------- |
| `--`     |               |             |

### Borders

| Variable | Default value | Description |
| -------- | ------------- | ----------- |
| `--`     |               |             |

### Canvas

| Variable | Default value | Description |
| -------- | ------------- | ----------- |
| `--`     |               |             |

### Dialogs

| Variable | Default value | Description |
| -------- | ------------- | ----------- |
| `--`     |               |             |

### Dividers

| Variable | Default value | Description |
| -------- | ------------- | ----------- |
| `--`     |               |             |

### Dragging

### Blocks

### File layout

### Graph

### View header

### Icons

### Indentation guides

### File navigator

#### Vault name

### Modals

### File preview popovers

### Prompts

E.g. quick switcher, command palette

### Ribbon

### Scrollbars

### Search

### Status bar

### Tabs

### Tab stacks

### Window frame

### Workspace