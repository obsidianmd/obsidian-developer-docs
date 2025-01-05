This guide explains how to configure your plugin to use [Svelte](https://svelte.dev/), a light-weight alternative to traditional frameworks like React and Vue.

Svelte is built around a compiler that preprocesses your code and outputs optimized vanilla JavaScript. This means that it doesn't need a virtual DOM to track state changes, which allows your plugin to run with minimal additional overhead.

If you want to learn more about Svelte, and how to use it, refer to the [tutorial](https://svelte.dev/tutorial/svelte/welcome-to-svelte) and the [documentation](https://svelte.dev/docs/svelte/overview).

This guide assumes that you've finished [[Build a plugin]].

> [!tip] Visual Studio Code
> Svelte has an [official Visual Studio Code extension](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode) that enables syntax highlighting and rich IntelliSense in Svelte components.

## Configure your plugin

To build a plugin with Svelte, you need to install the dependencies and configure your plugin to compile code written using Svelte. 
If you only want to use TypeScript's *type-only* features, you don't need `svelte-preprocess`.

1. Add Svelte to your plugin dependencies:

   ```bash
   npm install --save-dev svelte svelte-preprocess esbuild-svelte svelte-check
   ```

   > [!info]
   > Svelte requires at least TypeScript 5.0. To update to Typescript 5.0 run the following in your terminal.
   >
   > ```bash
   > npm update typescript@~5.0.0
   > ```

2. Extend the `tsconfig.json` to enable additional type checking for common Svelte issues. `verbatimModuleSyntax` is needed for `svelte-preprocess` and `skipLibCheck` is needed for `svelte-check` to work correctly.

   ```json
   {
     "compilerOptions": {
       "verbatimModuleSyntax": true,
       "skipLibCheck": true,
       // ...
     },
     "include": [
       "**/*.ts",
       "**/*.svelte"
     ]
   }
   ```

3. In `esbuild.config.mjs`, add the following imports to the top of the file:

   ```js
   import esbuildSvelte from 'esbuild-svelte';
   import sveltePreprocess from 'svelte-preprocess';
   ```

4. Add Svelte to the list of plugins.

   ```js
   const context = await esbuild.context({
     plugins: [
       esbuildSvelte({
         compilerOptions: { css: 'injected' },
         preprocess: sveltePreprocess(),
       }),
     ],
     // ...
   });
   ```
  
5. Add a script to run `svelte-check` to your `package.json`.
   
   ```json
   {
     // ...
     "scripts": {
       // ...
       "svelte-check": "svelte-check --tsconfig tsconfig.json"
     }
   }
   ```

## Create a Svelte component

In the root directory of the plugin, create a new file called `Counter.svelte`:

```tsx
<script lang="ts">
  interface Props {
    startCount: number;
  }

  let {
    startCount
  }: Props = $props();

  let count = $state(startCount);

  export function increment() {
    count += 1;
  }
</script>

<div class="number">
  <span>My number is {count}!</span>
</div>

<style>
  .number {
    color: red;
  }
</style>
```

## Mount the Svelte component

To use the Svelte component, it needs to be mounted on an existing [[HTML elements|HTML element]]. For example, if you are mounting on a custom [[ItemView|ItemView]] in Obsidian, create a file called `example_view.ts`

```ts
import { ItemView, WorkspaceLeaf } from 'obsidian';

// Import the Counter Svelte component and the `mount` and `unmount` methods.
import Counter from './Counter.svelte';
import { mount, unmount } from 'svelte';

export const VIEW_TYPE_EXAMPLE = 'example-view';

export class ExampleView extends ItemView {
  // A variable to hold on to the Counter instance mounted in this ItemView.
  counter: ReturnType<typeof Counter> | undefined;

  constructor(leaf: WorkspaceLeaf) {
    super(leaf);
  }

  getViewType() {
    return VIEW_TYPE_EXAMPLE;
  }

  getDisplayText() {
    return 'Example view';
  }

  async onOpen() {
    // Attach the Svelte component to the ItemViews content element and provide the needed props.
    this.counter = mount(Counter, {
      target: this.contentEl,
      props: {
        startCount: 5,
      }
    });

    // Since the component instance is typed, the exported `increment` method is known to TypeScript.
    this.counter.increment();
  }

  async onClose() {
    if (this.counter) {
      // Remove the Counter from the ItemView.
      unmount(this.counter);
    }
  }
}
```

The view then needs to be be registered in the [[obsidian-developer-docs/en/Reference/TypeScript API/Plugin/onload|onload]] function of `main.ts`.
```ts
import { ExampleView, VIEW_TYPE_EXAMPLE } from "./example_view.ts"
...
export default class MyPlugin extends Plugin {
	...
	async onload() {
		...
		this.registerView(VIEW_TYPE_EXAMPLE, (leaf) => new ExampleView(leaf));
	}
	...
}
```

With the view registered, you can adjust the ribbon icon to reveal this view in the right leaf:
```ts
export default class MyPlugin extends Plugin {
	...
	async onload() {
		...
		const ribbonIconEl = this.addRibbonIcon('dice', 'Sample Plugin', (evt: MouseEvent) => {
			// Called when the user clicks the icon.
			this.activateView();
		});
		...
	}
	...
	async activateView() {
		const { workspace } = this.app;
		
		let leaf: WorkspaceLeaf | null = null;
		const leaves = workspace.getLeavesOfType(VIEW_TYPE_EXAMPLE);
		
		if (leaves.length > 0) {
			// A leaf with our view already exists, use that
			leaf = leaves[0];
		} else {
			// Our view could not be found in the workspace, create a new leaf
			// in the right sidebar for it
			leaf = workspace.getRightLeaf(false);
			await leaf.setViewState({ type: VIEW_TYPE_EXAMPLE, active: true });
		}
		
		// "Reveal" the leaf in case it is in a collapsed sidebar
		workspace.revealLeaf(leaf);
	}
```
