import {
    graphql,
    GraphQLSchema,
} from 'graphql';
import GraphIndex from './GraphIndex';
const Store = require('orbit-db-store');

// TODO: maybe useless use document store for graph db,
// but not if you can access other db from within the store

class GraphStore extends Store {

    protected schema: GraphQLSchema;

    constructor(ipfs: any, identity: any, address: any, options: any) {
        super(ipfs, identity, address, options);

        this.schema = options.schema;
        // How to do the schema? individual for every user or a standard schema or ??
        // maybe each programm adds to the schema a sub schema,
        // so it has the schema if it is installed or a dependency
    }

    public query() {
        //
    }

}

export default GraphStore;
