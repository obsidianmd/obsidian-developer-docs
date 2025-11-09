---
description: A checklist for theme developers to self-critique their themes.
permalink: oo/theme
aliases:
  - oo24/theme
---
## Compatibility

- [ ] Do use CSS variables whenever you can. [Learn more](https://docs.obsidian.md/Reference/CSS+variables/CSS+variables).
- [ ] Don't use `!important`.
- [ ] Don't change vertical margins in classes used in live preview editor, use padding instead.
- [ ] If you're using recent experimental CSS features, mention the minimal installer version required in the README.

## Performance

- [ ] Don't use `:has()` unless absolutely necessary. It causes performance issues especially in Canvas.
- [ ] Don't link to assets such as fonts and images. Keep them local. [Learn more](https://docs.obsidian.md/Themes/App+themes/Theme+guidelines#Keep+assets+local).


## Releasing

- [ ] Don't include the word "Obsidian" in your name unless it absolutely makes sense. Most of the time it's redundant.
- [ ] Do check your screenshot files are up-to-date. These screenshots are shown as thumbnails in the theme directory.
- [ ] Do check your README to make sure it's up-to-date. This is the what all potential users see when they check out your theme in the theme directory.
- [ ] Do keep your screenshot small so it loads fast in the directory. We recommend the dimension of 512 x 288 pixels.
- [ ] Do make sure you have a license in place so others know how to use your theme and its source code.