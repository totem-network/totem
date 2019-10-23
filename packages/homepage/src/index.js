import { h, render } from 'preact';
import App from './components/App';

document.addEventListener('DOMContentLoaded', event => (
    render(<App />, document.getElementById('app'))
));

if (process.env.NODE !== 'production' && module.hot) {
    module.hot.accept();
}
