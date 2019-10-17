import React, { Component } from 'react';
import { Nav, NavItem, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import PropTypes from 'prop-types';
import { AppNavbarBrand, AppSidebarToggler, AppHeaderDropdown, } from '@coreui/react';
import { Link } from 'react-router-dom';
import LogoSvg from '../../assets/img/logo.svg';
import { connect } from "react-redux";
import { userLogout } from '../../redux/actions';
import { bindActionCreators } from "redux";
import { withRouter } from 'react-router-dom';

const propTypes = {
  children: PropTypes.node,
};
const defaultProps = {};

class DefaultHeader extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout() {
    this.props.userLogout();
    this.props.history.push('/');
  }
  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: LogoSvg, height: 30, alt: 'ICC Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="ml-auto" navbar>
          {this.props.data.userLogin ? (
            <React.Fragment >
              <AppHeaderDropdown direction="down">
                <DropdownToggle nav>
                  <div className="mystyle">{this.props.data.userEmail}</div>
                </DropdownToggle>
                <DropdownMenu left="true" >
                  <DropdownItem onClick={this.handleLogout}><i className="fa fa-lock"></i> Logout</DropdownItem>
                </DropdownMenu>
              </AppHeaderDropdown>
              <NavItem className="d-md-down-none">
              </NavItem>
            </React.Fragment>
          ) : (
              <React.Fragment >
                <NavItem className="d-md-down-none" >
                  <Link to="/login" replace className="mystyle">登录</Link>
                </NavItem>
                <NavItem className="d-md-down-none" >
                  <Link to="/register" replace className="mystyle">注册</Link>
                </NavItem>
                <NavItem className="d-md-down-none">
                </NavItem>
              </React.Fragment>
            )}
        </Nav>

      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

function mapStateToProps(state) {
  return {
    data: state
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ userLogout }, dispatch);
}
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultHeader));
