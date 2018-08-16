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
    } else {
        // TODO: check if request is allowed when parent frame where equal to the page loaded
        responseHeaders = responseHeaders.filter((header) => {
            return (header.name.toLowerCase() !== 'x-frame-options');
        });
    }

    // needs to be removed outside the plugin
    responseHeaders = responseHeaders.filter((header) => {
        return (header.name.toLowerCase() !== 'x-xss-protection');
    });

    responseHeaders = responseHeaders.map((header) => {
        if (header.name.toLowerCase() !== 'content-security-policy') {
            return header;
        }

        // see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/frame-ancestors
        
        let contentSecurityPolicies = header.value.split(';');

        contentSecurityPolicies = contentSecurityPolicies.map((directive) => {
            const directiveData = directive.trim().split(' ');

            if (directiveData[0] != 'frame-ancestors') {
                return directive;
            }

            return null;
            // TODO: only if frame is allowed in visited page
            directiveData.push(TOTEM_URL);

            return directiveData.join(' ');
        });

        return {
            name: header.name,
            value: contentSecurityPolicies.join(';')
        };
    });
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
