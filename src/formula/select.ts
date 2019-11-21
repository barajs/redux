/**
 * Simply select changing data.
 * @param selector
 */
export const select = (selector: (state: any) => any) => (state: any) => {
  return selector(state)
}
