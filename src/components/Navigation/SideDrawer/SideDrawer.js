import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Aux'

function SideDrawer(props) {

    let attachedClasses = [classes.SideDrawer, classes.Close]
    if(props.show){
        attachedClasses = [classes.SideDrawer, classes.Open]
    }

    return (
        <Aux>
            <Backdrop show = {props.show} Clicked = {props.closed}/>
                <div className={attachedClasses.join(' ')}>
                    <div className  = {classes.Logo}>
                        <Logo/>
                    </div>
                    <nav>
                        <NavigationItems /> 
                    </nav>
                </div>
        </Aux>
    )
}
export default SideDrawer