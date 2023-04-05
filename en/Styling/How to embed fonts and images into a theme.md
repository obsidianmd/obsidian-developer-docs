As described in the [[Theme guidelines]], Obsidian themes submitted to the Community Themes directory may not load resources over the network. This is to preserve user privacy and ensure themes work even when no internet connection is available.

If you wish to use custom fonts, icons, backgrounds, or other resources, you will need to embed those assets in the CSS file itself using data URIs.

## Using data URLs

> [!Important]
> Data URLs can be used in CSS wherever the [url()](https://developer.mozilla.org/en-US/docs/Web/CSS/url) function can be used.

Typically, when using images in CSS you might link to an external asset like this:

```css
h1 {
  background-image: url("assets/image.png")
}
```

However, Obsidian does not (yet) allow you to bundle assets with your theme — only the `.css` file is read. Therefore, if you want to include assets you will need to embed the data directly into the CSS file with data URLs.

Data URLs look like this: 

```css
h1 {
  background-image: url("data:image/gif;base64,R0lGODdhAQADAPABAP////8AACwAAAAAAQADAAACAgxQADs=")
}
```

Data URLs encode the asset data directly into the file. In this case the encoding uses a common format called [Base64](https://en.wikipedia.org/wiki/Base64).

## Encoding your assets with Base64

There are many free online tools you can use to encode your assets with Base64. Below are a few options, depending on your needs.

### Encode fonts

- [Woff2Base](https://hellogreg.github.io/woff2base/) for WOFF2 font files
- [Aspose](https://products.aspose.app/font/base64) supports a wide variety of font formats

### Encode images

- [WebSemantics](https://websemantics.uk/tools/image-to-data-uri-converter/) converts JPEG, JPG, GIF, PNG, SVG
- [Base64 Guru](https://base64.guru/converter/encode/image) supports a wide variety of image formats
- [Yoksel URL-encoder for SVG](https://yoksel.github.io/url-encoder/) optimized for SVG files

## Consider file size

Before you jump in and add lots of Base64-encoded assets to your theme, consider that using data URLs can significantly increase the file size of your theme. This can have adverse side effects:

- Your theme may be slower to download and update from the Community Theme directory for users with slower internet connections
- Your theme may negatively affect the performance of the Obsidian app
- Your theme file may become harder to work with in your code editor. You may need to break up your theme file into partials and compile them using a CSS preprocessor like [Sass](https://sass-lang.com/) or [Less](https://lesscss.org/)