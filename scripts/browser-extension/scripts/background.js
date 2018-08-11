import MessageManager from './message/manager';
import { addTotemTab, initRequestListeners, removeTotemTab } from './request/requestListener';

initRequestListeners();

MessageManager.onConnect((port) => {
    if (port.sender && port.sender.tab && port.sender.tab.id) {
        if (port.sender.url == TOTEM_URL + '/') {
            addTotemTab(port.sender.tab.id);
        }
    }
});

MessageManager.onDisconnect((port) => {
    if (port.sender && port.sender.tab && port.sender.tab.id) {
        if (port.sender.url == TOTEM_URL + '/') {
            removeTotemTab(port.sender.tab.id);
        }
    }
});
