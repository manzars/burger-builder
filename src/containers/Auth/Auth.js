import React, { Component } from 'react'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import classes from './Auth.css'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'
import { Redirect } from 'react-router'

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address'
                },
                value: '',
                validation: {
                    isRequired: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    isRequired: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup: true
    }

    componentDidMount() {
        if(!this.props.building && this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRedirect()
        }
    }

    checkValidation = (value, rules) => {

        let isValid = true
        if(rules.isRequired){
            isValid = value.trim() !== '' && isValid
        }

        if(rules.minLength){
            isValid = value.length >=rules.minLength && isValid
        }
        return isValid
    }

    changeListner = (event, controlName) => {
        const updatedForm = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidation(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }
        this.setState({
            controls: updatedForm
        })
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
    }

    modeChange = () => {
        this.setState(prevState => {
           return{ isSignup: !prevState.isSignup }
        })
    }

    render() {

        let orderFormArray = []
        for(let key in this.state.controls){
            orderFormArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = (
            orderFormArray.map(element => (
                <Input elementtype = {element.config.elementType}
                elementConfig = {element.config.elementConfig}
                value = {element.config.value}
                inValid = {!element.config.valid} 
                touched = {element.config.touched}
                shouldValidate = {element.config.validation}
                clicked = {(event) => this.changeListner(event, element.id)}
                key = {element.id}/>
            ))
        )

        if(this.props.loading){
            form = <Spinner />
        }

        let error = null
        if(this.props.error){
            error = this.props.error
        }

        let redirectPage = null
        if(this.props.isAuth){
            redirectPage = <Redirect to = {this.props.authRedirectPath} />
        }

        return (
            <div className = {classes.Auth}>
                {redirectPage}
                {error}
                <form onSubmit = {this.submitHandler}>
                {form}
                <Button btnType = "Success">Submit</Button>
                </form>
                <Button 
                    btnType = "Danger"
                    clicked = {this.modeChange}
                >
                    Click For {this.state.isSignup ? "SignIn" : "SignUp"}
                </Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.idToken !== null,
        building: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, method) => dispatch(actions.auth(email, password, method)),
        onSetAuthRedirect: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Auth)
