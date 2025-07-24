import { DataType } from '@structures/Instruction';
import { TimeParser } from '@core/TimeParser';

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
        case DataType.Boolean:
            result = String(value === 'true');
            break;
        case DataType.Date:
            result = new Date(value).toDateString()
            break;
        case DataType.JSON:
            result = JSON.stringify(JSON.parse(value));
            break;
        case DataType.Number:
            result = value.replace(/[^0-9_.]+/g, '');
            break;
        case DataType.Time:
            result = /[a-zA-Z]/.test(value) ? TimeParser.parseToMS(value).toString() : value;
            break;
        case DataType.Color:
        case DataType.Unknown:
        case DataType.String:
            result = value;
            break;
    }

    return result;
}
