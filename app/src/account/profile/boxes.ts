// import { openBox } from '3box';

// TODO: https://github.com/ipfs/js-datastore-level is using leveldown instead of level-js
// shimming does not work
// remove 3box package from index.html if resolved

const box = require('3box/dist/3box.min.js');

class Boxes {

    protected boxes: any;

    constructor() {
        this.boxes = {};
    }

    public async openBox(address: string, provider: any) {
        if (!this.boxes[address]) {
            this.boxes[address] = await box.openBox(address, provider);
        }

        return this.boxes[address];
    }

}

export default new Boxes();
