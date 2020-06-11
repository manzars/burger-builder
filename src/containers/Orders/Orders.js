import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'


class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {

        axios.get("/orders.json")
        .then(response => {

            let fetchedData = []
            for (let key in response.data){
                fetchedData.push({
                    ...response.data[key],
                    id: key
                })
            }
            this.setState({loading: false, orders: fetchedData})
        })
        .catch(err => {
            this.setState({loading: false})
        })

    }

    render() {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order key = {order.id} price = {order.price} ingredient = {order.ingredients}/>
                ))}
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios)
