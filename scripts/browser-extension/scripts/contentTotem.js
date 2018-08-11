import injectExtensionId from './utils/injectExtensionId';
import injectScript from './utils/injectScript';
import setupMessaging from './message/totem';

((window) => {
    
    if (window.totemExtensionInjected) {
        return;
    }

    window.totemExtensionInjected = true;

    injectExtensionId();

    setupMessaging();
    
    injectScript('./scripts/web-accessible/message.js');

})(window);