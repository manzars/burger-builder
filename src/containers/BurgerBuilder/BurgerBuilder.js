import React, { Component } from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import {connect} from 'react-redux'
import * as actionTypes from '../../store/actions'

class BurgerBuilder extends Component {

    ingredient_price = {
        salad: 20,
        bacon: 80,
        cheese: 60,
        meat: 100
    }

    state = {
        purchasing: false,
        loading: false,
        totalPrice: 40
    }

    purchasableHandler = (ings) => {

        const sum = Object.keys(ings).map((igKey) => {
            return ings[igKey]
        }).reduce((summ, el) =>{
            return summ + el
        }, 0)
        return sum > 0
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    closeModelHandler = () => {
        this.setState(
            { purchasing: false }
        )
    }

    continuePurchaseHandler = () => {
        
        this.props.history.push('/checkout')
        this.setState(
            { 
                purchasing: false,
                ingredients: {
                    salad: 0,
                    bacon: 0,
                    cheese: 0,
                    meat: 0
                },
                totalPrice: 40
            }
        )
    }
    

    render() {
        

        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo){
            disabledInfo[key] = this.props.ings[key] <= 0
        }
        // console.log(disabledInfo)

        let orderSummary = (
            <OrderSummary
                ingredients = {this.props.ings}
                cancelClicked = {this.closeModelHandler}
                continueClicked = {this.continuePurchaseHandler}
                price = {this.props.price}
            />
        )
        if(this.state.loading){
            orderSummary= <Spinner />
        }

        return (
            <Aux>
                <Modal show = {this.state.purchasing} modalClosed = {this.closeModelHandler}>
                    {orderSummary}
                </Modal>
                
                <Burger ingredients = {this.props.ings}/>
                <BuildControls
                    addIngredientsHandler = {this.props.onIngredientAdded}
                    removeIngredientsHandler = {this.props.onIngredientRemoved}
                    disabled = {disabledInfo}
                    price = {this.props.price}
                    purchasable = {this.purchasableHandler(this.props.ings)}
                    purchasing = {this.purchaseHandler}
                />
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))
