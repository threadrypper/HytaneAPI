const { Transpiler } = require('../dist/classes/core/Transpiler');
const Log = require('../dist/instructions/log').default;

const transpiler = new Transpiler();
const $log = new Log(transpiler);

transpiler.declare($log);

const inputs = [
    '$log[Test 1: uwu]',
    '$console.log[Test 2: owo]',
    '$print[Test 3: waos]'
];

for (const input of inputs) {
    const result = transpiler.transpile(input)
    console.debug(result)
}
