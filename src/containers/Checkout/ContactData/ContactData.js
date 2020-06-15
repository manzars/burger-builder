import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import classes  from './ContactData.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import Input from '../../../components/UI/Input/Input'
import {connect} from 'react-redux'

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    isRequired: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    isRequired: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    isRequired: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    isRequired: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    isRequired: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: "fastest", display: "Fastest"},
                        {value: "cheapest", display: "Cheapest"}
                    ]
                },
                value: '',
                validation: {},
                valid: true
            }
        },
        loading: false,
        validForm: false
    }

    submitHandler= (event) => {
        event.preventDefault()

        this.setState(
            { loading: true }
        )
        // alert("Order Placed Successfully!")
            
        let formData = {}
        for(let elementKey in this.state.orderForm){
            formData[elementKey] = this.state.orderForm[elementKey].value
        }

        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            formData
        }
        axios.post("/orders.json", order)
        .then(response => {
            this.setState({loading: false})
            this.props.history.push('/')
        })
        .catch(error => {
            this.setState({loading: false})
        })
    }

    checkValidation = (value, rules) => {

        let isValid = true
        if(rules.isRequired){
            isValid = value.trim() !== '' && isValid
        }

        if(rules.minLength){
            isValid = value.length >=rules.minLength && isValid
        }

        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid
        }
        return isValid
    }

    changeListner = (event, itemIdentifier) => {
        let updatedForm = {
            ...this.state.orderForm
        }
        let updatedFormElement = {
            ...updatedForm[itemIdentifier]
        }
        updatedFormElement.value = event.target.value
        updatedFormElement.touched = true
        updatedFormElement.valid = this.checkValidation(updatedFormElement.value, updatedFormElement.validation)
        updatedForm[itemIdentifier] = updatedFormElement

        let formValid = true
        for(let key in updatedForm){
            formValid = updatedForm[key].valid && formValid
        }
        console.log(formValid)
        this.setState({ orderForm: updatedForm, validForm: formValid })
        // console.log(updatedFormElement)
    }

    render() {

        let orderFormArray = []
        for(let key in this.state.orderForm){
            orderFormArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form>

                {orderFormArray.map(element => (
                    <Input elementtype = {element.config.elementType}
                    elementConfig = {element.config.elementConfig}
                    value = {element.config.value}
                    inValid = {!element.config.valid} 
                    touched = {element.config.touched}
                    shouldValidate = {element.config.validation}
                    clicked = {(event) => this.changeListner(event, element.id)}
                    key = {element.id}/>
                ))}
                <Button disabled = {!this.state.validForm} clicked = {this.submitHandler} btnType = "Success" >ORDER</Button>
            </form>
        )
        if(this.state.loading){
            form = <Spinner />
        }

        return (
            <div className = {classes.ContactData}>
                <h4>Enter your Details</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(withErrorHandler(ContactData, axios))
