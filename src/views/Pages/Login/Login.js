import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row, FormGroup, FormText, } from 'reactstrap';
import { connect } from "react-redux";
import { userLogin } from '../../../redux/actions';
import { bindActionCreators } from "redux";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      err: null,
    }
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleEmail(event) {
    this.setState({
      email: event.target.value,
    });
  }
  handlePassword(event) {
    this.setState({
      password: event.target.value,
    });
  }
  handleSubmit() {
    return new Promise((resolve) => {
      this.props.userLogin(this.state.email, this.state.password);
      return resolve();
    })
      .then(() => {
        if (this.props.data.userLogin) {
          this.props.history.push('/');
        } else {
          this.setState({
            err: "用户登录失败，请重新登录!",
          })
        }
      });
  }
  render() {
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
                    <p>{this.state.err}</p>
                    <FormGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-envelope"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="email" name="email" placeholder="Email" onChange={this.handleEmail} />
                      </InputGroup>
                      {this.state.email === null || this.state.email.length === 0 ? <FormText color="muted">请输入用户邮箱!</FormText> : null}
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" onChange={this.handlePassword} />
                      </InputGroup>
                      {this.state.password === null || this.state.password.length === 0 ? <FormText color="muted">请输入用户密码!</FormText> : null}
                    </FormGroup>
                    <Row>
                      <Col xs="6">
                        {this.state.password === null || this.state.password.length === 0 || this.state.email === null || this.state.email.length === 0 ?
                          <Button color="primary" className="px-4" onClick={this.handleSubmit} disabled>Login</Button> :
                          <Button color="primary" className="px-4" onClick={this.handleSubmit}>Login</Button>
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
                        <Button color="primary" className="mt-3" active tabIndex={-1} >Register Now!</Button>
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