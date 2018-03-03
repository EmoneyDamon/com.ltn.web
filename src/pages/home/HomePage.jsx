import React from 'react';
// import PropTypes from 'prop-types';

// 样式导入
import './HomePage.scss';

class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data:''
    };
  }

  render() {
    return (
      <div className="home-page">
        <span>This is the HomePage1.</span>
      </div>
    );
  }
}

export default HomePage;
