Learn how you can develop your plugin for mobile devices.

## Emulate mobile device on desktop

You can emulate Obsidian running a mobile device directly from the Developer Tools.

1. Open the **Developer Tools**.
2. Select the **Console** tab.
3. Enter the following and then press `Enter`.

   ```ts
   this.app.emulateMobile(true);
   ```

To disable mobile emulation, enter the following and press `Enter`:

```ts
this.app.emulateMobile(false);
```

> [!tip]
> To instead toggle mobile emulation back and forth, you can use the `this.app.isMobile` flag:
>
> ```ts
> this.app.emulateMobile(!this.app.isMobile);
> ```

## Platform-specific features

To detect the platform your plugin is running on, you can use `Platform`:

```ts
import { Platform } from "obsidian";

if (Platform.isIosApp) {
  // ...
}

if (Platform.isAndroidApp) {
  // ...
}
```

## Disable your plugin on mobile devices

If your plugin requires the Node.js or Electron API, you can prevent users from installing the plugin on mobile devices.

To only support the desktop app, set `isDesktopOnly` to `true` in the [[Manifest]].

## Troubleshooting

This section lists common issues when developing for mobile devices.

### Node and Electron APIs

The Node.js API and the Electron API aren't available on mobile devices. Any calls to these libraries result cause your plugin to crash.

### Lookbehind in regular expressions

Lookbehind in regular expressions is currently not supported on iOS. To implement a fallback for iOS users, refer to [[#Platform-specific features]].

Refer to [Can I Use](https://caniuse.com/js-regexp-lookbehind) for an up-to-date status. Look for "Safari on iOS".
