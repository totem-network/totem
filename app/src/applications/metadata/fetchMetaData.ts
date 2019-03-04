import {
    parseIcon as parseIconFromDocument,
    parseThemeColor as parseThemeColorFromDocument,
    parseTitle as parseTitleFromDocument,
} from './parser/document';
import {
    parseIcon as parseIconFromManifest,
    parseThemeColor as parseThemeColorFromManifest,
    parseTitle as parseTitleFromManifest,
} from './parser/manifest';

export const fetchManifest = async (manifestUrl: string) => {
    const response = await fetch(manifestUrl, {
        mode: 'no-cors',
    });

    if (!response.ok) {
        return undefined;
    }

    return response.text();
};

const fetchManifestFromDocument = async (url: string, doc: Document) => {
    const manifestElement = doc.querySelector('link[rel="manifest"]');

    url = url.replace(/\/$/, '');

    let manifestUrl = url + '/manifest.json';

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

const fetchMetaData = async (url: string, manifestUrl?: string) => {
    let manifest;

    if (manifestUrl) {
        manifest = await fetchManifest(manifestUrl);

        if (manifest) {
            return {
                icon: parseIconFromManifest(manifest, url),
                themeColor: parseThemeColorFromManifest(manifest),
                title: parseTitleFromManifest(manifest),
            };
        }
    }

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

    manifest = await fetchManifestFromDocument(url, doc);

    if (manifest) {
        return {
            icon: parseIconFromManifest(manifest, url),
            themeColor: parseThemeColorFromManifest(manifest),
            title: parseTitleFromManifest(manifest),
        };
    }

    return {
        icon: parseIconFromDocument(doc, url),
        themeColor: parseThemeColorFromDocument(doc),
        title: parseTitleFromDocument(doc),
    };
};

export default fetchMetaData;
