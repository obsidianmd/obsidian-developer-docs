---
cssclasses: reference
---

The Obsidian color palette defines a range of colors used in the app.

## Base colors

The base colors is a neutral color palette ranging from light to dark. These values should typically only be defined by themes.

| Variable           | Default value (light mode) | Default value (dark mode) |
| ------------------ | -------------------------- | ------------------------- |
| `--color-base-00`  | `#ffffff`                  | `#1c1c1c`                 |
| `--color-base-05`  | `#fcfcfc`                  | `#212121`                 |
| `--color-base-10`  | `#fafafa`                  | `#232323`                 |
| `--color-base-20`  | `#f6f6f6`                  | `#282828`                 |
| `--color-base-25`  | `#efefef`                  | `#2e2e2e`                 |
| `--color-base-30`  | `#e4e4e4`                  | `#333333`                 |
| `--color-base-35`  | `#dadada`                  | `#3f3f3f`                 |
| `--color-base-40`  | `#bdbdbd`                  | `#555555`                 |
| `--color-base-50`  | `#ababab`                  | `#666666`                 |
| `--color-base-60`  | `#707070`                  | `#999999`                 |
| `--color-base-70`  | `#5c5c5c`                  | `#b3b3b3`                 |
| `--color-base-100` | `#222222`                  | `#dadada`                 |

## Accent color

The accent color is used to draw attention to interactive elements, such as links and primary buttons, and can be overridden by the user under **Settings → Appearance** in the Obsidian app.

| Variable     | Default value | Description       |
| ------------ | ------------- | ----------------- |
| `--accent-h` | `258`           | Accent hue        |
| `--accent-s` | `88%`           | Accent saturation |
| `--accent-l` | `66%`           | Accent lightness  |

`--accent-h`, `--accent-s`, and `--accent-l` combine into the following accent color variables:

| Variable           | Description                                             |
| ------------------ | -------------------------------------------------------- |
| `--color-accent`   | The accent color                                        |
| `--color-accent-1` | A shifted accent shade, used for hover and active states |
| `--color-accent-2` | A further-shifted accent shade, used for hover and active states |

> [!tip]
> You can use [CSS calculations](https://developer.mozilla.org/en-US/docs/Web/CSS/calc) to create a variety of shades based on the accent color.

## Extended colors

Extended color variables define the broader range of colors used for status messages (errors, warnings, success), callouts, syntax highlighting, graph nodes, and Canvas elements.

Each extended color has an additional RGB variable with a `-rgb` suffix that you can use to create colors with opacity, using the `rgba` function.

For example, the following snippet uses the default variable to set the text color, and the RGB variable to set a background color to red with 20% opacity.

```css
color: var(--color-red);
background-color: rgba(var(--color-red-rgb), 0.2);
```

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

> [!info] Deprecated RGB and HSL variables
> As of Obsidian 1.13, colors use the OKLCH color space for mixing. The following variables are deprecated and kept only for theme compatibility:
>
> - `--color-red-rgb`, `--color-orange-rgb`, `--color-yellow-rgb`, `--color-green-rgb`, `--color-cyan-rgb`, `--color-blue-rgb`, `--color-purple-rgb`, `--color-pink-rgb`
> - `--color-accent-hsl`
> - `--mono-rgb-0`, `--mono-rgb-100`
> - `--interactive-accent-hsl`
> - `--background-modifier-error-rgb`, `--background-modifier-success-rgb`
> - `--text-highlight-bg-rgb`
>
> Instead of building an `rgba()` or `hsla()` value from one of these, use [`color-mix()`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix) with the corresponding color variable. For example, instead of `rgba(var(--color-red-rgb), 0.2)`, use `color-mix(in oklch, var(--color-red) 20%, transparent)`.

## Black and white

Black and white colors let you create masks with opacity.

| Variable         | Default value (light mode) | Default value (dark mode) |
| ---------------- | -------------------------- | ------------------------- |
| `--mono-0`       | `white`                    | `black`                   |
| `--mono-100`     | `black`                    | `white`                   |

> [!warning]
> Avoid changing the value of black and white variables.

## Semantic colors

Semantic colors are derived from the base color palette based on their intended use.

#### Surface colors

<div style="display: flex; gap: var(--size-4-4)">
  <div style="background-color: var(--background-primary); padding: var(--size-4-4); border: 1px solid var(--background-modifier-border)">Primary background
  <div style="background-color: var(--background-primary-alt); padding: var(--size-4-4); margin-top: var(--size-4-4)">Alt. primary background</div>
  </div>
  <div style="background-color: var(--background-secondary); padding: var(--size-4-4); border: 1px solid var(--background-modifier-border)">Secondary background
  <div style="background-color: var(--background-secondary-alt); padding: var(--size-4-4); margin-top: var(--size-4-4)">Alt. secondary background</div></div>
</div>

| Variable                             | Description                   |
| ------------------------------------ | ----------------------------- |
| `--background-primary`               | Primary background            |
| `--background-primary-alt`           | Background for surfaces on top of primary background         |
| `--background-secondary`             | Secondary background          |
| `--background-secondary-alt`           | Background for surfaces on top of secondary background         |
| `--background-modifier-hover`        | Hovered elements              |
| `--background-modifier-active-hover` | Active hovered elements       |
| `--background-modifier-border`       | Border color                  |
| `--background-modifier-border-hover` | Border color (hover)        |
| `--background-modifier-border-focus` | Border color (focus)        |
| `--background-modifier-error-rgb`    | Error background, RGB value   |
| `--background-modifier-error`        | Error background              |
| `--background-modifier-error-hover`  | Error background (hover)    |
| `--background-modifier-success-rgb`  | Success background, RGB value |
| `--background-modifier-success`      | Success background            |
| `--background-modifier-message`      | Messages background           |
| `--background-modifier-form-field`   | Form field background         |

#### Interactive colors

| Variable                     | Description                                             |
| ---------------------------- | ------------------------------------------------------- |
| `--interactive-normal`       | Background for standard interactive elements            |
| `--interactive-hover`        | Background for standard interactive elements (hover)    |
| `--interactive-accent`       | Background for accented interactive elements            |
| `--interactive-accent-hsl`   | Background for accented interactive elements in HSL |
| `--interactive-accent-hover` | Background for accented interactive elements (hover)    |

### Text colors

#### Text foreground colors

| Variable                    | Description                                    |
| --------------------------- | ---------------------------------------------- |
| `--text-normal`             | Normal text                                    |
| `--text-muted`              | Muted text                                     |
| `--text-faint`              | Faint text                                     |
| `--text-on-accent`          | Text on accent background when accent is dark  |
| `--text-on-accent-inverted` | Text on accent background when accent is light |
| `--text-success`            | Success text                                   |
| `--text-warning`            | Warning text                                   | 
| `--text-error`              | Error text                                     |
| `--text-accent`             | Accent text                                    |
| `--text-accent-hover`       | Accent text (hover)                            |

#### Text background colors

| Variable              | Description                 |
| --------------------- | --------------------------- |
| `--text-selection`    | Selected text background    |
| `--text-highlight-bg` | Highlighted text background |

#### Caret color

Defines the color of the caret, the blinking text entry cursor.

| Variable        | Description |
| --------------- | ----------- |
| `--caret-color` | Caret color |
