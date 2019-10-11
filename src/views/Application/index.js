import React, { Component } from 'react';
import { Provider } from "react-redux";
import store from "../../redux/index.js"
import AppPage from './appPage'


class Index extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <div>
          <AppPage />
          </div>
          
        </div>
      </Provider>
    )
  }
} 
export default Index;