import { compile } from 'handlebars';
import IGenerator from './generator/IGenerator';

class CodeGenerator {

    protected fileSystem: any;

    protected destination: any;

    protected config: any;

    protected generators: IGenerator[] = [];

    constructor(config: any) {
        this.config = {
            // TODO: defaults
            ...config,
        };
    }

    public addGenerator(generator: IGenerator) {
        this.generators = [
            generator,
            ...this.generators,
        ];
    }

}

export default CodeGenerator;
