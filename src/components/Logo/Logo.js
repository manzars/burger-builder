import React from 'react'
import burger from '../../assets/images/burger.png'
import classes from './Logo.css'

function Logo(props) {
    return (
        <div className = {classes.Logo}>
            <img src = {burger} alt = "MyBurger"></img>
        </div>
    )
}
export default Logo