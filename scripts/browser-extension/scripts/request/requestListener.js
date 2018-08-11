let totemTabs = [];

const modifyCrossOriginHeaders = (details) => {
    if (totemTabs.indexOf(details.tabId) == -1) {
        return;
    }

    let responseHeaders = details.responseHeaders;

    if (details.parentFrameId == 0) {
        responseHeaders = responseHeaders.filter((header) => {
            return (header.name.toLowerCase() !== 'x-frame-options');
        });
    }
    
    // === does not work
    if (details.frameId == 0) {
        responseHeaders = responseHeaders.filter((header) => {
            return (header.name.toLowerCase() !== 'access-control-allow-origin');
        });
        responseHeaders.push({
            name: 'Access-Control-Allow-Origin',
            value: '*'
        });
    }

    return {
        responseHeaders
    };
};

// TODO: add handler to start loaded urls not equal to the documentUrl in a frame in the totem browser

export const initRequestListeners = () => {
    browser.webRequest.onHeadersReceived.addListener(
        modifyCrossOriginHeaders,
        {
            urls: ['<all_urls>']
        },
        ['blocking', 'responseHeaders']
    );
};

export const addTotemTab = (tabId) => {
    totemTabs.push(tabId);
};

export const removeTotemTab = (tabId) => {
    totemTabs = totemTabs.filter((tab) => {
        return (tab != tabId);
    });
};
