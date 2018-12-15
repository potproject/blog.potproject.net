# blog.potproject.net

![](https://images.ctfassets.net/a9tjjm7bfbeq/34zPvI0Gg8qmgQC2smiO02/ece193cd4f66607af41f5d7315fabeab/new.PNG)

# Detail

based on [gatsby-starter-calpa-blog](https://github.com/calpa/gatsby-starter-calpa-blog/)

Homepage: https://blog.potproject.net/

[![Hosting by Netlify](https://www.netlify.com/img/global/badges/netlify-color-bg.svg)](https://www.netlify.com)

## Changed

### General

- Japanese Language Supported.
- i18n Supported. changed `dayjs` -> `Moment Timezone`
- Adding params `data/template/config.js`.
- Disabled Google Analytics.
- Deleted Pages.
- Package update.

### Perfomance fix

Lighthouse Performance: **100!**

- **Not Using jQuery** And deleted.  
  `bootstrap.js(jQuery)` -> `Bootstrap.native`  
  `fancybox` -> none
- Code refactoring.

### Config

- `zhihuUsername` is Deleted.

### Contentful Content Model : blogPost

- `tags` fields changed `string` to `Array<String>`.  
  `"Tag1, Tag2"` -> `["Tag1","Tag2"]`

- `jueJinLikeIconLink` And `jueJinPostLink` fields is Deleted.

- Add Fields `redirectPath`.

### Sidebar

- Adding Twiiter Link
- Adding Mastodon Link
- Deleting Mail Link
