<h2 align="center">plugin-shiki-transformers</h2>

<p align="center">
  <a href="https://github.com/innocenzi/plugin-shiki-transformers/actions?query=workflow%3Aci">
    <img alt="Status" src="https://github.com/innocenzi/plugin-shiki-transformers/actions/workflows/ci.yml/badge.svg">
  </a>
  <span>&nbsp;</span>
  <a href="https://www.npmjs.com/package/plugin-shiki-transformers">
    <img alt="npm" src="https://img.shields.io/npm/v/plugin-shiki-transformers">
  </a>
  <br />
  <br />
  <p align="center">
    Add transformer capabilities to Shiki's highlighter
  </p>
  <pre><div align="center">npm i shiki plugin-shiki-transformers</div></pre>
</p>

&nbsp;

## Fork
- [shikiji](https://github.com/antfu/shikiji)
- [shiki-processor](https://github.com/innocenzi/shiki-processor)

&nbsp;

## Usage

`plugin-shiki-transformers` exports a custom `getHighlighter` that provides the same API as the one exported from `shiki`, except it adds a new `transformers` option.

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
import { process, postProcess } from 'plugin-shiki-transformers'

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
