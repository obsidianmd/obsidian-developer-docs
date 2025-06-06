---
aliases: "DataAdapter.write"
cssclasses: hide-title
---

<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[`DataAdapter`](DataAdapter) › [`write`](DataAdapter/write)

## DataAdapter.write() method

Write to a plaintext file. If the file exists its content will be overwritten, otherwise the file will be created.

**Signature:**

```typescript
write(normalizedPath: string, data: string, options?: DataWriteOptions): Promise<void>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  <code>normalizedPath</code> | <code>string</code> | path to file, use [normalizePath()](normalizePath) to normalize beforehand. |
|  <code>data</code> | <code>string</code> | new file content |
|  <code>options</code> | [`DataWriteOptions`](DataWriteOptions) | _(Optional)_ (Optional) |

**Returns:**

`Promise<void>`

