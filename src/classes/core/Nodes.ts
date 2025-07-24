import { Node } from 'akore';

/**
 * Node types in the AST.
 */
export enum NodeType {
    Call = 'call_node',
    Literal = 'literal_node'
}

/**
 * A base node structure in the AST.
 */
abstract class BaseNode<Type extends NodeType = NodeType, Value = unknown> extends Node<Type, Value> {
    /**
     * Creates a new node in the AST.
     * @param type - The type of the node.
     * @param value - The value of the node.
     * @param [semicolon=false] - Whether attach a semicolon to it.
     */
    constructor(type: Type, value: Value, public semicolon = false) {
        super(type, value);
    }
}

/**
 * A literal value in the AST.
 */
export class LiteralNode extends BaseNode<NodeType.Literal, string> {
    /**
     * Creates a literal value in the AST.
     * @param value - The literal value.
     * @param semicolon - Whether attach a semicolon to it.
     */
    constructor(value: string, semicolon?: boolean) {
        super(NodeType.Literal, value, semicolon);
    }

    /**
     * Serializes this node to its string representation.
     * @returns {string}
     */
    override serialize(): string {
        return this.value + (this.semicolon ? ';' : '');
    }
}

export type CallNodeValue = {
    /**
     * The callee of the node.
     */
    callee: BaseNode
    /**
     * The parameters of the node.
     */
    parameters: null | BaseNode[]
    /**
     * Whether use zero call syntax.
     */
    zero: boolean
}

/**
 * A function call in the AST.
 */
export class CallNode extends BaseNode<NodeType.Call, CallNodeValue> {
    /**
     * Creates a function call in the AST.
     * @param value - The value of the call.
     * @param semicolon - Whether attach a semicolon to it.
     */
    constructor(value: CallNodeValue, semicolon?: boolean) {
        super(NodeType.Call, value, semicolon)
    }

    /**
     * The string representation of the function call.
     * @returns {string}
     */
    override serialize(): string {
        const args = this.value.parameters === null ? '' : this.value.parameters.map((node) => node.serialize()).join(', ');
        const callee = this.value.callee.serialize();

        return (this.value.zero ? `(0, ${callee})(${args})` : `${callee}(${args})`) + (this.semicolon ? ';' : '');
    }
}
