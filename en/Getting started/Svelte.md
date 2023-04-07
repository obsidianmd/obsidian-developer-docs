This guide explains how to configure your plugin to use [Svelte](https://svelte.dev/), a light-weight alternative to traditional frameworks like React and Vue.

Svelte is built around a compiler that preprocesses your code and outputs vanilla JavaScript, which means it doesn't need to load any libraries at run time. This also means that it doesn't need a virtual DOM to track state changes, which allows your plugin to run with minimal additional overhead.

If you want to learn more about Svelte, and how to use it, refer to the [tutorial](https://svelte.dev/tutorial/basics) and the [documentation](https://svelte.dev/docs).

This guide assumes that you've finished [[Build a plugin]].

> [!tip] Visual Studio Code
> Svelte has an [official Visual Studio Code extension](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode) that enables syntax highlighting and rich IntelliSense in Svelte components.

## Configure your plugin

To build a Svelte application, you need to install the dependencies and configure your plugin to compile code written using Svelte.

1. Add Svelte to your plugin dependencies:

   ```bash npm2yarn
   npm install --save-dev svelte svelte-preprocess @tsconfig/svelte esbuild-svelte
   ```

1. Extend the `tsconfig.json` to enable additional type checking for common Svelte issues. The `types` property is important for TypeScript to recognize `.svelte` files.

   ```json title="tsconfig.json"
   {
     "extends": "@tsconfig/svelte/tsconfig.json",
     "compilerOptions": {
       "types": ["svelte", "node"],

       // ...
     }
   }
   ```

1. Remove the following line from your `tsconfig.json` as it conflicts with the Svelte configuration.

   ```json title="tsconfig.json"
   "inlineSourceMap": true,
   ```

1. In `esbuild.config.mjs`, add the following imports to the top of the file:

   ```js title="esbuild.config.mjs"
   import esbuildSvelte from "esbuild-svelte";
   import sveltePreprocess from "svelte-preprocess";
   ```

1. Add Svelte to the list of plugins.

   ```js title="esbuild.config.mjs" {15}
    esbuild
    .build({
      plugins: [
        esbuildSvelte({
          compilerOptions: { css: true },
          preprocess: sveltePreprocess(),
        }),
      ],
      // ...
    })
    .catch(() => process.exit(1));
   ```

## Create a Svelte component

In the root directory of the plugin, create a new file called `Component.svelte`:

```tsx title="Component.svelte"
<script lang="ts">
  export let variable: number;
</script>

<div class="number">
  <span>My number is {variable}!</span>
</div>

<style>
  .number {
    color: red;
  }
</style>
```

## Mount the Svelte component

To use the Svelte component, it needs to be mounted on an existing [[HTML elements|HTML element]]. For example, if you are mounting on a custom [[obsidian.itemview|ItemView]] in Obsidian:

```ts title="view.ts"
import { ItemView, WorkspaceLeaf } from "obsidian";

import Component from "./Component.svelte";

export const VIEW_TYPE_EXAMPLE = "example-view";

export class ExampleView extends ItemView {
  component: Component;

  constructor(leaf: WorkspaceLeaf) {
    super(leaf);
  }

  getViewType() {
    return VIEW_TYPE_EXAMPLE;
  }

  getDisplayText() {
    return "Example view";
  }

  async onOpen() {
    this.component = new Component({
      target: this.contentEl,
      props: {
        variable: 1
      }
    });
  }

  async onClose() {
    this.component.$destroy();
  }
}
```

> [!info]
> Svelte requires at least TypeScript 4.5. If you see the following error when you build the plugin, you need to upgrade TypeScript to a more recent version.
>
> ```plain
> error TS5023: Unknown compiler option 'preserveValueImports'.
> ```
>
> To fix the error, run the following in your terminal:
>
> ```bash
> yarn upgrade typescript@~4.5.0
> ```

## Create a Svelte store

To create a store for your plugin and access it from within a generic Svelte component instead of passing the plugin as a prop, follow these steps:

1. Create a file called `store.ts`:

   ```jsx title="store.ts"
   import { writable } from "svelte/store";
   import type ExamplePlugin from "./main";

   const plugin = writable<ExamplePlugin>();
   export default { plugin };
   ```

1. Configure the store:

   ```ts title="view.ts" {}
   import { ItemView, WorkspaceLeaf } from "obsidian";
   import type ExamplePlugin from "./main";
   import store from "./store";
   import Component from "./Component.svelte";

   const VIEW_TYPE_EXAMPLE = "example-view";

   class ExampleView extends ItemView {
     // ...

     async onOpen() {
       store.plugin.set(this.plugin);

       this.component = new Component({
         target: this.contentEl,
         props: {
           variable: 1
         }
       });
     }
   }
   ```

1. To use the store in your component:

   ```jsx title="Component.svelte" {}
   <script lang="ts">
     import type MyPlugin from "./main";

     let plugin: MyPlugin;
     store.plugin.subscribe((p) => (plugin = p));
   </script>
   ```
