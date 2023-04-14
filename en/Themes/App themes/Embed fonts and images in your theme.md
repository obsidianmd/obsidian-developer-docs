Learn how to include assets, such as fonts and images, in your theme.

> [!warning] Loading remote content
> For Obsidian to work offline and to preserve user privacy, themes [[Developer policies|aren't allowed]] to load remote content over the network. For more information, refer to [[Theme guidelines#Keep resources local]]

## Use data URLs

To include assets such as fonts, icons, and images in your theme, you need to _embed_ them in the CSS file by passing a [data URL](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs) to the [url()](https://developer.mozilla.org/en-US/docs/Web/CSS/url) function.

To create a data URL for your assets, create a URL using the following format:

```css
url("data:<MIME_TYPE>;base64,<BASE64_DATA>")
```

- Replace `<MIME_TYPE>` with the MIME type for your asset. If you don't know it, refer to [Common MIME types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types).
- Replace `<BASE64_DATA>` with the [Base64](https://en.wikipedia.org/wiki/Base64) encoded representation of your asset.

The following example embeds a GIF file as a background image:

```css
h1 {
  background-image: url("data:image/gif;base64,R0lGODdhAQADAPABAP////8AACwAAAAAAQADAAACAgxQADs=")
}
```


## Encode your assets

For instructions on how to encode an asset into base64, refer to [Encoding data into base64 format](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs#encoding_data_into_base64_format).

You can also use one of the many free online tools for encoding.

For fonts:

- [Woff2Base](https://hellogreg.github.io/woff2base/) for WOFF2 font files
- [Aspose](https://products.aspose.app/font/base64) supports a wide variety of font formats

For images:

- [WebSemantics](https://websemantics.uk/tools/image-to-data-uri-converter/) converts JPEG, JPG, GIF, PNG, SVG
- [Base64 Guru](https://base64.guru/converter/encode/image) supports a wide variety of image formats
- [Yoksel URL-encoder for SVG](https://yoksel.github.io/url-encoder/) optimized for SVG files


## Consider file size

Embedding assets increases the file size of your theme, which may lead to poor performance in the following situations:

- Downloading and updating your theme from the community theme directory.
- Loading and using your theme in the Obsidian app.
- Editing your theme in a code editor. Consider breaking up your theme into multiple files using a CSS preprocessor, such as [Sass](https://sass-lang.com/) or [Less](https://lesscss.org/).