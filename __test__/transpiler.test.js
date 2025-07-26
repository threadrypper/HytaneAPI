const ToLowerCase = require('../dist/instructions/toLowerCase').default;
const { createAsyncCode } = require('../dist/utils/createAsyncCode');
const { Transpiler } = require('../dist/classes/core/Transpiler');
const { Runtime } = require('../dist/classes/structures/Runtime');
const Return = require('../dist/instructions/return').default;
const Log = require('../dist/instructions/log').default;
const Let = require('../dist/instructions/let').default;
const Get = require('../dist/instructions/get').default;
const { run } = require('../dist/utils/run');

const runtime = new Runtime();
const transpiler = new Transpiler();
const $log = new Log(transpiler);
const $toLowerCase = new ToLowerCase(transpiler);
const $let = new Let(transpiler);
const $get = new Get(transpiler);
const $return = new Return(transpiler);

transpiler.declare($log, $toLowerCase, $let, $get, $return);

const inputs = [
    '$let[message;Hello world!]\n$log[Message is: $get[message] by Cyberghxst.]\n$return\n$log[uwu]'
    // '$return[false]'
];

for (const input of inputs) {
    const result = transpiler.transpile(input, false);
    const final = createAsyncCode(result);
    run(final, runtime);
}
