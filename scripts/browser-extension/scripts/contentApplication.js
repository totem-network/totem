import injectScript from './utils/injectScript';
//import setupMessaging from './message/application';

(() => {

    if (window.totemExtensionInjected) {
        return;
    }

    window.totemExtensionInjected = true;

    //setupMessaging();
    
    //injectScript('./scripts/web-accessible/message.js');

})();