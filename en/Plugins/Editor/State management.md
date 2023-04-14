This page aims to give an introduction to state management for [[Editor extensions|editor extensions]].

> [!note]
> This page aims to distill the official CodeMirror 6 documentation for Obsidian plugin developers. For more detailed information on state management, refer to [State and Updates](https://codemirror.net/docs/guide/#state-and-updates).

## State changes

In most applications, you would update state by assigning a new value to a property or variable. As a consequence, the old value is lost forever.

```ts
let note = "";
note = "Heading"
note = "# Heading"
note = "## Heading" // How to undo this?
```

To support features like undoing and redoing changes to a user's workspace, applications like Obsidian instead keep a history of all changes that have been made. To undo a change, you can then go back to a point in time before the change was made.

|   | State      |
|---|------------|
| 0 |            |
| 1 | Heading    |
| 2 | # Heading  |
| 3 | ## Heading |

In TypeScript, you'd then end up with something like this:

```ts
const changes: ChangeSpec[] = [];

changes.push({ from: 0, insert: "Heading" });
changes.push({ from: 0, insert: "# " });
changes.push({ from: 0, insert: "#" });
```

## Transactions

Imagine a feature where you select some text and press the double quote, `"` to surround the selection with quotes on both sides. One way to implement the feature would be to:

1. Insert `"` at the start of the selection.
2. Insert `"` at the end of the selection.

Notice that the implementation consists of _two_ state changes. If you added these to the undo history, the user would need to undo _twice_, once for each double quote. To avoid this, what if you could group these changes so that they appear as one?

For editor extensions, a group of state changes that happen together is called a _transaction_.

If you combine what you've learned so far—and if you allow transactions that contain only a single state change—then you can consider state as a _history of transactions_.

Bringing it all together to implement the surround feature from before in an editor extension, here's how you'd add, or _dispatch_, a transaction to the editor view:

```ts
view.dispatch({
  changes: [
    { from: selectionStart, insert: `"` },
    { from: selectionEnd, insert: `"` }
  ]
});
```

## Next steps

On this page, you've learned about modeling state as a series of state changes, and how to group them into transactions.

To learn how to manage custom state in your editor, refer to [[State fields]].
