import { sendMessage, setMessageSource } from './messages';
import { TOTEM_URL } from './urls';

if (
    window.top === window ||
    window.parent.location.origin !== TOTEM_URL
) {
    // TODO: no update! only in iframe of totem

    // TODO: log every suspicious behavior encrypted and let it decrypt by totem
    // public key for log will be given on key generation -> new encryption key for every new key
}

// TODO: update.html replaces serviceworker if the user clicks on update -> new key replaces old one
// only replace key when update is verified via blockchain

// TODO: log every step in the update and send it to Totem
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
                        // TODO
                    }
                });
            });
        });

        navigator.serviceWorker.addEventListener('controllerchange', () => {
            // TODO
        });
    });
}
