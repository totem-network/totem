import { Transaction } from 'ethereumjs-tx';
import { sendMessage, setMessageSource } from './messages';
import { SECURE_URL, VINYAI_URL, UPDATE_URL } from './urls';
const keythereum = require('keythereum');

let serviceWorkerUpdated = false;

const signTransaction = (params: any, privateKey: Buffer): Buffer => {
    const transaction = new Transaction(params);

    transaction.sign(privateKey);

    return transaction.serialize();
};

const createPrivateKey = () => {
    const params = { keyBytes: 32, ivBytes: 16 };

    return keythereum.create(params).privateKey;
};

const storePrivateKey = (privateKey: Buffer) => {
    if (localStorage.getItem('privateKey')) {
        return false;
    }

    localStorage.setItem('privateKey', privateKey.toString());
};

const readPrivateKey = () => {
    const privateKey = localStorage.getItem('privateKey');

    if (!privateKey) {
        return false;
    }

    return Buffer.from(privateKey);
};

const deletePrivateKey = () => {
    localStorage.removeItem('privateKey');
};

const recieveMessage = (event: MessageEvent) => {
    if (event.origin !== VINYAI_URL) {
        return;
    }

    if (!event.source) {
        return;
    }

    if (event.data.action && event.data.action === 'initializeConnection') {
        if (serviceWorkerUpdated) {
            sendMessage({
                address: '0x', // TODO
                event: 'keyChanged',
            }, event.source);
        }

        sendMessage({
            action: 'initializeConnection',
        }, event.source);

        setMessageSource(event.source);
    }

    if (event.data.action && event.data.action === 'sign') {
        const privateKey = readPrivateKey();

        if (!privateKey) {
            sendMessage({
                action: 'sign',
                error: 'No private key',
            }, event.source);

            return;
        }

        const signedTransaction = signTransaction(event.data.payload, privateKey);

        sendMessage({
            action: 'sign',
            signedTransaction,
        }, event.source);
        return;
    }

    if (event.data.action && event.data.action === 'getAddress') {
        const privateKey = readPrivateKey();

        if (!privateKey) {
            sendMessage({
                action: 'getAddress',
                error: 'No private key',
            }, event.source);

            return;
        }

        const address = keythereum.privateKeyToAddress(privateKey);

        sendMessage({
            action: 'getAddress',
            address,
        }, event.source);
        return;
    }

    if (event.data.action && event.data.action === 'createPrivateKey') {
        storePrivateKey(createPrivateKey());

        sendMessage({
            action: 'createPrivateKey',
            address: '0x', // TODO
        }, event.source);
        return;
    }

    if (event.data.action && event.data.action === 'deletePrivateKey') {
        deletePrivateKey();

        sendMessage({
            action: 'deletePrivateKey',
            result: true,
        }, event.source);
        return;
    }
};

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then((serviceWorker) => {
            serviceWorker.addEventListener('updatefound', (updateFoundEvent: Event) => {
                const newWorker = serviceWorker.installing;

                if (!newWorker) {
                    return;
                }

                newWorker.addEventListener('statechange', (stateChangeEvent: Event) => {
                    if (newWorker.state === 'installing') {
                        deletePrivateKey();
                    }
                });
            });
        });

        navigator.serviceWorker.addEventListener('controllerchange', () => {
            deletePrivateKey();
            storePrivateKey(createPrivateKey());

            serviceWorkerUpdated = true;

            // TODO: send address of new privkey
            sendMessage({
                address: '0x', // TODO
                event: 'keyChanged',
            });
        });
    });
}

window.addEventListener('message', recieveMessage, false);
