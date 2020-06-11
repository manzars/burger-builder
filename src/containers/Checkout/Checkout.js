import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import {Route} from 'react-router-dom'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {

    state = {
        ingredients: null,
        price: 0
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search)
        const ingredient = {}
        let price = 0
        for (let param of query.entries()){
            if(param[0] === "price"){
                price = param[1]
            }else{
                ingredient[param[0]] = +param[1]
            }
            console.log(param[0], param[1])
        }
        
        this.setState({
            ingredients: ingredient,
            price: price
        })
    }

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
                ingredients = {this.state.ingredients}
                continueHandler = {this.continueHandler}
                cancelHandler = {this.cancelHandler}/>
                <Route path = {this.props.match.path + "/submit-form" } render = {() => (<ContactData ingredients={this.state.ingredients} price = {this.state.price} {...this.props} />)}/> 
            </div>
        )
    }
}

export default Checkout
