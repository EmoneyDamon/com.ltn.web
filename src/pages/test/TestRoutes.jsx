import React from 'react';
import {
  Route,
} from 'react-router-dom';

import TestPage from './TestPage';

class TestRoutes extends React.Component {
  render() {
    return (
      <Route path="/test" component={TestPage} />
    );
  }
}

export default TestRoutes;
