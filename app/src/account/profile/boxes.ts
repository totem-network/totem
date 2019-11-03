// const Box = require('3box');

// TODO: https://github.com/ipfs/js-datastore-level is using leveldown instead of level-js
// shimming does not work

class Boxes {

    protected boxes: any;

    protected box: any;

    constructor() {
        this.boxes = {};
    }

    public async openBox(address: string, provider: any) {
        const boxImport = await import(/* webpackChunkName: '3box' */ '3box');

        const Box = boxImport.default;

        if (!this.boxes[address]) {
            this.boxes[address] = await Box.openBox(address, provider);

            await this.boxes[address].syncDone;
        }

        return this.boxes[address];
    }

    public async verifyClaim(claim: any, options: any) {
        const boxImport = await import(/* webpackChunkName: '3box' */ '3box');

        const Box = boxImport.default;

        return Box.idUtils.verifyClaim(claim, options);
    }

}

export default new Boxes();
