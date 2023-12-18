import type { IRangeTransformerOptions, ITransformer } from '../types'
import { addClass } from '../utils/add-class'
import { createRangeTransformer } from '../utils/create-range-transformer'

export interface ITransformerErrorLevelOptions extends IRangeTransformerOptions {
  classMap?: Record<string, string | string[]>
  /**
   * Class added to the <pre> element when the current code has diff
   */
  classActivePre?: string
}

export function createTransformerErrorLevel(options: ITransformerErrorLevelOptions = {}): ITransformer {
  const {
    classMap = {
      error: ['highlighted', 'error'],
      warning: ['highlighted', 'warning'],
    },
    classActivePre = 'has-highlight',
  } = options

  return {
    name: 'plugin-shiki-transformer:highlight-error',
    handler: createRangeTransformer(classMap, options),
    postTransformer: ({ code }) => {
      if (!code.includes('highlighted error') && !code.includes('highlighted warning')) {
        return code
      }

      return addClass(code, classActivePre, 'pre')
    },
  }
}
