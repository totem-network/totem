import internApplications from '../internApplications';

export const parseTitle = (appDocument: Document): string => {
    if (appDocument) {
        return appDocument.title;
    }

    return '';
};

export const parseIcon = (appDocument: Document, url?: string): string => {
    return '/images/apps/default_icon.png';
};

export const parseThemeColor = (appDocument: Document): string => {
    return '#e5e5ea';
};
