import { expect } from 'chai';

const dummy = {
    a: 5
};
describe('Dummy', function() {
    it('should be ok', function() {
        expect(dummy).to.be.ok;
    });
});