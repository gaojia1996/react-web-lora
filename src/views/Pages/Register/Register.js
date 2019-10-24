import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row, } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { userRegister } from '../../../redux/actions';
import { bindActionCreators } from "redux";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      emailValid: false,
      password: null,
      passwordValid: false,
    }
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleEmail(event) {
    const reg = new RegExp("^([a-zA-Z0-9]+[_|-|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|-|.]?)*[a-zA-Z0-9]+.[a-zA-Z]{2,3}$");
    this.setState({
      email: event.target.value,
      emailValid: reg.test(event.target.value) ? true : false,
    });
  }
  handlePassword(event) {
    this.setState({
      password: event.target.value,
      passwordValid: event.target.value.length < 6 || event.target.value.length > 32 ? false : true,
    });
  }
  handleSubmit() {
    if (!this.state.emailValid) {
      alert('邮箱输入有误~');
    } else if (!this.state.passwordValid) {
      alert("密码至少6位~至多不超过32位");
    } else {
      this.props.userRegister(this.state.email, this.state.password);
    }
  }
  render() {
    if (this.props.data.userLogin) {
      this.props.history.push('/home');
    }
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <h1 className="text-center">注册</h1>
                  <p>{this.props.data.userLogin ? " " : this.props.data.registerErr}</p>
                  <InputGroup className="mb-3">
                    <InputGroupText>
                      <i className="icon-envelope"></i>
                    </InputGroupText>
                    <Input type="email" id="email" name="email" placeholder="email" onChange={this.handleEmail} valid={this.state.emailValid} invalid={!this.state.emailValid} />
                  </InputGroup>
                  {/* {this.state.email === null || this.state.email.length === 0 ? <FormText color="muted">请输入用户邮箱!</FormText> : null} */}
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-lock"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="password" id="password" name="password" placeholder="password" onChange={this.handlePassword} valid={this.state.passwordValid} invalid={!this.state.passwordValid} />
                  </InputGroup>
                  {/* {this.state.password === null || this.state.password.length === 0 ? <FormText color="muted">请输入用户密码!</FormText> : null} */}

                  {(this.state.emailValid && this.state.passwordValid) ?
                    <Button color="success" block onClick={this.handleSubmit}>注册账号</Button> :
                    <Button color="success" block onClick={this.handleSubmit}>注册账号</Button>}

                  <br></br>
                  <Link to="/login">
                    <Button color="primary" block >登录</Button>
                  </Link>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ userRegister }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
