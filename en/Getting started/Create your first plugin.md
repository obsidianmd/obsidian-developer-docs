In this guide, you'll build a plugin for Obsidian from a sample plugin.

> [!warning] Before you start
> **Don't develop plugins in your main vault.** When you develop a plugin, one mistake can lead to unintentional modifications to your vault. You also risk **permanently deleting your vault**.

## Before you begin

To complete this guide, you will need:

- [Git](https://git-scm.com/) installed on your local machine.
- A [GitHub](https://github.com) account.
- A local development environment for [Node.js](https://Node.js.org/en/about/).

## Step 1 — Download the sample plugin

First, you'll download a working sample plugin that you'll build upon for the remaining steps.

1. Browse to the [Obsidian Sample Plugin](https://github.com/obsidianmd/obsidian-sample-plugin).
2. Click **Use this template**.
3. In **Repository name**, enter the name of your plugin. Obsidian plugins are typically prefixed by `obsidian-`. For example, `obsidian-instant-coffee`.
4. Click **Create repository from template**.

You've now created your own repository based on the Obsidian sample plugin. Next, you'll download the source code on your local machine.

1. Browse to the repository you just created.
2. Click **Code**, and copy the path to your repository.
3. Open a terminal and navigate to the vault.

   ```bash
   cd path/to/vault/.obsidian/plugins
   ```

4. Download the source code into the plugins folder.

   ```bash
   git clone https://github.com/your-username/obsidian-instant-coffee.git
   ```

## Step 2 — Build the plugin

In this section, you'll build the source code for the plugin.

1. Navigate into the plugin folder.

   ```bash
   cd path/to/vault/.obsidian/plugins/obsidian-instant-coffee
   ```

2. Install dependencies.

   ```bash
   npm install
   ```

3. Compile the source code. The following command generates a `main.js` that contains the compiled version of your plugin.

   ```bash
   npm run dev
   ```

## Step 3 — Enable the plugin

To load a plugin in Obsidian, you first need to enable it.

1. Open **Preferences** in Obsidian.
2. In the side menu, click **Community plugins**.
3. Under **Installed plugins**, enable the **Sample Plugin** by clicking the toggle button next to it.

You're now running a custom plugin that you've built yourself. Nice! 💪

Though, "Sample Plugin" is probably not the name you had in mind for your plugin. Let's change that.

## Step 4 — Update the plugin manifest

In this step, you'll update the _manifest_ to rename the plugin., The plugin manifest, `manifest.json` is a file that contains information about your plugin, such as its name and version.

1. Open the `obsidian-instant-coffee` directory in a code editor, such as [Visual Studio Code](https://code.visualstudio.com/).
2. Open `manifest.json` in your editor.
3. Change `id` to your plugin ID, for example `obsidian-instant-coffee`.
4. Change `name` to the human-friendly name of the plugin, for example `Instant coffee`.
5. If you'd like, then update `description`, `author`, and `authorUrl` as well.

A plugin is also a Node.js package, which you can configure in the `package.json`. You shouldn't need to worry much about it for now. For now, update it to match the properties in the plugin manifest.

1. Open `package.json` in your editor.
2. Change `name` to match the `id` in `manifest.json`.
3. Change `version` to match the `version` in `manifest.json`.
4. Change `description` to match the `description` in `manifest.json`.
5. Restart Obsidian to reload your plugin.

## Step 5 — Update the source code

In this step, you'll make a change to the source code and reload the plugin to reflect your change.

1. Open `main.ts` in your editor.
2. Find the lines of code that adds a _ribbon icon_.

   ```ts
   this.addRibbonIcon('dice', 'Sample Plugin', () => {
     new Notice('This is a notice!');
   });
   ```

2. Change the text for the notice. Feel free to come up with a text of your own.

   ```ts
   new Notice('Hello, you!');
   ```

3. Restart Obsidian to reload your plugin.
4. Click the die icon in the sidebar. Make sure it says "Sample Plugin" when you hover it.

## Next steps

You've built your own plugin for Obsidian! 🚀 You can experiment by making further changes to the code to see what it does. From here, you can explore some of the guides to see what your plugin can do.
