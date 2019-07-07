import React from 'react';
import ReactDOM from 'react-dom';

import {makeMainRoutes} from './routes';

import {Provider} from 'react-redux'
import configureStore from './store';
const routes = makeMainRoutes();

ReactDOM.render(
    <Provider store={configureStore()}>
        {routes}
    </Provider>,
    document.getElementById('root'));
