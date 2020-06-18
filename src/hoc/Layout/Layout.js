import React from 'react'
import Aux from '../Aux'
import classes from './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import {connect} from 'react-redux'

class Layout extends React.Component {

    state = {
        showSideDrawer: false
    }

    SideDrawerClosedHandler = () => {
        this.setState(
            { showSideDrawer: false }
        )
    }

    sideDrawerToggleHandler = () => {
        this.setState ((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    }

    render() {
        return(
            <Aux>
                <Toolbar isAuth = {this.props.isAuth} drawerToggleClicked = {this.sideDrawerToggleHandler}/>
                <SideDrawer isAuth = {this.props.isAuth} show = {this.state.showSideDrawer} closed = {this.SideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
    
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.idToken !== null
    }
}

export default connect(mapStateToProps)(Layout)