/* eslint-disable array-callback-return */
import type { ITransformer } from '../types'
import { addClass } from '../utils';

const classActivePre = 'has-line-number'

export function createTransformerLineNumber(): ITransformer {
  return {
    name: 'plugin-shiki-transformer:line-number',
    preTransformer: ({ code }) => {
      const lineOptions = [] as any[];

      code
        .split('\n')
        .filter((v) => v !== '\t')
        .map((lineOfCode, idx) => {
          const lineNumber = idx + 1;
          lineOptions.push({
            lineOfCode,
            line: lineNumber,
            classes: ['line-number'],
          });
        });

      return {
        code,
        lineOptions
      }
    },
    postTransformer: ({ code }) => {
      return addClass(code, classActivePre, 'pre')
    },
  }
}
