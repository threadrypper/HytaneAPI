import { BaseNode, CallNode, LiteralNode, NodeType, ProgramNode, SequenceNode } from '@core/Nodes';
import { BaseTranspiler, type Registry, Schema } from 'akore';
import { minify } from 'uglify-js';

/**
 * The HytaneAPI code transpiler.
 */
export class Transpiler extends BaseTranspiler {
    declare registry: Registry<NodeType>;
    constructor() {
        super({
            schemas: {
                [NodeType.Call]: new Schema(NodeType.Call, {
                    callee: BaseNode,
                    parameters: SequenceNode,
                    zero: 'boolean'
                }),
                [NodeType.Literal]: new Schema(NodeType.Literal, 'string'),
                [NodeType.Program]: new Schema(NodeType.Program, [BaseNode]),
				[NodeType.Sequence]: new Schema(NodeType.Sequence, {
					elements: [BaseNode],
					operator: 'string'
				})
            }
        })
    }

    /**
	 * Transpiles a code into a Number.
	 * @param code - The input code to transpile.
	 * @returns A CallNode representing the transpiled number code.
	 */
	number(code: string) {
		const tokens = [...this.lexer.tokenize(code)];

		if (tokens.length === 0) return new LiteralNode(Number.isNaN(code) ? "NaN" : code);

		const parts: BaseNode[] = [];
		for (let i = 0; i < tokens.length; i++) {
			const token = tokens[i];
			const before = code.slice(0, token.match.index);
			if (before) parts.push(new LiteralNode(Number.isNaN(before) ? "NaN" : before));
			parts.push(token.competence.resolve(token) as BaseNode);
			if (i === tokens.length - 1) {
				const after = code.slice(token.match.index! + token.total.length);
				if (after) parts.push(new LiteralNode(Number.isNaN(after) ? "NaN" : after));
			}
		}

		return new CallNode({
			callee: new LiteralNode("Number"),
			parameters: new SequenceNode({
				elements: parts,
				operator: ' + '
			}),
			zero: false,
		});
	}

    /**
	 * Transpiles a code into a sequence.
	 * @param code - The input code to transpile.
	 * @param operator - The operator to use between sequence elements.
	 * @returns A sequence representing the transpiled code.
	 */
	sequence(code: string, operator = ", ") {
		return new LiteralNode([...this.lexer.tokenize(code)].join(operator));
	}

    /**
	 * Transpiles a code into a String.
	 * @param code - The input code to transpile.
	 * @returns A CallNode representing the transpiled string code.
	 */
    string(code: string) {
        const tokens = [...this.lexer.tokenize(code)];

		if (tokens.length === 0) return new LiteralNode(`"${code}"`);

		const parts: BaseNode[] = [];
		for (let i = 0; i < tokens.length; i++) {
			const token = tokens[i];
			const before = code.slice(0, token.match.index);
			if (before) parts.push(new LiteralNode(`"${before}"`));
			parts.push(token.competence.resolve(token) as BaseNode);
			if (i === tokens.length - 1) {
				const after = code.slice(token.match.index! + token.total.length);
				if (after) parts.push(new LiteralNode(`"${after}"`));
			}
		}

		return new CallNode({
			callee: new LiteralNode("String"),
			parameters: new SequenceNode({
				elements: parts,
				operator: ' + '
			}),
			zero: false,
		});
    }

    /**
     * Transpiles HytaneAPI code into JavaScript.
     * @param source - Input string to be transpiled.
     * @returns {string} - The transpiled code.
     */
    transpile(source: string, minifyOutput = false): string {
        const program = new ProgramNode([]);
        const tokens = this.lexer.tokenize(source, 'gim');
        const nodes = this.synthesize(tokens) as Generator<BaseNode>;

        for (const node of nodes) {
            this.registry.validate(node);
            program.push(node);
        }

        const output = this.registry.resolve(program);
		if (minifyOutput) {
			const minified = minify(output);
			return minified.code;
		}

		return output;
    }
}
