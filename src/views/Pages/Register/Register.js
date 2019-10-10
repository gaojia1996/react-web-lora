import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row, FormText, } from 'reactstrap';
import { connect } from "react-redux";
import { userRegister } from '../../../redux/actions';
import { bindActionCreators } from "redux";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
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
    this.props.userRegister(this.state.email, this.state.password);
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
                    <Input type="email" id="email" name="email" placeholder="email" onChange={this.handleEmail} />
                  </InputGroup>
                  {this.state.email === null || this.state.email.length === 0 ? <FormText color="muted">请输入用户邮箱!</FormText> : null}
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-lock"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="password" id="password" name="password" placeholder="password" onChange={this.handlePassword} />
                  </InputGroup>
                  {this.state.password === null || this.state.password.length === 0 ? <FormText color="muted">请输入用户密码!</FormText> : null}

                  {(this.state.password === null || this.state.password.length === 0 || this.state.email === null || this.state.email.length === 0) ?
                    <Button color="success" block onClick={this.handleSubmit} disabled>注册账号</Button> :
                    <Button color="success" block onClick={this.handleSubmit}>注册账号</Button>}
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
