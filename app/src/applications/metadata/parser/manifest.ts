import internApplications from '../internApplications';

export const parseTitle = (manifest: string): string => {
    const manifestObject = JSON.parse(manifest);

    if (manifestObject && manifestObject.name && manifestObject.name !== '') {
        return manifestObject.name;
    }

    return '';
};

export const parseIcon = (manifest: string, url?: string): string => {
    const manifestObject = JSON.parse(manifest);

    if (!url || internApplications.indexOf(url) !== -1) {
        url = '';
    }

    if (manifestObject && Array.isArray(manifestObject.icons)) {
        // TODO: find smallest icon that fits (with reduce instead of find)
        const appIcon = manifestObject.icons.find((icon: any) => {
            return (icon.sizes === '192x192');
        });

        if (appIcon && appIcon.src) {
            if (appIcon.src.startsWith('http')) {
                return appIcon.src;
            } else if (appIcon.src.startsWith('/')) {
                if (url.endsWith('/')) {
                    return url.slice(0, -1) + appIcon.src;
                }
                return url + appIcon.src;
            } else {
                return url + '/' + appIcon.src;
            }
        }
    }

    return '/images/apps/default_icon.png';
};

export const parseThemeColor = (manifest: string): string => {
    const manifestObject = JSON.parse(manifest);

    if (manifestObject && manifestObject.theme_color) {
        return manifestObject.theme_color;
    }

    return '#e5e5ea';
};
