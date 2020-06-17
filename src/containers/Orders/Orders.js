import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import {connect} from 'react-redux'
import * as actionTypes from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {

    componentDidMount() {
        this.props.onFetch()
    }

    render() {
        let load = <Spinner />
        if(!this.props.loading){
            load = (
                <div>
                {this.props.orders.map(order => (
                    <Order key = {order.id} price = {order.price} ingredient = {order.ingredients}/>
                ))}
            </div>
            )
        }
        return load
    }
}

const mapStateToProps = (state) => {
    return{
        orders: state.order.orders,
        loading: state.loading
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onFetch: () => dispatch(actionTypes.fetchOrder())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))
