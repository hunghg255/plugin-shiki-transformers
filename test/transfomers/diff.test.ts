import { expect, it } from 'vitest'
import { getHighlighter, createTransformerDiff, ITransformerDiffOptions } from '../../src'

async function testTransformerDiff(snippet: string, options: ITransformerDiffOptions = {}) {
	const highlighter = await getHighlighter({
		theme: 'nord',
		transformers: [
			createTransformerDiff(options),
		],
	})

	expect(highlighter.codeToHtml(snippet, { lang: 'javascript' })).toMatchSnapshot()
}

it('generates diffed lines on the same line as their tag', async() => {
	const snippet = `
		function() {
			console.log('owo') // [!code --]
			console.log('uwu') // [!code ++]
		}
	`

	await testTransformerDiff(snippet)
})
