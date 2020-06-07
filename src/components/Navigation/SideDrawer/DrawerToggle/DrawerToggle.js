import React from 'react'
import classes from './DrawerToggle.css'

function DrawerToggle(props) {
    // console.log(props.clicked)
    return (
        <div className={classes.DrawerToggle} onClick = {props.clicked}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}
export default DrawerToggle