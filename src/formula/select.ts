import { Formula } from '@barajs/formula'
/**
 * Simply select changing data.
 * @param selector
 */
export const select = (formula: Formula) => async (
  state: any,
  ...rest: any[]
) => {
  return await Promise.resolve(formula(state, ...rest))
}
