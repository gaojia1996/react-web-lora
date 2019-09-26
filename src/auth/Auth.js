import { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

class Auth extends Component {
  constructor(props) {
    super(props);
    const user = this.props.data.userLogin;
    if (!user) {
      this.props.history.push('/');
    }else{
      this.props.history.push('/');
    }
  }

  render() {
    return null;
  }
}

function mapStateToProps(state) {
  return {
    data: state
  };
}

export default withRouter(connect(
  mapStateToProps,
)(Auth));
