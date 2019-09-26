import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <span><a href="https://www.xisiot.com/" target="_blank" rel="noopener noreferrer">XisIoT</a> &copy; 2019.</span>
        <span className="ml-auto">Powered by <a href="http://www.ic2lab.com/index.html" target="_blank" rel="noopener noreferrer">ICC Lab</a></span>
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
