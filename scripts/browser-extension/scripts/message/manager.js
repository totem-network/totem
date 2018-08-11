// TODO: all totem, application and native connections in variable + forwarding

// target example: 'totem:tabId', 'application:instanceHash', 'native:instanceHash'

class MessageManager {

    totem = {};

    application = {};

    native = {};

    connectListeners = [];

    disconnectListeners = [];

    constructor() {
        this.addConnection = this.addConnection.bind(this);
        this.removeConnection = this.removeConnection.bind(this);

        browser.runtime.onConnect.addListener(this.addConnection);
    }

    addConnection(port) {
        if (port.sender.url == TOTEM_URL + '/') {
            this.totem[port.sender.tab.id] = port;
        }

        for (let listener of this.connectListeners) {
            listener(port);
        }

        port.onDisconnect.addListener(this.removeConnection);
    }

    onConnect(listener) {
        this.connectListeners.push(listener);
    }

    removeConnection(port) {
        if (port.sender.url == TOTEM_URL + '/') {
            this.totem[port.sender.tab.id] = undefined;
        }

        for (let listener of this.disconnectListeners) {
            listener(port);
        }
    }

    onDisconnect(listener) {
        this.disconnectListeners.push(listener);
    }

    getTargetConnection(target) {
        const parts = target.split(':');

        switch (parts[0]) {
            case 'totem':
                return this.totem[parts[1]];
            case 'application':
                return this.application[parts[1]];
            case 'native':
                return this.native[parts[1]];
        }

        return null;
    }

}

module.exports = new MessageManager();