import { DataType, Instruction } from '@structures/Instruction';
import { CallNode, LiteralNode, SequenceNode } from '@core/Nodes';
import type { Transpiler } from '@core/Transpiler';
import { makePattern } from '@utils/makePattern';
import type { Token } from 'akore';

export default class Let extends Instruction {
    patterns = makePattern(/\$let/, true);
    description = 'Declares a runtime variable.';
    fields = [
        {
            name: 'Name',
            description: 'The name of the variable.',
            type: DataType.String,
            optional: false,
            spread: false
        },
        {
            name: 'Value',
            description: 'The value of the variable.',
            type: DataType.String,
            optional: false,
            spread: false
        }
    ];
    output = DataType.Unknown;
    scoped = false;
    resolve(token: Token<Transpiler>) {
        if (!token.inside) {
            throw new Error(`${token.match[0]} expects ${this.fields.length} fields but got nothing!`);
        }

        const [name, value] = this.splitByDelimiter(token.inside);

        return new CallNode({
            callee: new LiteralNode('runtime.setVar'),
            parameters: new SequenceNode({
                elements: [
                    this.transpiler.string(name),
                    this.transpiler.string(value)
                ],
                operator: ', '
            }),
            zero: false
        });
    }
    identifier = 'hytane_let';
    parentId = undefined;
}
