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
import * as burgerActionTypes from '../../store/actions/index'

class BurgerBuilder extends Component {

    ingredient_price = {
        salad: 20,
        bacon: 80,
        cheese: 60,
        meat: 100
    }

    state = {
        purchasing: false
    }

    componentDidMount() {
        this.props.onInitIngredients()
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
        
        this.props.onPurchaseInit()
        this.props.history.push('/checkout')
        this.setState(
            { 
                purchasing: false
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

        let orderSummary = null

        let burger = this.props.error ? <p>Ingredients Can't be Loaded</p> : <Spinner />

        if(this.props.ings){
            burger = (
                <Aux>
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

            orderSummary = (
                <OrderSummary
                    ingredients = {this.props.ings}
                    cancelClicked = {this.closeModelHandler}
                    continueClicked = {this.continuePurchaseHandler}
                    price = {this.props.price}
                />
            )
        }

        return (
            <Aux>
                <Modal show = {this.state.purchasing} modalClosed = {this.closeModelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerActionTypes.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerActionTypes.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerActionTypes.initIngredients()),
        onPurchaseInit: () => dispatch(burgerActionTypes.purchaseInit())
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))
