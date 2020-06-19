import React from 'react'
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    {
        label: "Salad",
        type: "salad"
    },
    {
        label: "Bacon",
        type: "bacon"
    },
    {
        label: "Meat",
        type: "meat"
    },
    {
        label: "Cheese",
        type: "cheese"
    },
]

function BuildControls(props) {
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)} Rupees</strong></p>
            {controls.map((ctrl) => (
                <BuildControl
                    addClick = {() => props.addIngredientsHandler(ctrl.type)}
                    removeClick = {() => props.removeIngredientsHandler(ctrl.type)}
                    key={ctrl.label}
                    label = {ctrl.label}
                    disabled={props.disabled[ctrl.type]}
                /> 
            ))}
            <button
                disabled = {!props.purchasable}
                onClick={props.purchasing}
                className={classes.OrderButton}>{props.isAuth ? "ORDER NOW" : "SIGN UP TO CONTINUE"}
            </button>
        </div>
    )
}
export default BuildControls