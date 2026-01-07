If you want users to be able to configure parts of your plugin themselves, you can expose them as _settings_.

In this guide, you'll learn how you can create a settings page like this 👇

![[settings.png]]

The main reason to add settings to a plugin is to store configuration that persists even after the user quits Obsidian. The following example demonstrates how to save and load settings from disk:

```ts
import { Plugin } from 'obsidian';
import { ExampleSettingTab } from './settings';

interface ExamplePluginSettings {
  sampleValue: string;
}

const DEFAULT_SETTINGS: Partial<ExamplePluginSettings> = {
  sampleValue: 'Lorem ipsum',
};

export default class ExamplePlugin extends Plugin {
  settings: ExamplePluginSettings;

  async onload() {
    await this.loadSettings();

    this.addSettingTab(new ExampleSettingTab(this.app, this));
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
```

> [!warning] Nested properties in settings
> `Object.assign()` copies the references to any nested property (shallow copy). If your settings object contains nested properties, you need to copy each nested property recursively (deep copy). Otherwise, any changes to a nested property will apply to all objects that were copied using `Object.assign()`.

There's a lot going on here 🤯, so let's look closer at each part.

## Create a settings definition

First, you need to define, which settings you want the user to be able to configure. Therefore, you create an interface, `ExamplePluginSettings`. While the plugin is enabled, you can access its settings from the `settings` member variable, which in our example is of type `ExamplePluginSettings`.

```ts
interface ExamplePluginSettings {
  sampleValue: string;
}

export default class ExamplePlugin extends Plugin {
  settings: ExamplePluginSettings;

  // ...
}
```

## Save and load the settings object

[[loadData|loadData()]] and [[saveData|saveData()]] provide an easy way to store and retrieve data from disk. The example also introduces two helper methods that make it easier to use `loadData()` and `saveData()` from other parts of the plugin.

```ts
export default class ExamplePlugin extends Plugin {

  // ...

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
```

Finally, make sure to load the settings when the plugin loads:

```ts
async onload() {
  await this.loadSettings();

  // ...
}
```

## Provide default values

When the user enables the plugin for the first time, none of the settings have been configured yet. The preceding example provides default values for any missing settings.

To understand how this works, have a look at the following code:

```ts
Object.assign({}, DEFAULT_SETTINGS, await this.loadData())
```

`Object.assign()` is a JavaScript function that copies all properties from one object to another. Any properties that are returned by `loadData()` override the properties in `DEFAULT_SETTINGS`.

```ts
const DEFAULT_SETTINGS: Partial<ExamplePluginSettings> = {
  sampleValue: 'Lorem ipsum',
};
```

> [!tip]
> `Partial<Type>` is a TypeScript utility that returns a type with all properties of `Type` set to optional. It enables type checking while letting you only define the properties you want to provide defaults for.

## Register a settings tab

The plugin can now save and load plugin configuration, but the user doesn't yet have any way of changing any of the settings. By adding a settings tab you can provide an easy-to-use interface for the user to update their plugin settings:

```ts
this.addSettingTab(new ExampleSettingTab(this.app, this));
```

Here, the `ExampleSettingTab` is a class that extends [[PluginSettingTab|PluginSettingTab]]:

```ts
import ExamplePlugin from './main';
import { App, PluginSettingTab, Setting } from 'obsidian';

export class ExampleSettingTab extends PluginSettingTab {
  plugin: ExamplePlugin;

  constructor(app: App, plugin: ExamplePlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    let { containerEl } = this;

    containerEl.empty();

    new Setting(containerEl)
      .setName('Default value')
      .addText((text) =>
        text
          .setPlaceholder('Lorem ipsum')
          .setValue(this.plugin.settings.sampleValue)
          .onChange(async (value) => {
            this.plugin.settings.sampleValue = value;
            await this.plugin.saveSettings();
          })
      );
  }
}
```

`display()` is where you build the content for the settings tab. For more information, refer to [[HTML elements]].

`new Setting(containerEl)` appends a setting to the container element. This example only provides a text field using `addText()`, but there are several other setting types available.
The [[Setting]] class also provides some functions like `setName` and `setDesc` to provide a name and a description to your setting.

Update the settings object whenever the value of the text field changes, and then save it to disk:

```ts
.onChange(async (value) => {
  this.plugin.settings.sampleValue = value;
  await this.plugin.saveSettings();
})
```

Nice work! 💪 Your users will thank you for giving them a way to customize how they interact with your plugin. Before heading to the next guide, experiment with what you've learned maybe by adding another setting.

## Available settings types

### Headings

