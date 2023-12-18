import type { IRangeTransformerOptions, ITransformer } from '../types'
import { addClass } from '../utils'
import { createRangeTransformer } from '../utils/create-range-transformer'

export interface ITransformerDiffOptions extends IRangeTransformerOptions {
  /**
 * Class for added lines
 */
  classLineAdd?: string
  /**
   * Class for removed lines
   */
  classLineRemove?: string
  /**
   * Class added to the <pre> element when the current code has diff
   */
  classActivePre?: string
}

export function createTransformerDiff(options: ITransformerDiffOptions = {}): ITransformer {
  const {
    classLineAdd = 'diff add',
    classLineRemove = 'diff remove',
    classActivePre = 'has-diff',
  } = options


  return {
    name: 'plugin-shiki-transformer:diff',
    handler: createRangeTransformer({
      '++': classLineAdd,
      '--': classLineRemove,
    }, options),
    postTransformer: ({ code }) => {
      if (!code.includes(classLineAdd) && !code.includes(classLineRemove)) {
        return code
      }

      return addClass(code, classActivePre, 'pre')
    },
  }
}
