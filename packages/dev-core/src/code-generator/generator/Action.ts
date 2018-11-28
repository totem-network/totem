import AbstractGenerator from './AbstractGenerator';

class Action extends AbstractGenerator {

    public register() {
        this.registerPartial('actions:imports', 'imports.ts.hbs');
    }

    public unregister() {
        //
    }

    public generateCode() {
        return '';
    }

}

export default Action;
