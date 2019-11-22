import { Formula } from '@barajs/formula'
/**
 * Simply select changing data.
 * @param selector
 */
export const select = (selector: Formula) => (state: any, ...rest: any[]) => {
  return selector(state, ...rest)
}
