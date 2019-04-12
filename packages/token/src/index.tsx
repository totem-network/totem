import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js');
    });
}

const render = (AppComponent: any) => {
    return ReactDOM.render(
        <AppComponent /> as any,
        document.getElementById('app'),
    );
};

render(App);
