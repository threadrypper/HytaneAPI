import type { Transpiler } from '@core/Transpiler';
import { BaseCompetence } from 'akore';

/**
 * Various kinds of data types.
 */
export enum DataType {
    /**
     * A value representing a big integer: 1112n.
     */
    BigInt,
    /**
     * Value representing a boolean type: "true" or "false".
     */
    Boolean,
    /**
     * A value representing a color: "19828891" or "0xFFFFFF" or "FFFFFF".
     */
    Color,
    /**
     * A value representing a date.
     * Any value passed as date can be parsed by JavaScript's Date object.
     */
    Date,
    /**
     * Value representing a JSON type: { "key": "value" }
     */
    JSON,
    /**
     * Value representing a numeric type: "12345".
     */
    Number,
    /**
     * Value representing a text chain: "My uncle is 3x cool!"
     */
    String,
    /**
     * Value representing a time in milliseconds or valid parseable duration time.
     */
    Time,
    /**
     * Value representing any type.
     */
    Unknown
}

/**
 * Represents a base instruction structure.
 */
export abstract class Instruction extends BaseCompetence<Transpiler> {}
