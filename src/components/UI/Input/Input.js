import React from 'react'
import classes from './Input.css'

function Input(props) {

    let inputElement = null
    let inputClasses = [classes.InputElement]
    if(props.inValid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid)
    }
    switch (props.elementtype){
        case('input'):
            inputElement = <input
            className={inputClasses.join(' ')}
            {...props.elementConfig}
            value = {props.value}
            onChange={props.clicked}
        />
            break;
        case('textarea'):
            inputElement = <textarea
            className={inputClasses.join(' ')}
            {...props.elementConfig}
            value = {props.value}
            onChange={props.clicked}
        />
            break;
        case('select'):
            inputElement = <select
            className={inputClasses.join(' ')}
            value = {props.value}
            onChange={props.clicked} >
            {props.elementConfig.options.map(option =>(
                <option key = {option.value} value={option.value}>{option.display}</option>
            ))}
            </select>
            break;
        default:
                inputElement = <input
                className={inputClasses.join(' ')} 
                {...props.elementConfig}
                value = {props.value}
                onChange={props.clicked}
            />
    }

    
    return (
        <div className = {classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}
export default Input