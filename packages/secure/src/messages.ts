import { TOTEM_URL } from './urls';

let messageSource: Window | MessagePort | ServiceWorker | null = null;

export const sendMessage = (message: any, target?: Window | MessagePort | ServiceWorker) => {
    if (target) {
        (target.postMessage as any)(message, TOTEM_URL);
    }

    if (messageSource) {
        (messageSource.postMessage as any)(message, TOTEM_URL);
    }
};

export const setMessageSource = (newMessageSource: Window | MessagePort | ServiceWorker) => {
    messageSource = newMessageSource;
};
