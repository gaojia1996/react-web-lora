import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody } from 'reactstrap';
import classNames from 'classnames';
import { mapToCssModules } from 'reactstrap/lib/utils';

const propTypes = {
  header: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  invert: PropTypes.bool,
};

const defaultProps = {
  color: 'info',
  invert: false,
};

class TableCard extends Component {
  render() {
    const { className, cssModule, header, icon, color, value, children, invert, ...attributes } = this.props;

    // demo purposes only
    const card = { style: '', bgColor: '', icon: icon };

    if (invert) {
      card.style = 'text-white';
      card.bgColor = 'bg-' + color;
    }

    const classes = mapToCssModules(classNames(className, card.style, card.bgColor), cssModule);

    return (
      <Card className={classes} {...attributes}>
        <CardBody>
        {/* <div className="h4 mb-0">{header}</div> */}
          <div className="h1 text-muted mb-2">
          </div>
          <div className="h4 mb-1">{header}</div>
          <small className="text-muted text-uppercase font-weight-bold">{children}</small>
        </CardBody>
      </Card>
    );
  }
}

TableCard.propTypes = propTypes;
TableCard.defaultProps = defaultProps;

export default TableCard;