---
cssClass: reference
---

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
  --background-primary: white;
}
.theme-dark {

}
```


## Naming of variables

---

## Colors

### Color mappings

#### Accent color

| Variable     | Default value | Description |
| ------------ | ------------- | ----------- |
| `--accent-h` | `254`         |             |
| `--accent-s` | `80%`         |             |
| `--accent-l` | `68%`         |             |

#### Background and border colors

| Variable                             | Default value | Description |
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

| Variable                    | Default value | Description |
| --------------------------- | ------------- | ----------- |
| `--text-normal`             |               |             |
| `--text-muted`              |               |             |
| `--text-faint`              |               |             |
| `--text-on-accent`          |               |             |
| `--text-on-accent-inverted` |               |             |
| `--text-error`              |               |             |
| `--text-success`            |               |             |
| `--text-selection`          |               |             |
| `--text-accent`             |               |             |
| `--text-accent-hover`       |               |             |

#### Buttons and interactive element colors

| Variable                     | Default value | Description |
| ---------------------------- | ------------- | ----------- |
| `--interactive-normal`       |               |             |
| `--interactive-hover`        |               |             |
| `--interactive-accent-hsl`   |               |             |
| `--interactive-accent`       |               |             |
| `--interactive-accent-hover` |               |             |

---

## Generics

### Borders

| Variable         | Default value | Description |
| ---------------- | ------------- | ----------- |
| `--border-width` |               |             |

### Cursors

| Variable        | Default value | Description              |
| --------------- | ------------- | ------------------------ |
| `--cursor`      | `default`     | Cursor for interactive elements |
| `--cursor-link` | `pointer`     | Cursor for links                |

### Fonts

| Variable            | Default value | Description |
| ------------------- | ------------- | ----------- |
| `--font-smallest`   |               |             |
| `--font-smaller`    |               |             |
| `--font-small`      |               |             |

#### UI fonts

| Variable            | Default value | Description |
| ------------------- | ------------- | ----------- |
| `--font-ui-smaller` |               |             |
| `--font-ui-small`   |               |             |
| `--font-ui-medium`  |               |             |
| `--font-ui-larger`  |               |             |

#### Font weights

| Variable            | Default value | Description |
| ------------------- | ------------- | ----------- |
| `--font-thin`       |               |             |
| `--font-extralight` |               |             |
| `--font-light`      |               |             |
| `--font-normal`     |               |             |
| `--font-medium`     |               |             |
| `--font-semibold`   |               |             |
| `--font-bold`       |               |             |
| `--font-extrabold`  |               |             |
| `--font-black`      |               |             |

### Line heights

| Variable               | Default value | Description |
| ---------------------- | ------------- | ----------- |
| `--line-height-normal` |               |             |
| `--line-height-tight`                       |               |             |

### Spacing and padding

| Variable      | Default value | Description |
| ------------- | ------------- | ----------- |
| `--size-2-1`  |               |             |
| `--size-2-2`  |               |             |
| `--size-2-3`  |               |             |
| `--size-4-1`  |               |             |
| `--size-4-2`  |               |             |
| `--size-4-3`  |               |             |
| `--size-4-4`  |               |             |
| `--size-4-5`  |               |             |
| `--size-4-6`  |               |             |
| `--size-4-8`  |               |             |
| `--size-4-9`  |               |             |
| `--size-4-12` |               |             |
| `--size-4-16` |               |             |
| `--size-4-18` |               |             |

### Radiuses

| Variable      | Default value | Description |
| ------------- | ------------- | ----------- |
| `--radius-s`  |               |             |
| `--radius-m`  |               |             |
| `--radius-l`  |               |             |
| `--radius-xl` |               |             |

### Z-index

| Variable               | Default value | Description |
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

### Color swatch inputs

| Variable          | Default value | Description |
| ----------------- | ------------- | ----------- |
| `--swatch-radius` |               |             |
| `--swatch-height` |               |             |
| `--swatch-width`  |               |             |
| `--swatch-shadow` |               |             |

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

---

## UI

### Canvas

| Variable                    | Default value | Description |
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

| Variable                    | Default value | Description |
| --------------------------- | ------------- | ----------- |
| `--divider-color`           |               |             |
| `--divider-color-hover`     |               |             |
| `--divider-width`           |               |             |
| `--divider-width-hover`     |               |             |
| `--divider-vertical-height` |               |             |

### Dragging

| Variable                  | Default value | Description |
| ------------------------- | ------------- | ----------- |
| `--drag-ghost-background` |               |             |
| `--drag-ghost-text-color` |               |             |

### Blocks

| Variable | Default value | Description |
| -------- | ------------- | ----------- |
| `--embed-block-shadow-hover`     |               |             |

### File layout

| Variable                    | Default value | Description |
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

| Variable                  | Default value | Description |
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

| Variable          | Default value | Description |
| ----------------- | ------------- | ----------- |
| `--header-height` |               |             |

### Icons

| Variable                  | Default value | Description |
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

| Variable                           | Default value | Description |
| ---------------------------------- | ------------- | ----------- |
| `--indentation-guide-width`        |               |             |
| `--indentation-guide-color`        |               |             |
| `--indentation-guide-color-active` |               |             |

### File navigator

| Variable                              | Default value | Description |
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

| Variable                   | Default value | Description |
| -------------------------- | ------------- | ----------- |
| `--vault-name-font-size`   |               |             |
| `--vault-name-font-weight` |               |             |
| `--vault-name-color`       |               |             |

### Modals

| Variable                          | Default value | Description |
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

| Variable              | Default value | Description |
| --------------------- | ------------- | ----------- |
| `--dialog-width`      |               |             |
| `--dialog-max-width`  |               |             |
| `--dialog-max-height` |               |             |

### File preview popovers

| Variable               | Default value | Description |
| ---------------------- | ------------- | ----------- |
| `--popover-width`      |               |             |
| `--popover-height`     |               |             |
| `--popover-max-height` |               |             |
| `--popover-pdf-width`  |               |             |
| `--popover-pdf-height` |               |             |
| `--popover-font-size`  |               |             |

### Prompts

E.g. quick switcher, command palette

| Variable                | Default value | Description |
| ----------------------- | ------------- | ----------- |
| `--prompt-width`        |               |             |
| `--prompt-max-width`    |               |             |
| `--prompt-max-height`   |               |             |
| `--prompt-border-width` |               |             |
| `--prompt-border-color` |               |             |

### Ribbon

Controls styling of the [[Ribbon]] element

| Variable                        | Default value | Description |
| ------------------------------- | ------------- | ----------- |
| `--ribbon-background`           |               |             |
| `--ribbon-background-collapsed` |               |             |
| `--ribbon-width`                |               |             |
| `--ribbon-padding`              |               |             |

### Scrollbars

| Variable                      | Default value | Description |
| ----------------------------- | ------------- | ----------- |
| `--scrollbar-active-thumb-bg` |               |             |
| `--scrollbar-bg`              |               |             |
| `--scrollbar-thumb-bg`        |               |             |

### Search

| Variable                      | Default value | Description |
| ----------------------------- | ------------- | ----------- |
| `--search-clear-button-color` |               |             |
| `--search-clear-button-size`  |               |             |
| `--search-icon-color`         |               |             |
| `--search-icon-size`          |               |             |
| `--search-result-background`  |               |             |

### Sidebar

| Variable                       | Default value | Description |
| ------------------------------ | ------------- | ----------- |
| `--sidebar-markdown-font-size` |               |             |
| `--sidebar-tab-text-display`   |               |             |

### Status bar

| Variable                      | Default value | Description |
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

| Variable                                  | Default value | Description |
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

| Variable                          | Default value | Description |
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

| Variable                        | Default value | Description |
| ------------------------------- | ------------- | ----------- |
| `--titlebar-background`         |               |             |
| `--titlebar-background-focused` |               |             |
| `--titlebar-border-width`       |               |             |
| `--titlebar-border-color`       |               |             |
| `--titlebar-text-color`         |               |             |
| `--titlebar-text-color-focused` |               |             |
| `--titlebar-text-weight`        |               |             |

### Workspace

| Variable                             | Default value | Description |
| ------------------------------------ | ------------- | ----------- |
| `--workspace-background-translucent` |               |             |
