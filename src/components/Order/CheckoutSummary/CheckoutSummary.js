import React from 'react'
import classes from './CheckoutSummary.css'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
// import classes from '../../UI/Button/Button.css'

function CheckoutSummary(props) {
    return (
        <div className = {classes.CheckoutSummary}>
            <h1>We hope it Tastes well!</h1>
            <div style = {{ width: '100%', height: 'auto', margin: 'auto' }}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button
                btnType = "Danger"
                clicked = {props.cancelHandler}> CANCEL
            </Button>
            <Button
                btnType = "Success"
                clicked = {props.continueHandler}> CONTINUE
            </Button>
        </div>
    )
}
export default CheckoutSummary