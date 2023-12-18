import { expect, it } from 'vitest'
import { getHighlighter, createTransformerErrorLevel, ITransformerErrorLevelOptions } from '../../src'

async function testTransformerErrorLevel(snippet: string, options: ITransformerErrorLevelOptions = {}) {
	const highlighter = await getHighlighter({
		theme: 'nord',
		transformers: [
			createTransformerErrorLevel(options),
		],
	})

	expect(highlighter.codeToHtml(snippet, { lang: 'javascript' })).toMatchSnapshot()
}

it('generates highlighted lines on the same line as the tag', async() => {
	const snippet = `
		function() {
			console.log('owo') // [!code error]
			console.log('owo') // [!code warning]
		}
	`

	await testTransformerErrorLevel(snippet)
})
