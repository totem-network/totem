
export const SECURE_URL = (process.env.NODE === 'production') ? 'https://secure.vinyai.app' : 'https://localhost:8081';

export const UPDATE_URL = (process.env.NODE === 'production') ?
    'https://secure.vinyai.app/update.html' : 'https://localhost:8081';

export const VINYAI_URL = (process.env.NODE === 'production') ? 'https://vinyai.app' : 'https://localhost:8080';
