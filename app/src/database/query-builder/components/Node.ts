import AbstractComponent from './AbstractComponent';

export default class Node extends AbstractComponent {

    protected hash: string | undefined;

    constructor(hash?: string) {
        super();
        this.hash = hash;
    }

    public execute(): any {
        //
    }

}
