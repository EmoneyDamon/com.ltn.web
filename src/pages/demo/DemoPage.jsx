import React from 'react';
// import PropTypes from 'prop-types';

// 样式导入
import './DemoPage.scss';

class DemoPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data:''
    };
  }

  render() {
    return (
      <div className="home-page">
        This is the DemoPage.
      </div>
    );
  }
}

export default DemoPage;
