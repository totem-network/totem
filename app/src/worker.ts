import { wrap } from 'comlink';

const apiWorker = new Worker('./api/worker/api.worker.ts', { name: 'api', type: 'module' });

// TODO: send message to worker and await next message to fix a bug in ios safari

(self as any).apiWorker = apiWorker;

export const api = wrap(
    apiWorker,
);
