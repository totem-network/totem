module.exports = () => {

    let backgroundConnection = null;

    window.addEventListener('message', (event) => {
        if (
            event.source === window &&
            event.data &&
            event.data.action === 'setupConnection' &&
            event.data.extensionId === browser.runtime.id
        ) {
            backgroundConnection = browser.runtime.connect();

            backgroundConnection.onMessage.addListener((event) => {
                // TODO
                event.source.postMessage();
            });
        }
    });

};