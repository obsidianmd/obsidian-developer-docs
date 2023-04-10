---
cssClass: reference
---

This page lists CSS variables used for Obsidian Publish site components.

## CSS variables

Publish-specific variables should be defined on the `.published-container`.

### Component titles

Styles for the title above components such as **Backlinks**, **Graph**, **Table of contents**, when these components are turned on in the site settings.

| Variable                      | Description                       |
| ----------------------------- | --------------------------------- |
| `--component-title-color`     | Font color                        |
| `--component-title-font`      | Font family                       |
| `--component-title-size`      | Font size                         |
| `--component-title-style`     | Font style, e.g. normal or italic |
| `--component-title-transform` | Text transform, e.g. uppercase                                  |
| `--component-title-variant`   | Font variant                      |
| `--component-title-weight`    | Font weight                       |


### Outline

When activated in Publish settings, a table of contents is displayed in the right sidebar showing a navigable list of headings on the page.

| Variable                          | Description                      |
| --------------------------------- | -------------------------------- |
| `--outline-heading-color`         | Font color for inactive headings |
| `--outline-heading-color-hover`   | Font color for hovered heading   |
| `--outline-heading-color-active`  | Font color for active heading    |
| `--outline-heading-weight-active` | Font weight for active heading   |

### Graph

The graph component can be turned on in Publish settings. More graph CSS variables for node and line colors are present in the inherited CSS.

| Variable         | Description                   |
| ---------------- | ----------------------------- |
| `--graph-height` | Height of the graph component |

