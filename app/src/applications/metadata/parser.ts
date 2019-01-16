
export const parseTitle = (manifest?: string, appDocument?: Document): string => {
    if (manifest) {
        const manifestObject = JSON.parse(manifest);

        if (manifestObject && manifestObject.name && manifestObject.name !== '') {
            return manifestObject.name;
        }
    }

    if (appDocument) {
        return appDocument.title;
    }

    return '';
};

export const parseIcon = (manifest?: string, url?: string, appDocument?: Document): string => {
    if (manifest) {
        const manifestObject = JSON.parse(manifest);

        if (manifestObject && Array.isArray(manifestObject.icons)) {
            // TODO: find smallest icon that fits (with reduce instead of find)
            const appIcon = manifestObject.icons.find((icon: any) => {
                return (icon.sizes === '192x192');
            });

            if (appIcon && appIcon.src) {
                if (appIcon.src.startsWith('http')) {
                    return appIcon.src;
                } else if (appIcon.src.startsWith('/')) {
                    return url + appIcon.src;
                } else {
                    return url + '/' + appIcon.src;
                }
            }
        }
    }

    // TODO: try icon from link tags

    return '/images/applications/default_icon.png';
};

export const parseThemeColor = (manifest?: string, appDocument?: Document): string => {
    if (manifest) {
        const manifestObject = JSON.parse(manifest);

        if (manifestObject && manifestObject.theme_color) {
            return manifestObject.theme_color;
        }
    }

    return '#e5e5ea';
};
