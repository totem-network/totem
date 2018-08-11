import {
    parseIcon,
    parseThemeColor,
    parseTitle,
} from './parser';

const fetchManifest = async (url: string, doc: Document) => {
    const manifestElement = doc.querySelector('link[rel="manifest"]');

    url = url.replace(/\/$/, '');

    let manifestUrl: string = url + '/manifest.json';

    if (manifestElement && manifestElement.hasAttribute('href')) {
        manifestUrl = manifestElement.getAttribute('href') || manifestUrl;

        if (manifestUrl && !manifestUrl.startsWith('http')) {
            manifestUrl = manifestUrl.startsWith('/') ?
                url + manifestUrl :
                url + '/' + manifestUrl;
        }
    }

    const response = await fetch(manifestUrl, {
        mode: 'cors',
    });

    if (!response.ok) {
        return undefined;
    }

    return response.text();
};

const fetchMetaData = async (url: string) => {
    // TODO: first from installed applications
    const response = await fetch(url, {
        mode: 'cors',
    });

    if (!response.ok) {
        // TODO: need to throw error? application can work without metadata
        // throw new Error('Metadata could not be fetched: ' + url);
    }

    const html = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const manifest = await fetchManifest(url, doc);

    const title = parseTitle(doc, manifest);
    const icon = parseIcon(url, doc, manifest);
    const themeColor = parseThemeColor(doc, manifest);

    return {
        icon,
        themeColor,
        title,
    };
};

export default fetchMetaData;
