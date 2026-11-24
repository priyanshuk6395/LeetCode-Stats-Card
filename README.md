# LeetCode Stats Card


Show your dynamically generated LeetCode stats on your GitHub profile or your website!

Fork maintained by [Priyanshu Kumar](https://github.com/priyanshuk6395). This project is based on the original work by JacobLinCool; see [LICENSE](./LICENSE) for the retained copyright and license notice.

LeetCode and LeetCode CN are both supported.

[Playground: Try It Now](https://leetcard.jacoblin.cool/)

[![LeetCode Stats](https://leetcard.jacoblin.cool/priyanshuk6395?theme=unicorn&extension=activity)](https://leetcard.jacoblin.cool/priyanshuk6395?theme=unicorn&extension=activity)

## Features

- 📈 Clean and simple LeetCode stats, for both `us` and `cn` sites
- 🎨 Multiple themes and 1,300+ fonts - [Theme](#theme-default-lightdark), [Font](#font-default-baloo_2)
- 🪄 Fully customizable using CSS - [Custom Stylesheets](#sheets-default-)
- ⚡️ Fast and global edge network - [Cloudflare Workers](https://workers.cloudflare.com/)
- 🚫 No tracking, controllable cache - [Cache](#cache-default-60)
- 🍀 Open source - [MIT License](./LICENSE)
- ⚙️ Extended-cards: `activity`, `contest`, `heatmap`

It also has a [NPM package](https://www.npmjs.com/package/leetcode-card) and a [highly extensible system](./packages/core/src/index.ts), so you can easily customize it to your needs.

Want to contribute? Feel free to open a pull request!

## Self-hosting

To self-host this fork, build the image locally with `pnpm build:image` and run it with Docker Compose.

See [docker-compose.yml](./docker-compose.yml) for an example.

## Usage

Simply copy the code below, paste it into your `README.md`, and change the path to your leetcode username (case-insensitive).

```md
![Leetcode Stats](https://leetcard.jacoblin.cool/priyanshuk6395)
```

Congratulation! You are now showing your LeetCode stats on your profile!

Want a hyperlink? Try this:

```md
[![Leetcode Stats](https://leetcard.jacoblin.cool/priyanshuk6395)](https://leetcode.com/u/priyanshuk6395)
```

### Endpoint

The endpoint of this tool is:

<https://leetcard.jacoblin.cool/>

> The legacy one: <https://leetcode.card.workers.dev/>

### Options

There are many options, you can configure them by passing a query string to the endpoint.

#### `site` (default: `us`)

Data source, can be `us` or `cn`.

```md
![](https://leetcard.jacoblin.cool/leetcode?site=cn)
```

[![](https://leetcard.jacoblin.cool/leetcode?site=cn)](https://leetcard.jacoblin.cool/leetcode?site=cn)

#### `theme` (default: `light,dark`)

Card theme, see [Theme](#themes) for more information.

Use a comma to separate the light and dark theme.

```md
![](https://leetcard.jacoblin.cool/priyanshuk6395?theme=unicorn)
![](https://leetcard.jacoblin.cool/priyanshuk6395?theme=light,unicorn)
```

[![](https://leetcard.jacoblin.cool/priyanshuk6395?theme=unicorn)](https://leetcode.com/u/priyanshuk6395/)

#### `colors` (default: `""`)

Override the card's theme palette with your own comma-separated list of hex colors.

Format:  
`colors=bg0,bg1,text0,text1,color0,color1,color2,color3`

You can provide fewer values; missing values will be padded by repeating the last provided one.

Example (Blue Palette):

```md
![](https://leetcard.jacoblin.cool/priyanshuk6395?colors=012a4a,013a63,a9d6e5,ffffff,0077b6,0096c7,00b4d8,90e0ef)
```

When both `theme` and `colors` are provided, `colors` takes precedence.

#### `font` (default: `Baloo_2`)

Card font, you can use almost all fonts on [Google Fonts](https://fonts.google.com/).

It is case-insensitive, and you can use `font=dancing_script` or `font=Dancing%20Script` to get the same result.

```md
![](https://leetcard.jacoblin.cool/priyanshuk6395?font=Dancing_Script)
```

[![](https://leetcard.jacoblin.cool/priyanshuk6395?font=Dancing_Script)](https://leetcard.jacoblin.cool/priyanshuk6395?font=Dancing_Script)

#### `width` and `height` (default: `500` and `200`)

Change the card size, it will not resize the content.

But it will be helpful if you want to use custom css.

```md
![](https://leetcard.jacoblin.cool/priyanshuk6395?width=500&height=500)
```

[![](https://leetcard.jacoblin.cool/priyanshuk6395?width=500&height=500)](https://leetcard.jacoblin.cool/priyanshuk6395?width=500&height=500)

#### `border` and `radius` (default: `1` and `4`)

Change the card border and radius.

```md
![](https://leetcard.jacoblin.cool/priyanshuk6395?border=0&radius=20)
```

[![](https://leetcard.jacoblin.cool/priyanshuk6395?border=0&radius=20)](https://leetcard.jacoblin.cool/priyanshuk6395?border=0&radius=20)

#### `animation` (default: `true`)

Enable or disable the animation.

```md
![](https://leetcard.jacoblin.cool/priyanshuk6395?animation=false)
```

[![](https://leetcard.jacoblin.cool/priyanshuk6395?animation=false)](https://leetcard.jacoblin.cool/priyanshuk6395?animation=false)

#### `hide` (default: `""`)

Hide elements on the card, it is a comma-separated list of element ids.

```md
![](https://leetcard.jacoblin.cool/priyanshuk6395?hide=ranking,total-solved-text,easy-solved-count,medium-solved-count,hard-solved-count)
```

[![](https://leetcard.jacoblin.cool/priyanshuk6395?hide=ranking,total-solved-text,easy-solved-count,medium-solved-count,hard-solved-count)](https://leetcard.jacoblin.cool/priyanshuk6395?hide=ranking,total-solved-text,easy-solved-count,medium-solved-count,hard-solved-count)

#### `ext` (default: `""`)

Extension, it is a comma-separated list of extension names.

NOTICE: You can only use one of extended-card extensions (`activity`, `contest`, `heatmap`) at a time now, maybe they can be used together in the future.

> Animation, font, theme, and external stylesheet are all implemented by extensions and enabled by default.

Want to contribute a `nyan-cat` extension? PR is welcome!

```md
![](https://leetcard.jacoblin.cool/priyanshuk6395?ext=activity)
```

[![](https://leetcard.jacoblin.cool/priyanshuk6395?ext=activity)](https://leetcard.jacoblin.cool/priyanshuk6395?ext=activity)

```md
![](https://leetcard.jacoblin.cool/lapor?ext=contest)
```

[![](https://leetcard.jacoblin.cool/lapor?ext=contest)](https://leetcard.jacoblin.cool/lapor?ext=contest)

```md
![](https://leetcard.jacoblin.cool/lapor?ext=heatmap)
```

[![](https://leetcard.jacoblin.cool/lapor?ext=heatmap)](https://leetcard.jacoblin.cool/lapor?ext=heatmap)

#### `cache` (default: `60`)

Cache time in seconds.

Note: it will not be a good idea to set it to a long time because GitHub will fetch and cache the card.

```md
![](https://leetcard.jacoblin.cool/priyanshuk6395?cache=0)
```

> You can make `DELETE` request to `/:site/:username` to delete the cache.

#### `sheets` (default: `""`)

External stylesheet, it is a comma-separated list of urls.

You can upload your custom CSS to gist and use the url.

```md
![](https://leetcard.jacoblin.cool/priyanshuk6395?sheets=url1,url2)
```

They will be injected in the order you specified.

#### Legacy Options

Still work, but deprecated.

| Key             | Description                  | Default Value |
| --------------- | ---------------------------- | ------------- |
| `border_radius` | Same as `radius`             | `4`           |
| `show_rank`     | Display/Hide Rank: `Boolean` | `true`        |
| `extension`     | Same as `ext`                | `""`          |

### Themes

Now we have 6 themes. If you have any great idea, please feel free to open a PR!

#### Light

```md
![Leetcode Stats](https://leetcard.jacoblin.cool/priyanshuk6395?theme=light)
```

[![Leetcode Stats](https://leetcard.jacoblin.cool/priyanshuk6395?theme=light)](https://leetcard.jacoblin.cool/priyanshuk6395?theme=light)

#### Dark

```md
![Leetcode Stats](https://leetcard.jacoblin.cool/priyanshuk6395?theme=dark)
```

[![Leetcode Stats](https://leetcard.jacoblin.cool/priyanshuk6395?theme=dark)](https://leetcard.jacoblin.cool/priyanshuk6395?theme=dark)

#### Nord

```md
![Leetcode Stats](https://leetcard.jacoblin.cool/priyanshuk6395?theme=nord)
```

[![Leetcode Stats](https://leetcard.jacoblin.cool/priyanshuk6395?theme=nord)](https://leetcard.jacoblin.cool/priyanshuk6395?theme=nord)

#### Forest

```md
![Leetcode Stats](https://leetcard.jacoblin.cool/priyanshuk6395?theme=forest)
```

[![Leetcode Stats](https://leetcard.jacoblin.cool/priyanshuk6395?theme=forest)](https://leetcard.jacoblin.cool/priyanshuk6395?theme=forest)

#### WTF

```md
![Leetcode Stats](https://leetcard.jacoblin.cool/priyanshuk6395?theme=wtf)
```

[![Leetcode Stats](https://leetcard.jacoblin.cool/priyanshuk6395?theme=wtf)](https://leetcard.jacoblin.cool/priyanshuk6395?theme=wtf)

#### Unicorn

```md
![Leetcode Stats](https://leetcard.jacoblin.cool/priyanshuk6395?theme=unicorn)
```

[![Leetcode Stats](https://leetcard.jacoblin.cool/priyanshuk6395?theme=unicorn)](https://leetcard.jacoblin.cool/priyanshuk6395?theme=unicorn)

#### Transparent

```md
![Leetcode Stats](https://leetcard.jacoblin.cool/priyanshuk6395?theme=transparent)
```

[![Leetcode Stats](https://leetcard.jacoblin.cool/priyanshuk6395?theme=transparent)](https://leetcard.jacoblin.cool/priyanshuk6395?theme=transparent)

### Fonts

You can now use almost all fonts on [Google Fonts](https://fonts.google.com/).

Some examples:

#### Milonga

```md
![Leetcode Stats](https://leetcard.jacoblin.cool/priyanshuk6395?font=milonga)
```

[![Leetcode Stats](https://leetcard.jacoblin.cool/priyanshuk6395?font=milonga)](https://leetcard.jacoblin.cool/priyanshuk6395?font=milonga)

#### Patrick Hand

```md
![Leetcode Stats](https://leetcard.jacoblin.cool/priyanshuk6395?font=patrick_hand)
```

[![Leetcode Stats](https://leetcard.jacoblin.cool/priyanshuk6395?font=patrick_hand)](https://leetcard.jacoblin.cool/priyanshuk6395?font=patrick_hand)

#### Ruthie

```md
![Leetcode Stats](https://leetcard.jacoblin.cool/priyanshuk6395?font=ruthie)
```

[![Leetcode Stats](https://leetcard.jacoblin.cool/priyanshuk6395?font=ruthie)](https://leetcard.jacoblin.cool/priyanshuk6395?font=ruthie)

### Extensions

Extension, it is a comma-separated list of extension names.

NOTICE: You can only use one of extended-card extensions (`activity`, `contest`, `heatmap`) at a time now, maybe they can be used together in the future.

> Animation, font, theme, and external stylesheet are all implemented by extensions and enabled by default.

Want to contribute a `nyan-cat` extension? PR is welcome!

#### `activity`

Show your recent submissions.

```md
![Leetcode Stats](https://leetcard.jacoblin.cool/priyanshuk6395?ext=activity)
```

[![Leetcode Stats](https://leetcard.jacoblin.cool/priyanshuk6395?ext=activity)](https://leetcard.jacoblin.cool/priyanshuk6395?ext=activity)

#### `contest`

Show your contest rating history.

```md
![Leetcode Stats](https://leetcard.jacoblin.cool/lapor?ext=contest)
```

[![Leetcode Stats](https://leetcard.jacoblin.cool/lapor?ext=contest)](https://leetcard.jacoblin.cool/lapor?ext=contest)

#### `heatmap`

Show heatmap in the past 52 weeks.

```md
![Leetcode Stats](https://leetcard.jacoblin.cool/lapor?ext=heatmap)
```

[![Leetcode Stats](https://leetcard.jacoblin.cool/lapor?ext=heatmap)](https://leetcard.jacoblin.cool/lapor?ext=heatmap)
