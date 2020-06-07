import React from 'react'
import Aux from '../../../hoc/Aux'
import Button from '../../UI/Button/Button'


class OrderSummary extends React.Component {
    
    render() {

        let summary = Object.keys(this.props.ingredients).map((igKey) => {
            if(this.props.ingredients[igKey] !== 0){
                return (
                    <li key = {igKey}>
                        <span style = {{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
                    </li>
                )
            }
            return null
        })

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A Delicious Burger With Following Ingredients:</p>
                <ul>
                    {summary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button clicked={this.props.cancelClicked} btnType = "Danger">CANCEL</Button>
                <Button btnType = "Success" clicked={this.props.continueClicked}>CONTINUE</Button>
            </Aux>
        )
    }

    

    
}
export default OrderSummary
