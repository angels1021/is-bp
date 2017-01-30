import React from 'react';
import { render } from 'react-dom';
import 'style.scss';

const MyApp = () =>(
  <div>
    Hello
  </div>
);

render(<MyApp />, document.getElementById('app'));
