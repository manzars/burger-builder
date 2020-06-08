import React, { Component } from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'


class BurgerBuilder extends Component {

    ingredient_price = {
        salad: 20,
        bacon: 80,
        cheese: 60,
        meat: 100
    }

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 40,
        purchasable: false,
        purchasing: false,
        loading: false
    }

    purchasableHandler = (ings) => {

        const sum = Object.keys(ings).map((igKey) => {
            return ings[igKey]
        }).reduce((summ, el) =>{
            return summ + el
        }, 0)
        this.setState({purchasable: sum > 0})
    }
    

    addIngredientsHandler = (type) => {
        // console.log(type)
        let oldValue = this.state.ingredients[type]
        let newValue = oldValue + 1
        let ings = {
            ...this.state.ingredients
        }
        ings[type] = newValue
        let oldPrice = this.state.totalPrice
        let newPrice = oldPrice + this.ingredient_price[type]
        this.setState({ingredients: ings, totalPrice: newPrice})
        this.purchasableHandler(ings)
        // console.log(this.ingredients)

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
        this.setState(
            { loading: true }
        )
        // alert("Order Placed Successfully!")
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: "Manzar Shaikh",
                address: {
                    street: "Juhu Lane",
                    zipCode: "400049",
                    country: "India"
                },
                email: "manzarshaikh69@gmail.com"
            }
        }
        axios.post("/orders.json", order)
        .then(response => {
            this.setState({loading: false})
        })
        .catch(error => {
            this.setState({loading: false})
        })
        this.setState(
            { 
                purchasing: false,
                ingredients: {
                    salad: 0,
                    bacon: 0,
                    cheese: 0,
                    meat: 0
                }
            }
        )
    }

    removeIngredientsHandler = (type) => {
        console.log(this.state.ingredients[type])
        if(this.state.ingredients[type] === 0){
            return
        }else{
            let oldValue = this.state.ingredients[type]
            let newValue = oldValue - 1
            let ings = {
                ...this.state.ingredients
            }
            ings[type] = newValue
            let oldPrice = this.state.totalPrice
            let newPrice = oldPrice - this.ingredient_price[type]
            this.setState({ingredients: ings, totalPrice: newPrice})
            this.purchasableHandler(ings)
        }
    }
    

    render() {
        

        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo){
            disabledInfo[key] = this.state.ingredients[key] <= 0
        }
        // console.log(disabledInfo)

        let orderSummary = (
            <OrderSummary
                ingredients = {this.state.ingredients}
                cancelClicked = {this.closeModelHandler}
                continueClicked = {this.continuePurchaseHandler}
                price = {this.state.totalPrice}
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
                
                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls
                    addIngredientsHandler = {this.addIngredientsHandler}
                    removeIngredientsHandler = {this.removeIngredientsHandler}
                    disabled = {disabledInfo}
                    price = {this.state.totalPrice}
                    purchasable = {this.state.purchasable}
                    purchasing = {this.purchaseHandler}
                />
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios)
