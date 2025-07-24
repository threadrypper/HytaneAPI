import { DataType, Instruction } from '@structures/Instruction';
import { CallNode, LiteralNode } from '@core/Nodes';
import type { Transpiler } from '@core/Transpiler';
import { makePattern } from '@utils/makePattern';
import type { Token } from 'akore';

export default class Log extends Instruction {
    patterns = makePattern('$log', true);
    description = 'Logs content into the console.';
    fields = [
        {
            name: 'Content',
            description: 'The content to be logged.',
            type: DataType.Unknown,
            optional: false,
            spread: false
        }
    ];
    output = DataType.Unknown;
    scoped = false;
    resolve(token: Token<Transpiler>) {
        return new CallNode({
            callee: new LiteralNode('console.log'),
            parameters: [
                new LiteralNode(token.inside || '')
            ],
            zero: false
        })
    }
    identifier = 'hytane_log';
    parentId = undefined;
}
