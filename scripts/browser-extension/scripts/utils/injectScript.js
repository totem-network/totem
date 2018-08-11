module.exports = (script) => {

    try {
        const scriptTag = document.createElement('script');
        scriptTag.src = browser.extension.getURL(script);

        const injectNode = document.head || document.documentElement;
        injectNode.insertAdjacentElement('afterbegin', scriptTag);
    } catch (error) {
        console.error('Totem Browser Extension could not inject script', error);
    }

};