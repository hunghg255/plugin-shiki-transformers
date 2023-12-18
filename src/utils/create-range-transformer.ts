import type { TLineOptions, TTransformerHandler, ITransformerOptions, IRangeTransformerOptions } from '../types'

export function createRangeTransformer(classMap: Record<string, string | string[]>, options: IRangeTransformerOptions = {}): TTransformerHandler {
  return ({ code }: ITransformerOptions) => {
    // https://regex101.com/r/mUxvfx/1
    const tagRE = options.tagRegExp ?? /(?:\/\/|\/\*{1,2}) *\[!code ([\w+-]+)(?::(\d+))?] *(?:\*{1,2}\/)?/
    const lineOptions: TLineOptions = []

    const tags = Object.keys(classMap);

    code = code
      .split('\n')
      .map((lineOfCode, lineNumber) => {
        const [match, tag, range] = lineOfCode.match(tagRE) ?? []

        if (!match) {
          return lineOfCode
        }

        if (!tags.includes(tag)) {
          return lineOfCode
        }

        for (const [rangeOffset] of Array.from({ length: Number(range ?? 1) }).entries()) {
          lineOptions.push({
            line: lineNumber + rangeOffset + 1,
            classes: typeof classMap[tag as keyof typeof classMap] === 'string' ? [classMap[tag as keyof typeof classMap]] as string[] : classMap[tag as any] as any,
          })
        }

        return lineOfCode.replace(tagRE, '')
      })
      .join('\n')

    return {
      code,
      lineOptions,
    }
  }
}
