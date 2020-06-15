import { VINYAI_URL } from './urls';

let messageSource: Window | MessagePort | ServiceWorker | null = null;

export const sendMessage = (message: any, target?: Window | MessagePort | ServiceWorker) => {
    if (target) {
        (target.postMessage as any)(message, VINYAI_URL);
    }

    if (messageSource) {
        (messageSource.postMessage as any)(message, VINYAI_URL);
    }
};

export const setMessageSource = (newMessageSource: Window | MessagePort | ServiceWorker) => {
    messageSource = newMessageSource;
};
