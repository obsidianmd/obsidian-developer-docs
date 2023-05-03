## [[Commands]]

### Commands should use [sentence case](https://en.wiktionary.org/wiki/sentence_case) for their names.

Sentence case maximizes readability in the command palette and provides a consistent user experience.

### Only make a command available in the command palette when its contextually relevant.

For example, if your command requires an [[en/Reference/TypeScript API/Editor/Editor|Editor]] instance to operate then you should be using [[editorCallback]].

### Include ellipses ("...") in the command name to indicate when more information will be required.

An ellipses helps distinguish commands that require further user action from commands that perform an action immediately. For example, the **Export to PDF...** command has an intermediate step of opening a command that requires additional selections from the user before the actual export takes place. In contrast, the command **Delete current file** will operate immediately.

## [[Settings]]

### Minimize the number of settings you offer.

While users might ask for more flexibility and control over the plugin behavior, it's important to consider the experience for new users. More settings more setup for users and often creates more complexity.

### Provide default settings when appropriate.

When providing settings for your plugin, be mindful of the time it takes between a user installing the plugin and the moment they can begin using it. Default settings should be non-controversial and cater to the general audience of the plugin.

### Setting names should use [sentence case](https://en.wiktionary.org/wiki/sentence_case) for their names.

Sentence case maximizes readability in the command palette and provides a consistent user experience.