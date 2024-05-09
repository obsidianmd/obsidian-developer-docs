---
aliases:
  - RTL
description: Obsidian supports right-to-left (RTL) languages such as Arabic, Dhivehi, Hebrew, Farsi, Syriac, and Urdu. These languages are spoken by more than 600 million people. When developing plugins and themes for Obsidian it is important consider how your interface changes will adapt to the direction of the language interface and content.
---

> [!Warning] New in Obsidian 1.6
> Obsidian 1.6 contains many improvements for right-to-left languages, with mirrored UI and mixed language support. These changes can affect themes and plugins.

Obsidian supports right-to-left (RTL) languages such as Arabic, Dhivehi, Hebrew, Farsi, Syriac, and Urdu. These languages are spoken by more than 600 million people. When developing plugins and themes for Obsidian it is important consider how your interface changes will adapt to the direction of the language interface and content.

RTL languages can be present in two important contexts within Obsidian: the app interface and the content of notes.

- **The app interface** is defined by the language selected in Obsidian Settings. If the user selects an RTL language, the app interface is automatically reversed, and a `.mod-rtl` class is added to the `body` element. The specific interface language is also is added to the `lang` attribute on the `html` element.
- **The content of notes** can be written in left-to-right (LTR) languages, RTL languages, or mix both LTR and RTL languages within the same note. Obsidian automatically detects the direction of the language in the editor and adds the `dir` attribute to each line.

When the user selects an RTL language as their interface language, or sets RTL as the default editor direction in Obsidian settings, the `dir="rtl"` attribute is added to the editor.

> [!INFO] Mixed direction support
> Be aware that many RTL users choose to use a LTR language for the interface while writing some notes in a RTL language, or mix LTR and RTL languages within the same note.

## User expectations for RTL interfaces

Major operating systems reverse the interface for RTL language users. User interface components provided by the operating system are typically mirrored horizontally. Apps that do not behave this way can feel out of place to RTL users.

The following guides provide a useful reference for designing interfaces that work both LTR and RTL:

- [Apple RTL human interface guidelines](https://developer.apple.com/design/human-interface-guidelines/right-to-left)
- [RTL Styling 101](https://rtlstyling.com/)
- [MDN logical properties and values](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values)

## Make plugins and themes agnostic of language direction

Obsidian is built using web technologies which means it uses existing CSS and HTML features to make the interface adapt to the language direction.

### Use logical properties, avoid directional properties

Whenever you use CSS to add positioning and spacing, use logical properties and values such `start` and `end` rather than directional alternatives such as `left` and `right`. See the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values) for a full list of logical properties and values.

Prefer logical over directional properties:

| Properties           | Directional     | Logical                |
| -------------------- | --------------- | ---------------------- |
| Margins              | `margin-left`   | `margin-inline-start`  |
|                      | `margin-right`  | `margin-inline-end`    |
| Padding              | `padding-left`  | `padding-inline-start` |
|                      | `padding-right` | `padding-inline-end`   |
| Borders              | `border-left`   | `border-inline-start`  |
|                      | `border-right`  | `border-inline-end`    |
| Absolute positioning | `left`          | `inset-inline-start`   |
|                      | `right`         | `inset-inline-end`     |

Prefer logical over directional values:

| Values         | Directional         | Logical               |
| -------------- | ------------------- | --------------------- |
| Float          | `float: left`       | `float: inline-start` |
|                | `float: right`      | `float: inline-end`   |
| Text alignment | `text-align: left`  | `text-align: start`   |
|                | `text-align: right` | `text-align: end`     |

### Use fallback values when necessary

Some users may be using older Obsidian installers that do not include the latest versions of Chromium.

- Selectors that use newer selectors should be guarded by `@supports` to prevent the entire block from breaking.
- If there is a property that doesn't have 100% support, split the rule into 2 lines. The first line should provide the fallback. The second line should attempt to apply the new value. If this line fails, the previous style will get applied and it will fallback gracefully.

```css
.supported,
.unsupported {
  /* this won't run */
}

.supported {
  /* this will run */
}

.unsupported {
  /* this won't run */
}

@supports selector(:dir(*)) {
  /* will run if :dir() is supported */
}
```

## Obsidian CSS helpers and rules for RTL

### Selectors for language direction

#### Global selectors

The `.mod-rtl` class is added to the `body` element when an RTL language is selected in **Settings → General**. Changing the interface language requires the user to restart Obsidian.

You can use `.mod-rtl` to set the direction of interface elements in your plugin or theme. For example:

```css
.mod-rtl .plugin-class {
  direction: rtl;
}
```

Additionally, the specific interface language is also is added to the `lang` attribute on the `html` element. For example `lang="ar"` for Arabic.

#### Editor selectors

The `dir="rtl"` attribute is added to the `.markdown-source-view` element when the user chooses an RTL interface language in **Settings → General**, or sets RTL as the default editor direction in **Settings → Editor**.

When editing a file, the `dir` attribute is set to `rtl` or `ltr` per line on `.cm-line` elements by detecting the first strongly directional character. If no strongly directional character is present, the editor defaults to the direction of the previous strongly directional line.

In reading mode, the direction of lines is set automatically using the `dir="auto"` attribute on each block.

### Icons are mirrored automatically

Obsidian uses the [Lucide](https://lucide.dev/) icon library. Because almost all icons are either symmetric or have a LTR bias Obsidian automatically reverses the direction of icons when the interface is in RTL mode. To prevent reversing a specific icon in RTL mode you must explicitly unset the transformation.

For example if you want `.left-icon` to not be mirrored for RTL languages:

```css
.mod-rtl svg.svg-icon.left-icon {
	transform: unset;
}
```

### Use the direction variable for horizontal calculations

The CSS variable `--direction` is available for calculations such as `translateX()` so that elements can be shifted horizontally according to language direction where logical values are not available.

| Variable      | LTR value | RTL value |
| ------------- | --------- | --------- |
| `--direction` | `1`       | `-1`      |

### Choose the best bidirectional handling for an element

The CSS [unicode-bidi](https://developer.mozilla.org/en-US/docs/Web/CSS/unicode-bidi) property can be used to determine how bidirectional content is treated.

Using the `plaintext` value can be useful in certain cases. In the Obsidian UI the `plaintext` value is used whenever a single line of content is present that could be either LTR or RTL. For example, file names, outline items, tooltips, status bar elements. This ensures the correct direction of the content and trimming of long names with ellipses (…) when necessary.
