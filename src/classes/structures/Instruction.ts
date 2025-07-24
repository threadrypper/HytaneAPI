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
 * The base structure of an instruction field.
 */
export interface AbstractInstructionField {
    /**
     * The name of the field.
     */
    name: string
    /**
     * A brief description about what this field does.
     */
    description: string
    /**
     * The type of this field.
     */
    type: DataType
    /**
     * Whether is optional.
     */
    optional: boolean
    /**
     * Whether is spread field.
     */
    spread: boolean
}

/**
 * Represents a base instruction structure.
 */
export abstract class Instruction<Scoped extends boolean = boolean> extends BaseCompetence<Transpiler> {
    /**
     * A brief description about what this instruction does.
     */
    abstract description: string
    /**
     * The fields this instruction takes.
     */
    abstract fields?: AbstractInstructionField[]
    /**
     * The output type of the instruction.
     */
    abstract output: DataType
    /**
     * Whether this instruction is scoped.
     */
    abstract scoped: Scoped
    /**
     * The parent identifier of this scoped instruction.
     */
    abstract parentId?: Scoped extends false ? never : string
}
