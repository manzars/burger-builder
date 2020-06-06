import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'

function SideDrawer() {
    return (
        <div>
            <Logo />
            <nav>
                <NavigationItems /> 
            </nav>
        </div>
    )
}
export default SideDrawer