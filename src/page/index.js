import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import App from './App';
import './index.scss';

loadableReady(() => {
    const app = document.getElementById("app");

    ReactDOM.hydrate(
        <BrowserRouter>
            <App />
        </BrowserRouter>,
        app,
    );
});
