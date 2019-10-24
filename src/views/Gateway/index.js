import React, { Component } from 'react';
import { Provider } from "react-redux";
import store from "../../redux/index.js"
import GatewayPage from './GatewayPage'


class Index extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <div>
            <GatewayPage />
          </div>
        </div>
      </Provider>
    )
  }
}
export default Index;