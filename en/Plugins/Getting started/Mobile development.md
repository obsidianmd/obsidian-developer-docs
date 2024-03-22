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

## Inspecting the webview on the actual mobile device

### Android

You can inspect Obsidian running on an Android device if you enable USB Debugging in Developer settings of Android. Then go to a chromium based browser on your desktop/laptop and navigate to chrome://inspect/. If you did everything right, if you have your phone/tablet connected to your PC via USB and the browser open at that link you should see your device pop up and it will let you run the usual devtools from there on it.

More in depth information can be found here: https://developer.chrome.com/docs/devtools/remote-debugging?hl=de
### iOS

You can inspect Obsidian on an iOS device running 16.4 or later and a macOS based computer. Instructions on how to set it up can be found here: https://webkit.org/web-inspector/enabling-web-inspector/

## Platform-specific features

To detect the platform your plugin is running on, you can use [[Platform]]:

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

The Node.js API, and the Electron API aren't available on mobile devices. Any calls to these libraries made by your plugin or it's dependencies can cause your plugin to crash.

### Lookbehind in regular expressions

Lookbehind in regular expressions is only supported on iOS 16.4 and above, and some iPhone and iPad users may still use earlier versions. To implement a fallback for iOS users, either refer to [[#Platform-specific features]], or use a JavaScript library to detect specific browser versions.

Refer to [Can I Use](https://caniuse.com/js-regexp-lookbehind) for more information and exact version statistics. Look for "Safari on iOS".
