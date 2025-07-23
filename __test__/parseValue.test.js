const { DataType } = require('../dist/classes/structures/Instruction');
const { parseValue } = require('../dist/utils/parseValue');
const assert = require('node:assert/strict');
const { it, test } = require('node:test');

test('parseValue', () => {
    it('should parse a bigint from weird string', () => {
        const input = '18as877687q@/&&!("/bjj136784'
        const result = parseValue(input, DataType.BigInt)

        assert.equal(result, '18877687136784n')
    })
})