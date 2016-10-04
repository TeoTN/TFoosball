import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { fetchUsers } from '../api/connectors';

chai.use(chaiAsPromised);

describe('Users API', function() {
    it('should fetch users', function() {
        const fetch = fetchUsers();
        expect(fetch).to.be.a('promise');
        expect(fetch).to.eventually.have.length.above(10);
    });
});