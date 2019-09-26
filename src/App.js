import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Provider } from "react-redux";
import store from './redux/index';
import Auth from './auth/Auth';
import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/Pages/Login/Login'));
const Register = React.lazy(() => import('./views/Pages/Register/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500/Page500'));

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <React.Suspense fallback={loading()}>
            <Auth></Auth>
            <Switch>
              <Route exact path="/login" name="Login Page" render={props => <Login {...props} />} />
              <Route exact path="/register" name="Register Page" render={props => <Register {...props} />} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props} />} />
              <Route path="/" name="Home" render={props => <DefaultLayout {...props} />} />
            </Switch>
          </React.Suspense>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
