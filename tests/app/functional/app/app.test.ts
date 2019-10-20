/*import { expect } from 'chai';
import 'mocha';
import {
    Browser,
    launch,
    Page,
} from 'puppeteer';

describe('App', () => {
    describe('app', () => {
        let browser: Browser;
        let page: Page;

        before(async () => {
            browser = await launch({
                headless: false,
                timeout: 10000,
            });
        });

        beforeEach(async () => {
            page = await browser.newPage();
        });

        after(async () => {
            browser.close();
        });

        it('should load the index page', async () => {
            // console.log(await browser.version());
            await page.goto('https://localhost:8080/');
        });
    });
});*/
