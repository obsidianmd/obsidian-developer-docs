## [[Commands]]

### Commands should use [sentence case]() for their names.

Sentence case maximizes readability in the command palette and provides a consistent user experience.

### Only make a command available in the command palette when its contextually relevant.

For example, if your command requires an [[en/Reference/TypeScript API/Editor/Editor|Editor]] instance to operate then you should be using [[editorCallback]].

### Include ellipses ("...") in the command name to indicate when more information will be required.

An ellipses helps distinguish commands that require further user action from commands that perform an action immediately. For example, the **Export to PDF...** command has an intermediate step of opening a command that requires additional selections from the user before the actual export takes place. In contrast, the command **Delete current file** will operate immediately.