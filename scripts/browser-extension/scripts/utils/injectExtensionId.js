module.exports = () => {
    
    try {
        document.documentElement.setAttribute(
            'data-totem-extension-id',
            browser.runtime.id
        );
    } catch (error) {
        console.error('Totem Browser Extension could not inject its id', error);
    }

};