If you have a lot of settings in your plugin it can be useful to separate settings into different sections.
```ts
new Setting(containerEl).setName("Defaults").setHeading();
```
Since everything in under the settings tab is settings, repeating the word "settings" or a synonym for every heading becomes redundant.
General settings should be at the top of the settings tab and should not have a heading.
### Text

```ts
new Setting(containerEl)  
    .setName('Text input')  
    .setDesc('Sample description')  
    .addText((text) =>  
       text  
          .setPlaceholder('Lorem ipsum')  
          .setValue(this.plugin.settings.sampleValue)  
          .onChange(async (value) => {  
            ...
          })
    );
```

### Textarea

```ts
new Setting(containerEl)  
    .setName('Textarea') 
    .addTextArea((text) => {  
	    ...
    });
```

### Search

To provide users with a searchable list of available items you can implement the [[AbstractInputSuggest]] class and hook it up to a search. (but it also works with regular text inputs)

![[settings-suggestions.png]]

```ts
new Setting(containerEl)  
    .setName('Search')  
    .addSearch(search => {  
       search.setValue(this.plugin.settings.icon)  
          .setPlaceholder('Search for an icon')  
          .onChange(async (value) => {  
             this.plugin.settings.icon = value;  
             await this.plugin.saveSettings();  
          });  
       new IconSuggest(this.plugin.app, search.inputEl);  
    });
```


### Moment format

Obsidian uses the [moment.js](https://momentjs.com/) library for formatting dates.
The library supports custom tokens to customize the look of the resulting string.
The [[MomentFormatComponent]] can be used to render an example of the currently configured format.

```ts
const dateDesc = document.createDocumentFragment();  
dateDesc.appendText('For a list of all available tokens, see the ');  
dateDesc.createEl('a', {  
    text: 'format reference',  
    attr: { href: 'https://momentjs.com/docs/#/displaying/format/', target: '_blank' }  
});  
dateDesc.createEl('br');  
dateDesc.appendText('Your current syntax looks like this: ');  
const dateSampleEl = dateDesc.createEl('b', 'u-pop');  
new Setting(containerEl)  
    .setName('Date format')  
    .setDesc(dateDesc)  
    .addMomentFormat(momentFormat => momentFormat  
       .setValue(this.plugin.settings.dateFormat)  
       .setSampleEl(dateSampleEl)  
       .setDefaultFormat('MMMM dd, yyyy')  
       .onChange(async (value) => {  
          this.plugin.settings.dateFormat = value;  
          await this.plugin.saveSettings();  
       }));
```

### Buttons
```ts
new Setting(containerEl)  
    .setName('Button')  
    .setDesc('With extra button')  
    .addButton(button => button  
       .setButtonText('Click me!')  
       .onClick(() => {  
          new Notice('This is a notice!');  
       })  
    )
);
```

You can also add multiple buttons to the same setting for performing different actions.

### Extra button

This button can be added to any other settings type, to reset it to the default value, for example.

```ts
new Setting(containerEl)  
    .setName('Button')  
    .setDesc('With extra button')  
    .addButton(button => button  
       .setButtonText('Click me!')  
       .onClick(() => {  
         /...
       })  
    ).addExtraButton(button => button  
    .setIcon('gear')  
    .onClick(() => {  
       //...  
    })  
);
```

### Toggle
```ts
new Setting(containerEl)  
    .setName('Toggle')  
    .addToggle(toggle => toggle  
       .setValue(this.plugin.settings.localServer)  
       .onChange(async (value) => {  
          this.plugin.settings.localServer = value;  
          await this.plugin.saveSettings();  
          this.display();  
       })  
    );
```

### Dropdown
```ts
new Setting(containerEl)  
    .setName('Dropdown')  
    .addDropdown((dropdown) =>  
       dropdown  
          .addOption('1', 'Option 1')  
          .addOption('2', 'Option 2')  
          .addOption('3', 'Option 3')  
          .setValue(this.plugin.settings.mySetting)  
          .onChange(async (value) => {  
             this.plugin.settings.mySetting = value;  
             await this.plugin.saveSettings();  
          })  
    );
```

### Slider

```ts
new Setting(containerEl)  
    .setName('Slider')  
    .setDesc('with tooltip')  
    .addSlider(slider => slider.setDynamicTooltip()  
    );
```

### Progress bar

While a slider allows for numeric input, a progress bar can show the progress of a task running in the background, but it can also be used to show a quota, for example the disk space used.

```ts
new Setting(containerEl)  
    .setName('Progress bar')  
    .setDesc('It\'s 50% done')  
    .addProgressBar(bar => bar.setValue(50));
```

### Color picker

```ts
new Setting(containerEl)
    .setName('Color picker')
    .addColorPicker(color => color
       .setValue('#FFFFFF')
    );
```
