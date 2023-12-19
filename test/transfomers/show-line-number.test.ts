import { expect, it } from 'vitest'
import {  createTransformerLineNumber, getHighlighter } from '../../src'

async function testTransformerLineNumber(snippet: string) {


	const highlighter = await getHighlighter({
		theme: 'nord',
		transformers: [
			createTransformerLineNumber(),
		],
	})

	expect(highlighter.codeToHtml(snippet, { lang: 'javascript' })).toMatchSnapshot()
}

it('generates show lines on the same line as the tag', async() => {
	const snippet = `
console.log('owo'); // [!code hl]
console.log('owo'); // [!code hl]
	`

	await testTransformerLineNumber(snippet)
})
