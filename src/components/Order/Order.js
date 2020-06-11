import React from 'react'
import classes from './Order.css'

function Order(props) {

    let allItems = []
    for (let name in props.ingredient){
        allItems.push({
            name: name,
            value: props.ingredient[name]
        })
    }

    let item = allItems.map(or => {
        return (
            <span key = {or.name} style = {{
                textDecoration: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}>
                {or.name} ({or.value})
            </span>
        )
    })

    return (
        <div className = {classes.Order}>
            <p>Ingredients: {item}</p>
            <p>Price: <strong>INR {props.price}</strong></p>
        </div>
    )
}

export default Order
