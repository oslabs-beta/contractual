import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';

// swap these two to switch from vanilla to RTK
// import store from './state/store';
import { store } from './state/store';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// const Index = () => {
//   return <div>Hello React!</div>;
// };

// render(<Index />, document.getElementById('root'));