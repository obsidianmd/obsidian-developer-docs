---
cssclasses:
  - reference
aliases:
  - Padding
  - Margins
  - Size
---

Obsidian uses a 4-pixel grid to structure UI elements. By using multiples of 4 for padding and margin, the grid provides convenient ratios for layouts and allows the interface to scale up and down across high and low DPI screens.

To align with the 4-pixel grid, all elements should use the predefined `--size` CSS variables for spacing and dimensions properties.

Each size variable contains two numbers which represent the base and the multiple.

- `--size-4-1` represents `4px` (4x1)
- `--size-4-2` represents `8px` (4x2)
- `--size-4-4` represents `16px` (4x4)

In addition to the 4-pixel grid, Obsidan also provides a set of variables that uses a 2-pixel grid. Use these sparingly and only when you need more fine-grained spacing.

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
