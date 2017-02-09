import React from 'react';
import { render } from 'react-dom';
import Root from './routes';
import './style/style.scss';

render(<Root />, document.getElementById('app'));

if (module.hot) {
  module.hot.accept('./routes', () => {
    const NewRoot = require('./routes').default; // eslint-disable-line global-require

    render(
      <NewRoot />,
      document.getElementById('root')
    );
  });
}
