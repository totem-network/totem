import {
    parseIcon,
    parseThemeColor,
    parseTitle,
} from './parser';

export const fetchManifest = async (manifestUrl: string) => {
    const response = await fetch(manifestUrl, {
        mode: 'no-cors',
    });

    if (!response.ok) {
        return undefined;
    }

    return response.text();
};

export const parseManifest = (manifest: any) => {
    //
};

const getManifest = async (url: string, doc: Document) => {
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

    return fetchManifest(manifestUrl);
};

const fetchMetaData = async (url: string) => {
    // TODO: first from installed applications
    const response = await fetch(url, {
        mode: 'no-cors',
    });

    if (!response.ok) {
        // TODO: need to throw error? application can work without metadata
        // throw new Error('Metadata could not be fetched: ' + url);
    }

    const html = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const manifest = await getManifest(url, doc);

    const title = parseTitle(manifest, doc);
    const icon = parseIcon(manifest, url, doc);
    const themeColor = parseThemeColor(manifest, doc);

    return {
        icon,
        themeColor,
        title,
    };
};

export default fetchMetaData;
