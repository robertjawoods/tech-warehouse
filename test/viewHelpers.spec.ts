import * as assert from 'assert';
import { TreeItem } from 'performant-array-to-tree';
import * as viewHelpers from '../source/views/viewHelpers';

const testHierarchy: TreeItem[] = require('./data/testCategoryNode.json');

describe('ViewHelpers', () => {
    describe('#getMenuSection', () => {
        it('should return html string for category root node', async () => {
            const result = await viewHelpers.getMenuSection(testHierarchy[0]);
            console.log(result);
        });
    });

    describe('#formatCurrency', () => {
        it('should return a formatted currency string', () => {
            const expected = '£15.99';
            const actual = viewHelpers.formatCurrency(15.99, 'GBP');

            assert.strictEqual(actual, expected);
        });
    });
});