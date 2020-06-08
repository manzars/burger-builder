import React from 'react'
import classes from './Modal.css'
import Aux from '../../../hoc/Aux'
import Backdrop from '../Backdrop/Backdrop'


class Modal extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || this.props.children !== nextProps.children
    }

    componentWillUpdate() {
        console.log("Nothings Happen")
    }

    render() {
        return (
            <Aux>
                <Backdrop show = {this.props.show} Clicked = {this.props.modalClosed}/>
                <div
                    style = {{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}
                    className = {classes.Modal}>
                    {this.props.children}
                </div>
            </Aux>
        )
    }
}
export default Modal
