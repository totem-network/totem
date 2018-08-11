import {
    Browser as BrowserInstance,
    launch,
    LaunchOptions,
} from 'puppeteer';
import AbstractPage from './AbstractPage';
import Page from './Page';

// TODO: is a wrapper for Browser and Page usefull? better browser class that accepts pages to test
class Browser {

    protected instance: BrowserInstance | undefined;

    protected options: LaunchOptions = {
        headless: false,
    };

    public async launch(): Promise<BrowserInstance> {
        this.instance = await launch(this.options);
        return this.instance;
    }

    public async newPage(): Promise<Page> {
        if (!this.instance) {
            throw new Error("No browser instance launched");
        }

        const pageInstance = await this.instance.newPage();
        return new Page(pageInstance);
    }

}

// TODO: return configured browser or only class?
export default new Browser();
