import React from 'react'
import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'

function NavigationItems(props) {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link = "/">Burger Builder</NavigationItem>
            {props.isAuth ? <NavigationItem link = "/orders">Orders</NavigationItem> : null}
            {!props.isAuth ? <NavigationItem link = "/auth">LOGIN</NavigationItem> : <NavigationItem link = "/logout">Logout</NavigationItem>}
        </ul>
    )
}
export default NavigationItems