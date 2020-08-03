import { Provider } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';

const sendChannelMessage =  require('message-channel-promise');

class VinyaiSecureSigner extends Signer {

    public provider: Provider;

    protected secureIframe: Window;

    constructor(secureIframe: Window, provider: Provider) {
        super();

        this.secureIframe = secureIframe;
        this.provider = provider;
    }

    public async getAddress() {
        return new Promise<string>((resolve, reject) => {
            sendChannelMessage({
                action: 'getAddress',
            }, this.secureIframe, { targetOrigin: '*' }) // TODO: set origin
                .then((data: any) => {
                    if (data.address) {
                        resolve(data.address);
                        return;
                    }

                    reject();
                })
                .error(() => {
                    reject();
                });
        });
    }

    public async sendTransaction(transaction: any) {
        // TODO: sign transaction with key, then send via provider
        return new Promise<any>((resolve, reject) => {
            sendChannelMessage({}, this.secureIframe, { targetOrigin: '*' }) // TODO: set origin
                .then((data: any) => {
                    //
                    resolve();
                })
                .error(() => {
                    reject();
                });
        });
    }

    public async signMessage(message: any) {
        return new Promise<string>((resolve, reject) => {
            sendChannelMessage({
                action: 'sign',
                payload: message,
            }, this.secureIframe, { targetOrigin: '*' }) // TODO: set origin
                .then((data: any) => {
                    if (data.signedTransaction) {
                        resolve(data.signedTransaction);
                        return;
                    }

                    reject();
                })
                .error(() => {
                    reject();
                });
        });
    }

    public async signTransaction(transaction: any): Promise<string> {
        // TODO:
        return '';
    }

    public connect(provider: Provider): Signer {
        return new VinyaiSecureSigner(this.secureIframe, provider);
    }

}

export default VinyaiSecureSigner;
