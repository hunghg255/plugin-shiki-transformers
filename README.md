<p align="center">
<a href="https://www.npmjs.com/package/plugin-shiki-transformers" target="_blank" rel="noopener noreferrer">
<img src="https://api.iconify.design/tabler:transform.svg?color=%23cda7fb" alt="logo" width='100'/></a>
</p>

<p align="center">
  A library to transform code blocks in markdown files using <a href="https://github.com/shikijs/shiki">Shikijs</a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/plugin-shiki-transformers" target="_blank" rel="noopener noreferrer"><img src="https://badge.fury.io/js/csvs-parsers.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/package/plugin-shiki-transformers" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/npm/dt/csvs-parsers.svg?logo=npm" alt="NPM Downloads" /></a>
  <a href="https://bundlephobia.com/result?p=plugin-shiki-transformers" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/bundlephobia/minzip/plugin-shiki-transformers" alt="Minizip" /></a>
  <a href="https://github.com/hunghg255/plugin-shiki-transformers/graphs/contributors" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/all_contributors-1-orange.svg" alt="Contributors" /></a>
  <a href="https://github.com/hunghg255/plugin-shiki-transformers/blob/main/LICENSE" target="_blank" rel="noopener noreferrer"><img src="https://badgen.net/github/license/hunghg255/plugin-shiki-transformers" alt="License" /></a>
</p>

## Fork
- [shikiji](https://github.com/antfu/shikiji)
- [shiki-processor](https://github.com/innocenzi/shiki-processor)

&nbsp;

## Usage

`plugin-shiki-transformers` exports a custom `getHighlighter` that provides the same API as the one exported from `shiki`, except it adds a new `transformers` option.

```css
import 'plugin-shiki-transformers/shiki.css'

```

```ts
import { getHighlighter, createTransformerFocus } from 'plugin-shiki-transformers'

const snippet = /** ... */
const highlighter = await getHighlighter({
  transformers: [
    createTransformerFocus(),
  ],
})

highlighter.codeToHtml(snippet, { lang: 'javascript' })
```

Alternatively, for more flexibility, it is possible to use the `process` and `postProcess` functions directly.

```ts
import { getHighlighter } from 'shiki'
import { transformer, postTransfomer } from 'plugin-shiki-transformers'

const theme = 'material-theme-palenight'
const lang = 'javascript'
const snippet = /** ... */
const transformers = [
  createTransformerFocus(),
]

const highlighter = await getHighlighter({ theme })

const { code, lineOptions } = transformer(transformers, snippet, lang)
const highlighted = highlighter.codeToHtml(code, {
	lang,
	theme,
	lineOptions,
})

return postTransfomer(transformers, highlighted, lang)
```

&nbsp;

## Built-in transformers

There is currently three transformers: `focus`, `diff` , `highlight` and `error-level`. Each one of them adds the possibility of adding a `// [!code <tag>]` annotation to a line in a code snipppet.

When this annotation is found, it is removed and a class corresponding to the processor is added to the line. The complete code block is also added a class.

```ts
// Input
function() {
	console.log('hewwo') // [!code --]
	console.log('hello') // [!code ++]
}
```
```html
<!-- Output (stripped of `style` attributes for clarity) -->
<pre class="shiki has-diff"> <!-- Notice `has-diff` -->
	<code>
		<span class="line"></span>
		<span class="line"><span>function</span><span>()</span><span></span><span>{</span></span>
		<span class="line diff remove">  <!-- Notice `diff` and `remove` -->
			<span></span><span>console</span><span>.</span><span>log</span><span>(</span><span>&#39;</span><span>hewwo</span><span>&#39;</span><span>) </span>
		</span>
		<span class="line diff add">  <!-- Notice `diff` and `add` -->
			<span></span><span>console</span><span>.</span><span>log</span><span>(</span><span>&#39;</span><span>hello</span><span>&#39;</span><span>) </span>
		</span>
		<span class="line"><span></span><span>}</span></span>
		<span class="line"><span></span></span>
	</code>
</pre>
```
