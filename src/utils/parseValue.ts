import { DataType } from '@structures/Instruction';

/**
 * Parses a value following the given type.
 * @param value - The value to parse.
 * @param type - The type to parse to.
 * @returns {string} - The parsed value.
 */
export function parseValue(value: string, type: DataType): string {
    let result = '';

    switch (type) {
        case DataType.BigInt:
            result = `${value.replace(/[^0-9]+/g, '')}n`;
            break;
    }

    return result;
}
