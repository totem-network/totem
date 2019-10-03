
export const SECURE_URL = (process.env.NODE === 'production') ? 'https://secure.totem.app' : 'https://localhost:8081';

export const UPDATE_URL = (process.env.NODE === 'production') ?
    'https://secure.totem.app/update.html' : 'https://localhost:8081';

export const TOTEM_URL = (process.env.NODE === 'production') ? 'https://totem.app' : 'https://localhost:8080';
