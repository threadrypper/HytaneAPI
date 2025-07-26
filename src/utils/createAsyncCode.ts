/**
 * Creates an async code to run.
 * @param input - The input to include in the async function.
 * @returns {string}
 */
export const createAsyncCode = (input: string) => `(async () => {\n${input}\n})();`