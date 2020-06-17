import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import {Route, Redirect} from 'react-router-dom'
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

        let summary = <Redirect to="/" />
        if(this.props.ings){
            let purchase = this.props.purchased ? <Redirect to="/" /> : null
            summary = (
                <div>
                    {purchase}
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

        return summary
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}


export default connect(mapStateToProps)(Checkout)
