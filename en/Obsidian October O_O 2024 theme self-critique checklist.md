---
description: A checklist for theme developers to self-critique their themes.
permalink: oo24/theme
---
## [Add this checklist to your Obsidian](obsidian://new?name=Obsidian%20October%20O_O%202024%20theme%20self-critique%20checklist&content=%23%23%20Compatibility%0A%0A-%20%5B%20%5D%20Do%20use%20CSS%20variables%20whenever%20you%20can.%20%5BLearn%20more%5D%28https%3A%2F%2Fdocs.obsidian.md%2FReference%2FCSS%2Bvariables%2FCSS%2Bvariables%29.%0A-%20%5B%20%5D%20Don%27t%20use%20%60%21important%60.%0A-%20%5B%20%5D%20Don%27t%20change%20vertical%20margins%20in%20classes%20used%20in%20live%20preview%20editor%2C%20use%20padding%20instead.%0A-%20%5B%20%5D%20If%20you%27re%20using%20recent%20experimental%20CSS%20features%2C%20mention%20the%20minimal%20installer%20version%20required%20in%20the%20README.%0A%0A%23%23%20Performance%0A%0A-%20%5B%20%5D%20Don%27t%20use%20%60%3Ahas%28%29%60%20unless%20absolutely%20necessary.%20It%20causes%20performance%20issues%20especially%20in%20Canvas.%0A-%20%5B%20%5D%20Don%27t%20link%20to%20assets%20such%20as%20fonts%20and%20images.%20Keep%20them%20local.%20%5BLearn%20more%5D%28https%3A%2F%2Fdocs.obsidian.md%2FThemes%2FApp%2Bthemes%2FTheme%2Bguidelines%23Keep%2Bassets%2Blocal%29.%0A%0A%0A%23%23%20Releasing%0A%0A-%20%5B%20%5D%20Don%27t%20include%20the%20word%20%22Obsidian%22%20in%20your%20name%20unless%20it%20absolutely%20makes%20sense.%20Most%20of%20the%20time%20it%27s%20redundant.%0A-%20%5B%20%5D%20Do%20check%20your%20screenshot%20files%20are%20up-to-date.%20These%20screenshots%20are%20shown%20as%20thumbnails%20in%20the%20theme%20directory.%0A-%20%5B%20%5D%20Do%20check%20your%20README%20to%20make%20sure%20it%27s%20up-to-date.%20This%20is%20the%20what%20all%20potential%20users%20see%20when%20they%20check%20out%20your%20theme%20in%20the%20theme%20directory.%0A-%20%5B%20%5D%20Do%20keep%20your%20screenshot%20small%20so%20it%20loads%20fast%20in%20the%20directory.%20We%20recommend%20the%20dimension%20of%20512%20x%20288%20pixels.%0A-%20%5B%20%5D%20Do%20make%20sure%20you%20have%20a%20license%20in%20place%20so%20others%20know%20how%20to%20use%20your%20theme%20and%20its%20source%20code.)
## Compatibility

- [ ] Do use CSS variables whenever you can. [Learn more](https://docs.obsidian.md/Reference/CSS+variables/CSS+variables).
- [ ] Don't use `!important`.
- [ ] Don't change vertical margins in classes used in live preview editor, use padding instead.
- [ ] If you're using recent experimental CSS features, mention the minimal installer version required in the README.

## Performance

- [ ] Don't use `:has()` unless absolutely necessary. It causes performance issues especially in Canvas.
- [ ] Don't link to assets such as fonts and images. Keep them local. [Learn more](https://docs.obsidian.md/Themes/App+themes/Theme+guidelines#Keep+assets+local).


## Releasing

- [ ] Don't include the word "Obsidian" in your name unless it absolutely makes sense. Most of the time it's redundant.
- [ ] Do check your screenshot files are up-to-date. These screenshots are shown as thumbnails in the theme directory.
- [ ] Do check your README to make sure it's up-to-date. This is the what all potential users see when they check out your theme in the theme directory.
- [ ] Do keep your screenshot small so it loads fast in the directory. We recommend the dimension of 512 x 288 pixels.
- [ ] Do make sure you have a license in place so others know how to use your theme and its source code.