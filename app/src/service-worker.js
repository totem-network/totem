workbox.skipWaiting();
workbox.clientsClaim();

workbox.core.setCacheNameDetails({
    prefix: 'vinyai',
    suffix: 'v1',
    precache: 'precache',
    runtime: 'runtime'
});

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
