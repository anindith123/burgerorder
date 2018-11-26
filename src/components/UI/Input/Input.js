import React from 'react'
import classes from './Input.css';

const Input = (props) =>{

    let inputType= null;
    let inputElement=null;
    const inputClass = []

    if(props.invalid && props.shouldValidate && props.touched){
        inputClass.push(classes.Invalid)
    }
    switch(props.elementType){
        case('input'):
        inputElement = <input onChange= {props.changed} className={inputClass.join(' ')} {...props.elementConfig} value={props.value}/>
        break;
        case('textarea'):
        inputElement = <textarea onChange= {props.changed} className={inputClass.join(' ')} {...props.elementConfig} value={props.value}/>
        break;
        case('select'):
        inputElement = <select onChange= {props.changed}className={inputClass.join(' ')}  value={props.value}>

        {props.elementConfig.options.map(option=>(<option key={option.value} 
        value={option.value}>{option.displayValue}</option>))}
        
        </select>
        break;
        default:
        inputElement = <input onChange= {props.changed} className={classes.InputElement} {...props.elementConfig} value={props.value}/>
    }
    return(
    <div>
    <label>{props.label}</label>
    {inputElement}
    </div>
)
}
export default Input;


