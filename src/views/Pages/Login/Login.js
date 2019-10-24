import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row, FormGroup, } from 'reactstrap';
import { connect } from "react-redux";
import { userLogin } from '../../../redux/actions';
import { bindActionCreators } from "redux";

class Login extends Component {
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
      this.props.userLogin(this.state.email, this.state.password);
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
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    {/* <Form onSubmit={this.handleSubmit}> */}
                    <h2 className="text-center">登录</h2>
                    <p>{this.props.data.userLogin ? " " : this.props.data.loginErr}</p>
                    <FormGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-envelope"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="email" name="email" placeholder="Email" onChange={this.handleEmail} valid={this.state.emailValid} invalid={!this.state.emailValid} />
                      </InputGroup>
                      {/* {this.state.email === null || this.state.email.length === 0 ? <FormText color="muted">请输入用户邮箱!</FormText> : null} */}
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" id="password" name="password" placeholder="Password" onChange={this.handlePassword} valid={this.state.passwordValid} invalid={!this.state.passwordValid} />
                      </InputGroup>
                      {/* {this.state.password === null || this.state.password.length === 0 ? <FormText color="muted">请输入用户密码!</FormText> : null} */}
                    </FormGroup>
                    <Row>
                      <Col xs="12">
                        {(this.state.emailValid && this.state.passwordValid) ?
                          <Button color="primary" block onClick={this.handleSubmit}>登录</Button> :
                          <Button color="primary" block onClick={this.handleSubmit}>登录</Button>
                        }
                      </Col>
                      {/* <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col> */}
                    </Row>
                    {/* </Form> */}
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>注册</h2>
                      <p>暂无账号？欢迎点击注册按钮注册账号</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1} >现在注册!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
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
  return bindActionCreators({ userLogin }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);