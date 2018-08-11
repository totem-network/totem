import {
    Edge,
    Filter,
    Node,
} from './components';

export default class Query {

    protected root: Node | undefined;

    constructor(dispatcher: any) {
        // TODO: set dispatcher
    }

    public execute(): any {
        if (!this.root) {
            // TODO: better error message
            throw new Error('No root set');
        }

        return this.root.execute();
    }

    public from(hash: string): Node {
        if (this.root) {
            // TODO: better error message
            throw new Error('Root already defined');
        }

        this.root = new Node(hash);

        return this.root;
    }

}
