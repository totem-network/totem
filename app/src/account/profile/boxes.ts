import { utils } from 'ethers';

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
            // TODO: check for storage quota, if too small box wont open!
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

    public wrapEthersSigner(signer: any) {
        return {
            send: (data: any, callback: any) => {
                if (data.method === 'personal_sign') {
                    signer.signMessage(utils.toUtf8String(data.params[0])).then((result: any) => {
                        callback(null, { result });
                    });
                } else {
                    callback(null, '0x');
                }
            },
        };
    }

}

export default new Boxes();
