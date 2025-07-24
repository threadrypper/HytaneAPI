import { BaseTranspiler } from 'akore';

/**
 * The HytaneAPI code transpiler.
 */
export class Transpiler extends BaseTranspiler {
    /**
     * Transpiles HytaneAPI code into JavaScript.
     * @param source - Input string to be transpiled.
     * @returns {string} - The transpiled code.
     */
    transpile(source: string): string {
        return source;
    }
}
