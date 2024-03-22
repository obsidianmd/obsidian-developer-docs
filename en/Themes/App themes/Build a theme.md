In this tutorial, you'll learn how to start developing a theme for Obsidian. Themes let you customize how Obsidian looks and feels, using CSS.

## What you'll learn

After you've completed this tutorial, you'll be able to:

- Configure an environment for developing Obsidian themes.
- Use CSS variables to change how Obsidian looks.
- Create a theme that supports both light and dark color schemes.

## Prerequisites

To complete this tutorial, you'll need:

- [Git](https://git-scm.com/) installed on your local machine.
- A code editor, such as [Visual Studio Code](https://code.visualstudio.com/).

## Step 1: Download the sample theme

In this step, you'll download a sample theme to the `themes` directory in your vault's [`.obsidian` directory](https://help.obsidian.md/Advanced+topics/How+Obsidian+stores+data#Per+vault+data) so that Obsidian can find it.

The sample theme you'll use in this tutorial is available in a [GitHub repository](https://github.com/obsidianmd/obsidian-sample-theme).

1. Open a terminal window and change the project directory to the `themes` directory.

   ```bash
   cd path/to/vault/.obsidian/themes
   ```

2. Clone the sample theme using Git.

   ```bash
   git clone https://github.com/obsidianmd/obsidian-sample-theme.git "Sample Theme"
   ```

> [!tip] GitHub template repository
> The repository for the sample theme is a GitHub template repository, which means you can create your own repository from the sample theme. To learn how, refer to [Creating a repository from a template](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template#creating-a-repository-from-a-template).
>
> Remember to use the URL to your own repository when cloning the sample theme.

## Step 2: Enable the theme

1. In Obsidian, open **Settings**.
2. In the side menu, select **Appearance**.
3. Next to **Themes**, select **Sample Theme** from the dropdown list.

You've enabled the sample theme. Next, we'll make some changes to it.

## Step 3: Update the manifest

In this step, you'll rename the theme by updating the manifest, `manifest.json`. The manifest contains information about your theme, such as its name and description.

1. Open `manifest.json` in your code editor.
2. Change `name` to a human-friendly name, such as `"Disco Lights"`.
3. Rename the theme directory under `themes` to the same name. The name of the theme directory must exactly match the `name` property in `manifest.json`.

   ```bash
   mv "Sample Theme" "Disco Lights"
   ```

4. Restart Obsidian to load the new changes to the manifest.

Go back to **Settings → Appearance → Themes** and notice that the name of the theme has been changed.

Remember to restart Obsidian whenever you make changes to `manifest.json`.

## Step 4: Change the font

Obsidian uses [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) to style the user interface. In this step, you'll use a CSS variable to change the font in the editor.

1. Create a new note, for example "Theme Development".
2. Enter the following text into the note:

   ```md
   Themes let you make [Obsidian](https://obsidian.md) look the way **you** want it.
   ```

3. In `theme.css`, add the following:

   ```css
   body {
     --font-text-theme: Georgia, serif;
   }
   ```

The editor displays the note using the font you defined.

## Step 5: Change the background color

Themes can support both light and dark color schemes. Define your CSS variables under `.theme-dark` or `.theme-light`.

1. In `theme.css`, add the following:

   ```css
   .theme-dark {
     --background-primary: #18004F;
     --background-secondary: #220070;
   }

   .theme-light {
     --background-primary: #ECE4FF;
     --background-secondary: #D9C9FF;
   }
   ```

2. In Obsidian, open **Settings**.
3. Under **Appearance**, toggle **Base color scheme** between "Light" and "Dark".

You'll see that Obsidian picks the colors based on the color scheme you've selected. Try changing the colors to `red`, `green`, or `blue` for a more dramatic change.

## Step 6: Change the input hover border color

The `:root` selector is commonly used when you want a variable to be accessible by every child element within the theme. This selector is often filled with Plugin variables.

Here's an example to illustrate its usage:

> [!example]
> Let's consider an input field that can be found in various places within Obsidian, such as settings and note content. To define the variables specific to this input field, we can use the `:root` selector.
>
> ```css
> :root {
>    --input-focus-border-color: Highlight;
>    --input-focus-outline: 1px solid Canvas;
>    --input-unfocused-border-color: transparent;
>    --input-disabled-border-color: transparent;
>    --input-hover-border-color: black;
>    /* Default Input Variables for Root */
 > }
 > ```


Now, let's modify the hover border color in our CSS:

```css
:root {
   --input-hover-border-color: red;
/* Change from Black to Red */
}
```

With this update, when you hover over any input field, the border color will change to a bright red.

> [!tip]
> When defining styles that should remain the same for both light and dark themes, it is recommended to use the `body` selector.
>
> Only use `.theme-dark` or `.theme-light` selectors if you want the styles to change when switching between light and dark themes.
>
> It's also important to use `:root` with caution and consideration. If your variable can be placed within `body`, `.theme-dark`, or `.theme-light` selectors instead, it is recommended to do so.

## Step 7: Discover CSS variables in use

Obsidian exposes more than 400 different CSS variables for customizing different parts of the user interface.
You can find a list of many of these variables under available under [[CSS variables]]

Alternatively, you can inspect the app to find the variable that is used to style a certain element. 
In this step, you'll find the CSS variable for changing the ribbon background.

1. In Obsidian, open the **Developer Tools** by pressing `Ctrl`+`Shift`+`I` (or `Cmd`+`Option`+`I` on macOS).
2. Open the **Sources** tab.
3. Under **Page → top → obsidian.md**, select **app.css**.
4. Scroll to the top of `app.css` to find all available CSS variables.
5. Search for variables related to the ribbon by pressing `Ctrl`+`F` (or `Cmd`+`F` on macOS) and typing "  --ribbon-". Notice the two blank spaces, which return the definitions rather than their uses.

One of the results is `--ribbon-background`, which sounds promising. To be sure, you can also inspect the HTML to find the CSS variable used by a specific element.

1. In the upper-left corner of the **Developer Tool**, select the icon that looks like a cursor on top of a rectangle.
2. Select the middle of the ribbon on the left side of the Obsidian window.

In the **Styles** tab, on the right side of the **Developer Tools**, you can now see the CSS that is applied to the element you selected, such as `background-color: var(--ribbon-background)`.

Now that you know `--ribbon-background` controls the ribbon background color, add the following to `theme.css`:

```css
body {
  --ribbon-background: magenta;
}
```

## Conclusion

In this tutorial, you've built your first Obsidian theme. You've modified the theme and reloaded it to reflect the changes inside Obsidian. You've also seen how you can find the CSS variables to style specific parts of the user interface.
