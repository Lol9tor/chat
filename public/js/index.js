'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

if (document) {
    ReactDOM.render(
        <Root />,
        document.getElementById('root')
    );
}


