import '@babel/polyfill';
import { expect } from 'chai';
import {
    CREATE_EDGE,
    createEdge,
} from 'database/actions/createEdge';
import 'mocha';

describe('Database actions', () => {
    describe('createEdge', () => {
        it('should create an action to create an edge', () => {
            // TODO: add realistic values
            const transactionId = 'someid';
            const from = 'testhash';
            const to = 'testhash';
            const data = 'testdata';
            const storage = 'local';

            const expectedAction = {
                payload: {
                    data,
                    from,
                    storage,
                    to,
                    transactionId,
                },
                type: CREATE_EDGE,
            };

            expect(
                createEdge(transactionId, from, to, data, storage),
            ).to.be.deep.equal(expectedAction);
        });
    });
});
