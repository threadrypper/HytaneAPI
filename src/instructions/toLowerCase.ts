import { CallNode, LiteralNode, SequenceNode } from '@core/Nodes';
import { DataType, Instruction } from '@structures/Instruction';
import type { Transpiler } from '@core/Transpiler';
import { makePattern } from '@utils/makePattern';
import type { Token } from 'akore';

export default class ToLowerCase extends Instruction {
    patterns = makePattern(/\$toLowerCase/, true);
    description = 'Converts a text to lowercase.';
    fields = [
        {
            name: 'Text',
            description: 'The text to convert.',
            type: DataType.String,
            optional: false,
            spread: false
        }
    ];
    output = DataType.String;
    scoped = false;
    resolve(token: Token<Transpiler>) {
        return new SequenceNode({
            elements: [
                this.transpiler.string(token.inside ?? ''),
                new CallNode({
                    callee: new LiteralNode('toLowerCase'),
                    parameters: new SequenceNode({
                        elements: [],
                        operator: ''
                    }),
                    zero: false
                })
            ],
            operator: '.'
        })
    }
    identifier = 'hytane_tolowercase';
    parentId = undefined;
}
