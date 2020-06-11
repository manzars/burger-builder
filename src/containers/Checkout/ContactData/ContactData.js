import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import classes  from './ContactData.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postal: ''
        },
        loading: false,
    }

    submitHandler= (event) => {
        event.preventDefault()

        this.setState(
            { loading: true }
        )
        // alert("Order Placed Successfully!")
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: "Manzar Shaikh",
                address: {
                    street: "Juhu Lane",
                    zipCode: "400049",
                    country: "India"
                },
                email: "manzarshaikh27@gmail.com"
            }
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

    render() {

        let form = (
            <form>
                <input className={classes.Input} type="text" name = "name" placeholder = "Your Name"/>
                <input className={classes.Input} type="text" name = "email" placeholder = "Your Email"/>
                <input className={classes.Input} type="text" name = "street" placeholder = "Street"/>
                <input className={classes.Input} type="text" name = "postal" placeholder = "Postal Code"/>
                <Button clicked = {this.submitHandler} btnType = "Success" >ORDER</Button>
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

export default withErrorHandler(ContactData, axios)
