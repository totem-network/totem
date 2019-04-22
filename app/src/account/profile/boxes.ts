// import { openBox } from '3box';

// TODO: https://github.com/ipfs/js-datastore-level is using leveldown instead of level-js
// shimming does not work

class Boxes {

    protected boxes: any;

    protected box: any;

    constructor() {
        this.boxes = {};
    }

    public async openBox(address: string, provider: any) {
        if (!this.box) {
            const boxImport = await import(/* webpackChunkName: '3box' */ '3box/dist/3box.min.js');

            this.box = boxImport.default;
        }

        if (!this.boxes[address]) {
            this.boxes[address] = await this.box.openBox(address, provider);
        }

        return this.boxes[address];
    }

}

export default new Boxes();
