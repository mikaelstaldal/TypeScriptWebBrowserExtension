import { hex } from '../../../src/ts/common/utils';

describe('Testing utils', () => {
	test('hex', () => {
		expect(hex(111)).toBe("6f");
	});
});
