import { registerPartial } from 'handlebars';
import IGenerator from './IGenerator';

abstract class AbstractGenerator implements IGenerator {

    constructor() {
        //
    }

    public abstract register(): void;

    public abstract unregister(): void;

    public abstract generateCode(): string;

    protected registerPartial(name: string, template: any) {
        registerPartial(name, template);
    }

}

export default AbstractGenerator;
