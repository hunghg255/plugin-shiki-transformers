import { expect, it } from 'vitest'
import { getHighlighter, createTransformerHighlight, ITransformerHighlightOptions, } from '../../src'

async function testTransformerHighlight(snippet: string, options: ITransformerHighlightOptions = {}) {
	const highlighter = await getHighlighter({
		theme: 'nord',
		transformers: [
			createTransformerHighlight(options),
		],
	})

	expect(highlighter.codeToHtml(snippet, { lang: 'javascript' })).toMatchSnapshot()
}

it('generates highlighted lines on the same line as the tag', async() => {
	const snippet = `
console.log('owo') // [!code hl]
	`

	await testTransformerHighlight(snippet)
})
