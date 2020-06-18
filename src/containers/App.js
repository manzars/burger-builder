import React from 'react';
import Layout from '../hoc/Layout/Layout'
import BurgerBuilder from './BurgerBuilder/BurgerBuilder'
import Checkout from './Checkout/Checkout';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'
import Orders from './Orders/Orders';
import Auth from './Auth/Auth';
import Logout from './Auth/Logout/Logout';
import {connect}  from 'react-redux'
import * as actions from '../store/actions/index'


class App extends React.Component {

  componentDidMount() {
    this.props.ontryAutoSignUp()
  }

  render() {

    let route = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/auth" component={Auth} />
        <Redirect to="/" />
      </Switch>
    )

    if(this.props.isAuth){
      route = (
        <Switch>
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/logout" component={Logout} />
            <Route path="/orders" component={Orders} />
            <Redirect to="/" />
          </Switch>
      )
    }

    return (
      <div>
        <Layout>
          {route}
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    ontryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.idToken !== null
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
