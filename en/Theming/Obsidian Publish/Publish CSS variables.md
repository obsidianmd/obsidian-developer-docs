---
cssClass: reference
---

#reference

## Overview

The following are Publish-specific CSS variables that can be defined on the `.published-container` element.

## Fonts

To load remote fonts we recommend using CSS with `@import` or defining your fonts with `@font-face` and an absolute URL. [Learn more.](https://css-tricks.com/snippets/css/using-font-face-in-css/)

| Variable                 | Description                                           |
| ------------------------ | ----------------------------------------------------- |
| `--font-text-size`       | Font size for page text                               |
| `--font-text-theme`      | Font family for page text                             |
| `--font-monospace-theme` | Font family for code                                  |
| `--font-interface-theme` | Font family for interface elements such as navigation |
| `--font-mermaid`         | Font family for Mermaid diagrams                      | 

## Site header, site logo, and site name

The site header contains the site logo (if added in Publish settings), the site name, and the mobile hamburger menu if navigation is turned on.

The site header appears as a horizontal header at the top of the page on mobile devices and when navigation is turned off. When navigation is turned on in Publish settings, the site name and logo appear in the left sidebar.

| Variable                       | Description                    |
| ------------------------------ | ------------------------------ |
| `--logo-width`                 | Logo default width             |
| `--logo-height`                | Logo default height            |
| `--logo-max-width`             | Logo max width                 |
| `--logo-max-height`            | Logo max height                |
| `--logo-radius`                | Logo corner radius             |
| `--header-height`              | Height of the site header      |
| `--site-name-color`            | Site name color                |
| `--site-name-color-hover`      | Site name hovered color        |
| `--site-name-font`             | Site name font family          |
| `--site-name-size`             | Site name font size            |
| `--site-name-weight`           | Site name font weight          |
| `--site-menu-icon-color`       | Mobile menu icon color         |
| `--site-menu-icon-color-hover` | Mobile menu hovered icon color |
| `--site-menu-icon-size`        | Mobile menu icon size          | 


## Page width and padding

| Variable                | Description                                    |
| ----------------------- | ---------------------------------------------- |
| `--page-width`          | Width of a note when readable line width is on |
| `--page-padding`        | Padding around a note                          | 

## Page title

The note title displayed at the top of the page. This title can be hidden in the Publish site settings using the "**Hide page title**" option.

| Variable                   | Description                       |
| -------------------------- | --------------------------------- |
| `--page-title-color`       | Font color                        |
| `--page-title-font`        | Font family                       |
| `--page-title-line-height` | Line height                       |
| `--page-title-size`        | Font size                         |
| `--page-title-style`       | Font style, e.g. normal or italic |
| `--page-title-variant`     | Font variant                      |
| `--page-title-weight`      | Font weight                       |

## Sidebars

The left sidebar is present when **Navigation** is turned on. The right sidebar is present when the **Graph** and/or **Table of Contents** elements are turned on. When these elements are turned off, the following variables have no effect.

| Variable                       | Description                        |
| ------------------------------ | ---------------------------------- |
| `--sidebar-left-width`         | Width of the left sidebar          |
| `--sidebar-left-background`    | Background color of left sidebar   |
| `--sidebar-left-border-width`  | Right border width of left sidebar |
| `--sidebar-left-border-color`  | Right border color of left sidebar |
| `--sidebar-right-width`        | Width of the right sidebar         |
| `--sidebar-right-background`   | Background color of right sidebar  |
| `--sidebar-right-border-width` | Left border width of right sidebar |
| `--sidebar-right-border-color` | Left border color of right sidebar | 

## Navigation

When activated in Publish settings, navigation is placed in the left sidebar and can be styled with the following variables. Top-level items and folders can be treated differently than nested items.

| Variable                          | Description                                |
| --------------------------------- | ------------------------------------------ |
| `--nav-collapse-icon-color`       | Collapse icon color                        |
| `--nav-collapse-icon-color-hover` | Collapse icon color (hovered)              |
| `--nav-parent-item-color`         | Font color for folders and top-level items |
| `--nav-parent-item-color-active`  | Font color for active top-level items      |
| `--nav-parent-item-weight`        | Font weight for top-level items            |
| `--nav-item-color`                | Font color for nested items                |
| `--nav-item-color-hover`          | Font color for hovered nested items        |
| `--nav-item-color-active`         | Font color for active nested items         |
| `--nav-item-border-color`         | Border color for nested items              |
| `--nav-item-border-color-hover`   | Border color for hovered nested items      |
| `--nav-item-border-color-active`  | Border color for active nested items       | 
| `--nav-item-weight-active`        | Font weight for active nested items        |

## Outline

When activated in Publish settings, a table of contents is displayed in the right sidebar showing a navigable list of headings on the page.

| Variable                          | Description                      |
| --------------------------------- | -------------------------------- |
| `--outline-heading-color`         | Font color for inactive headings |
| `--outline-heading-color-hover`   | Font color for hovered heading   |
| `--outline-heading-color-active`  | Font color for active heading    |
| `--outline-heading-weight-active` | Font weight for active heading   |

## Graph

The graph component can be turned on in Publish settings. More graph CSS variables for node and line colors are present in the inherited CSS.

| Variable         | Description                   |
| ---------------- | ----------------------------- |
| `--graph-height` | Height of the graph component |

## Component titles

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

