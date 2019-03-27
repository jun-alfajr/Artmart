import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css'
import {BrowserRouter as Router} from 'react-router-dom';
import {ProductProvider} from './context';


ReactDOM.render(
    <ProductProvider>
        <Router>
            <App/>
        </Router>
    </ProductProvider>, document.getElementById('root'));
    
    serviceWorker.unregister();
