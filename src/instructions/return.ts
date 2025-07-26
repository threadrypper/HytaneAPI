import { DataType, Instruction } from '@structures/Instruction';
import { LiteralNode, SequenceNode } from '@core/Nodes';
import type { Transpiler } from '@core/Transpiler';
import { makePattern } from '@utils/makePattern';
import type { Token } from 'akore';

export default class Return extends Instruction {
    patterns = makePattern(/\$return/, true);
    description = 'Returns a value.';
    fields = [
        {
            name: 'Value',
            description: 'The value to return.',
            type: DataType.Unknown,
            optional: true,
            spread: false
        }
    ];
    output = DataType.Unknown;
    scoped = false;
    resolve(token: Token<Transpiler>) {
        if (!token.inside) return new LiteralNode('return', true);

        return new SequenceNode({
            elements: [
                new LiteralNode('return'),
                this.transpiler.string(token.inside)
            ],
            operator: ' '
        }, true);
    }
    identifier = 'hytane_return';
    parentId = undefined;
}
