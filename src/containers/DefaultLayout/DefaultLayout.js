import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import { AppBreadcrumb, AppFooter, AppHeader, AppSidebar, AppSidebarFooter, AppSidebarForm, AppSidebarHeader, AppSidebarMinimizer, AppSidebarNav, } from '@coreui/react';
import { connect } from "react-redux";
import { userLogin } from '../../redux/actions';
import { bindActionCreators } from "redux";
import navigation from '../../_nav';
import routes from '../../routes';
import './style.css';
import Clock from '../../components/Clock';
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: this.props.data.userLogin ? routes.routesWithAuth : routes.routesProtected,
    }
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    return (
      <div className="app">
        <AppHeader fixed className="mainColor">
          <Suspense fallback={this.loading()}>
            <DefaultHeader />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg" className="mainColor">
            <AppSidebarHeader className="mainColor" />
            <AppSidebarForm className="mainColor" />
            <Suspense>
              {this.props.data.userLogin ?
                <AppSidebarNav navConfig={navigation.navWithAuth} {...this.props} />
                :
                <AppSidebarNav navConfig={navigation.navnavWithNoAuth} {...this.props} />
              }
            </Suspense>
            <AppSidebarFooter className="mainColor">
              <Clock />
            </AppSidebarFooter>
            <AppSidebarMinimizer className="mainColor"></AppSidebarMinimizer>
          </AppSidebar>
          <main className="main bodyColor">
            <AppBreadcrumb appRoutes={this.state.routes} className='bodyColor' />
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {this.state.routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                  <Redirect from="/" to="/home" />
                </Switch>
              </Suspense>
            </Container>
          </main>
        </div>
        <AppFooter className="mainColor">
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
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
)(DefaultLayout);
