import { createContext, runInContext } from 'node:vm';
import type { Runtime } from '@structures/Runtime';

/**
 * Runs JavaScript code safely.
 * @param input - The input to run.
 * @param runtime - The runtime context.
 */
export function run<T = string>(input: string, runtime: Runtime): T {
    const context = createContext({
        console,
        runtime
    }, {
        codeGeneration: {
            strings: false
        }
    });

    return runInContext(input, context);
}
