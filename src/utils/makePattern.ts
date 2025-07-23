import type { Patterns } from 'akore';

/**
 * Creates an instruction pattern to match in the input string.
 * @param name - The name of the instruction.
 * @param brackets - Whether this instruction must have brackets.
 * @returns {Patterns} - The built patterns.
 */
export function makePattern(name: string, brackets = false): Patterns {
    if (name.startsWith('$')) name = name.slice(1).toLowerCase();
    return {
        foremost: new RegExp(`\\$${name}`),
        opener: brackets ? /\[/ : undefined,
        closer: brackets ? /\]/ : undefined,
    }
}
