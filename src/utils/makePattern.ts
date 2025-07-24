import type { Patterns } from 'akore';

/**
 * Creates an instruction pattern to match in the input string.
 * @param name - The name of the instruction.
 * @param brackets - Whether this instruction must have brackets.
 * @returns {Patterns} - The built patterns.
 */
export function makePattern(name: RegExp, brackets = false): Patterns {
    return {
        foremost: name,
        opener: brackets ? /\[/ : undefined,
        closer: brackets ? /\]/ : undefined,
    }
}
