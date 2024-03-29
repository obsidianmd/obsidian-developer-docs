---
aliases: "EditorSuggest.onTrigger"
cssclasses: hide-title
---

<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[`EditorSuggest`](EditorSuggest) › [`onTrigger`](EditorSuggest/onTrigger)

## EditorSuggest.onTrigger() method

Based on the editor line and cursor position, determine if this EditorSuggest should be triggered at this moment. Typically, you would run a regular expression on the current line text before the cursor. Return null to indicate that this editor suggest is not supposed to be triggered.

Please be mindful of performance when implementing this function, as it will be triggered very often (on each keypress). Keep it simple, and return null as early as possible if you determine that it is not the right time.

**Signature:**

```typescript
abstract onTrigger(cursor: EditorPosition, editor: Editor, file: TFile | null): EditorSuggestTriggerInfo | null;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  <code>cursor</code> | [`EditorPosition`](EditorPosition) |  |
|  <code>editor</code> | [`Editor`](Editor) |  |
|  <code>file</code> | [`TFile`](TFile)<code> &#124; null</code> |  |

**Returns:**

[`EditorSuggestTriggerInfo`](EditorSuggestTriggerInfo)` | null`

