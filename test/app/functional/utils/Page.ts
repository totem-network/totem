import {
    Page as PageInstance,
} from 'puppeteer';

class Page {

    protected instance: PageInstance;

    constructor(instance: PageInstance) {
        this.instance = instance;
    }

    public async goto(url: string) {
        this.instance.goto(url);
    }

}

export default Page;
