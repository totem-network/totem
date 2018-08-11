((window) => {

    if (window.totemExtension === undefined) {
        window.totemExtension = {};
    }

    if (window.totemExtension.message === undefined) {
        window.totemExtension.message = {};
    }

    const extensionId = document.documentElement.getAttribute('data-totem-extension-id');

    if (!extensionId) {
        console.error('Totem Browser Extension id not set');
    }

    window.totemExtension.message.send = (target, data) => {
        window.postMessage({
            target,
            data
        }, window.location);
    };

    window.totemExtension.message.addMessageListener = (listener) => {
        window.addEventListener('message', (event) => {
            // TODO: only events with right target
            listener(event);
        });
    };

    /*window.totemExtension.message.removeMessageListener = (listener) => {
        window.removeEventListener('message', listener);
    };*/

    window.postMessage({
        action: 'setupConnection',
        extensionId
    }, window.location);

})(window);