import React from 'react'
import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'

function NavigationItems(props) {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link = "/">Burger Builder</NavigationItem>
            <NavigationItem link = "/orders">Checkout</NavigationItem>
        </ul>
    )
}
export default NavigationItems