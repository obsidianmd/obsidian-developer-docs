Obsidian Publish has two breakpoints by default:

| Breakpoint | Device | Effect | 
| ----------- | - | - |
| 1000px | Tablet | Right sidebar is hidden |
| 750px | Mobile | Left and right sidebars are hidden. If enabled, navigation is accessible via hamburger menu in the top left corner |

You can target these devices using CSS. Any rules defined outside of the `@media` query will apply to all devices.

```css
@media screen and (min-width: 1000px) {
  /* ... rules and variables for screens larger than tablet */
}
@media screen and (max-width: 1000px) {
  /* ... rules and variables for tablet devices and smaller */
}
@media screen and (max-width: 750px) {
  /* ... rules and variables for mobile devices and smaller */
}
```
