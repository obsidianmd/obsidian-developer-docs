A state field is an [[Editor extensions|editor extension]] that lets you manage custom editor state. This page walks you through building a state field by implementing a calculator extension.

The calculator should be able to add and subtract a number from the current state, and to reset the state when you want to start over.

By the end of this page, you'll understand the basic concepts of building a state field.

> [!note]
> This page aims to distill the official CodeMirror 6 documentation for Obsidian plugin developers. For more detailed information on state fields, refer to [State Fields](https://codemirror.net/docs/guide/#state-fields).

## Prerequisites

- Basic understanding of [[State management]].

## Defining state effects

State effects describe the state change you'd like to make. You may think of them as methods on a class.

In the calculator example, you'd define a state effect for each of the calculator operations:

```ts
const addEffect = StateEffect.define<number>();
const subtractEffect = StateEffect.define<number>();
const resetEffect = StateEffect.define();
```

The type between the angle brackets, `<>`, defines the input type for the effect. For example, the number you want to add or subtract. The reset effect doesn't need any input, so you can leave it out.

## Defining a state field

Contrary to what one might think, state fields don't actually _store_ state. They _manage_ it. State fields take the current state, applies any state effects, and returns the new state.

The state field contains the calculator logic to apply the mathematical operations depending on the effects in a transaction. Since a transaction can contain multiple effects, for example two additions, the state field needs to apply them all one after another.

```ts
export const calculatorField = StateField.define<number>({
  create(state: EditorState): number {
    return 0;
  },
  update(oldState: number, transaction: Transaction): number {
    let newState = oldState;

    for (let effect of transaction.effects) {
      if (effect.is(addEffect)) {
        newState += effect.value;
      } else if (effect.is(subtractEffect)) {
        newState -= effect.value;
      } else if (effect.is(resetEffect)) {
        newState = 0;
      }
    }

    return newState;
  },
});
```

- `create` returns the value the calculator starts with.
- `update` contains the logic for applying the effects.
- `effect.is()` lets you check the type of the effect before you apply it.

## Dispatching state effects

To apply a state effect to a state field, you need to dispatch it to the editor view as part of a transaction.

```ts
view.dispatch({
  effects: [addEffect.of(num)],
});
```

You can even define a set of helper functions that provide a more familiar API:

```ts
export function add(view: EditorView, num: number) {
  view.dispatch({
    effects: [addEffect.of(num)],
  });
}

export function subtract(view: EditorView, num: number) {
  view.dispatch({
    effects: [subtractEffect.of(num)],
  });
}

export function reset(view: EditorView) {
  view.dispatch({
    effects: [resetEffect.of(null)],
  });
}
```

## Next steps

Provide [[Decorations]] from your state fields to change how to display the document.
