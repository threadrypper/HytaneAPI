import { DataType, Instruction } from '@structures/Instruction';
import { CallNode, LiteralNode, SequenceNode } from '@core/Nodes';
import type { Transpiler } from '@core/Transpiler';
import { makePattern } from '@utils/makePattern';
import type { Token } from 'akore';

export default class Get extends Instruction {
    patterns = makePattern(/\$get/, true);
    description = 'Gets a runtime variable.';
    fields = [
        {
            name: 'Name',
            description: 'The name of the variable.',
            type: DataType.String,
            optional: false,
            spread: false
        }
    ];
    output = DataType.String;
    scoped = false;
    resolve(token: Token<Transpiler>) {
        if (!token.inside) {
            throw new Error(`${token.match[0]} expects ${this.fields.length} fields but got nothing!`);
        }

        const [name] = this.splitByDelimiter(token.inside);

        return new CallNode({
            callee: new LiteralNode('runtime.getVar'),
            parameters: new SequenceNode({
                elements: [
                    this.transpiler.string(name),
                ],
                operator: ', '
            }),
            zero: false
        });
    }
    identifier = 'hytane_get';
    parentId = undefined;
}
