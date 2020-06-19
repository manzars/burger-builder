import React from 'react';
import Layout from '../hoc/Layout/Layout'
import BurgerBuilder from './BurgerBuilder/BurgerBuilder'
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'
import Logout from './Auth/Logout/Logout';
import {connect}  from 'react-redux'
import * as actions from '../store/actions/index'
import asyncComponent from '../hoc/asyncComponent/asyncComponent'

const asyncCheckout = asyncComponent(() => {
  return import('./Checkout/Checkout')
})

const asyncOrders = asyncComponent(() => {
  return import('./Orders/Orders')
})

const asyncAuth = asyncComponent(() => {
  return import('./Auth/Auth')
})


class App extends React.Component {

  componentDidMount() {
    this.props.ontryAutoSignUp()
  }

  render() {

    let route = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/auth" component={asyncAuth} />
        <Redirect to="/" />
      </Switch>
    )

    if(this.props.isAuth){
      route = (
        <Switch>
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/checkout" component={asyncCheckout} />
            <Route path="/logout" component={Logout} />
            <Route path="/orders" component={asyncOrders} />
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
