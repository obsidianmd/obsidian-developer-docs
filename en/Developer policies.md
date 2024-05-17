Our goal for community plugins and themes is to make it easy for users to safely modify and expand the capabilities of Obsidian, while prioritizing private and offline usage of the app.

All community plugins and themes added to the Obsidian directory must respect the following policies. Every plugin and theme is individually vetted before being included in the directory. Plugins and themes that don't follow these policies will be removed from the directory.

These policies only apply to plugins listed in the official Obsidian directory. These policies do not apply to plugins installed outside of the Obsidian directory, but they are nonetheless good practices to follow.

## Policies

### Not allowed

Plugins and themes must not:

- Obfuscate code to hide its purpose.
- Insert dynamic ads that are loaded over the internet.
- Insert static ads outside a plugin’s own interface.
- Include client-side telemetry.
- Themes may not load assets from the network. To bundle an asset, see [[Embed fonts and images in your theme|this guide]].

### Disclosures

The following are only allowed if clearly indicated in your README:

- Payment is required for full access.
- An account is required for full access.
- Network use. Clearly explain which remote services are used and why they're needed.
- Accessing files outside of Obsidian vaults. Clearly explain why this is needed.
- Static ads such as banners and pop-up messages within the plugin's own interface.
- Server-side telemetry. Link to a privacy policy that explains how the data is handled must be included.
- Close sourced code. This will be handled on a case by case basis.

### Copyright and licensing

All community plugins and themes must follow these requirements:

- Include a [LICENSE file](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/adding-a-license-to-a-repository) and clearly indicate the license of your plugin or theme.
- Comply with the original licenses of any code your plugin or theme makes use of, including attribution in the README if required.
- Respect Obsidian's trademark policy. Don't use the "Obsidian" trademark in a way that could confuse users into thinking your plugin or theme is a first-party creation.

## Reporting violations

If you encounter a plugin or theme that violates the policies above, please let the developer know by opening a GitHub issue in their repository. Kindly check existing issues to see if it’s already reported.

If the developer doesn’t response after 7 days, [contact the Obsidian team](https://help.obsidian.md/Help+and+support#Report+a+security+issue). For serious violations, you can contact our team immediately.

## Removing plugins and themes

In case of a policy violation, we may attempt to contact the developer and provide a reasonable timeframe for them to resolve the problem.

If the problem isn't resolved by then, we'll remove plugins or themes from our directory.

We may immediately remove a plugin or theme if:

- The plugin or theme appears to be malicious.
- The developer is uncooperative.
- This is a repeated violation.

In addition, we may also remove plugins or themes that have become unmaintained or severely broken.
