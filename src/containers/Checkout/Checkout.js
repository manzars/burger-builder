import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import {Route} from 'react-router-dom'
import ContactData from './ContactData/ContactData'
import {connect} from 'react-redux'

class Checkout extends Component {

    cancelHandler = () => {
        this.props.history.goBack()
    }

    continueHandler = () => {
        this.props.history.replace('/checkout/submit-form')
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                ingredients = {this.props.ings}
                continueHandler = {this.continueHandler}
                cancelHandler = {this.cancelHandler}/>
                <Route
                    path = {this.props.match.path + "/submit-form" }
                    component = {ContactData}
                /> 
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    }
}


export default connect(mapStateToProps)(Checkout)
