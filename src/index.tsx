import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

// Dynamically set the icon (PNG file)
const favicon = require('./assets/icons/dealership.png');
const link = document.createElement('link');
link.rel = 'icon';
link.href = favicon;
document.head.appendChild(link);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
