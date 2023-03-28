---
cssClass: reference
---

## Using included icons

Obsidian uses the [Lucide](https://lucide.dev/) icon library, which has over 800 icons that you can use for your plugin.

## Creating new icons

If you are looking to use an icon that is not available in the Lucide library, you can create your own. For best compatibility and cohesiveness with Obsidian, your icons should [follow Lucide’s guidelines](https://github.com/lucide-icons/lucide/blob/main/docs/ICON_DESIGN_GUIDE.md)

-   Icons must be designed on a 24 by 24 pixels canvas
-   Icons must have at least 1 pixel padding within the canvas
-   Icons must have a stroke width of 2 pixels
-   Icons must use round joins
-   Icons must use round caps
-   Icons must use centered strokes
-   Shapes (such as rectangles) in icons must have border radius of 2 pixels
-   Distinct elements must have 2 pixels of spacing between each other

Lucide also [provides templates and guides](https://github.com/lucide-icons/lucide/blob/main/CONTRIBUTING.md) for vector editors such as Illustrator, Figma, and Inkscape.

## Theming variables

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
