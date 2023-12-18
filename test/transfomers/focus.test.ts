import { expect, it } from 'vitest'
import { getHighlighter, createTransformerFocus, ITransformerFocusOptions } from '../../src'

async function testTransformerFocus(snippet: string, options: ITransformerFocusOptions = {}) {
	const highlighter = await getHighlighter({
		theme: 'nord',
		transformers: [
			createTransformerFocus(options),
		],
	})

	expect(highlighter.codeToHtml(snippet, { lang: 'javascript' })).toMatchSnapshot()
}

it('generates focused lines on the same line as the tag', async() => {
	const snippet = `
		function() {
			console.log('owo') // [!code focus]
		}
	`

	await testTransformerFocus(snippet)
})

