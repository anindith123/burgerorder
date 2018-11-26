import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index';
class ContactData extends Component{
    state = {
        orderForm:{
                name: {
                    elementType:'input',
                    elementConfig:{
                        type:"text",
                        placeholder:'Name'
                    },
                    value:'',
                    validation:{
                        required:true,
                        minlength:5,
                        maxlength:10
                    },
                    valid:false,
                    touched:false
                },
                street:{
                    elementType:'input',
                    elementConfig:{
                        type:"text",
                        placeholder:'Street'
                    },
                    value:'',
                    validation:{
                        required:true,
                        minlength:6,
                        maxlength:12
                    },
                    valid:false,
                    touched:false
                },
                zipCode:{
                    elementType:'input',
                    elementConfig:{
                        type:"text",
                        placeholder:'ZIP code'
                    },
                    value:'',
                    validation:{
                        required:true,
                        minlength:5,
                        maxlength:14
                    },
                    valid:false,
                    touched:false
                },
                country:{
                    elementType:'input',
                    elementConfig:{
                        type:"text",
                        placeholder:'Coutry'
                    },
                    value:'',
                    validation:{
                        required:true,
                        minlength:5,
                        maxlength:15
                    },
                    valid:false,
                    touched:false
                },
                email:{
                    elementType:'input',
                    elementConfig:{
                        type:"email",
                        placeholder:'E-mail'
                    },
                    value:'',
                    validation:{
                        required:true,
                        minlength:9,
                        maxlength:25
                    },
                    valid:false,
                    touched:false
                },
                deliveryMethod: {
                    elementType:'select',
                    elementConfig:{
                       options:[{value:'fastest',displayValue:'Fastest'},
                       {value:'cheapest',displayValue:'Cheapest'},
                       {value:'slowest',displayValue:'Slowest'}]
                    },
                    value:'',
                    validation:{
                        required:true}
                },               
        },
        name:'',
        email:'', 
        address:{
            street:'',
            postalCode:''
        },
        formValid:false
    }
    checkValidity(value,rules){
        let isValid = true;
        if(rules.required){
            isValid=value.trim() !== '' && isValid;
        }        
        if(rules.minlength){
            isValid = value.length>=rules.minlength && isValid;
        }
        if(rules.minlength){
            isValid = value.length<=rules.maxlength && isValid;
        }
        return isValid;
    }
    orderHandler= (event) => {
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        event.preventDefault();
        
         console.log(this.props.ings);
         const order = {
             ingredients: this.props.ings,
             price: this.props.price,
             orderData:formData,
         }
         console.log("amma ")
         this.props.onOrderBurger(order)
         this.props.history.push('/');
 
    }
    inputChangedHandler=(event, inputIdentifier)=>{
        const updatedOrderForm={
            ...this.state.orderForm
        }

        const updatedFormElement = {...updatedOrderForm[inputIdentifier]}
        updatedFormElement.value=event.target.value;
        updatedFormElement.touched = true;

        //this below code is for validation
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation)

        updatedOrderForm[inputIdentifier] = updatedFormElement
        
        let formIsValid= true;
        for(let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
        }
        this.setState({formValid:formIsValid})
        this.setState({orderForm:updatedOrderForm});
    }

    render()
    {
        const formElementsArray=[];
        for (let key in this.state.orderForm){
            formElementsArray.push({id:key,
                config:this.state.orderForm[key],
            })
        }
        let form = (
            <form onSubmit={this.orderHandler} >
            {formElementsArray.map(formElement=>{
                return(<Input key = {formElement.id}
                     elementType={formElement.config.elementType} 
                    elementConfig={formElement.config.elementConfig}
                     value={formElement.config.value}
                     changed = {(event) => this.inputChangedHandler(event,formElement.id)}
                     invalid ={!formElement.config.valid}
                     shouldValidate = {formElement.config.validation}
                     touched = {formElement.config.touched}
                     />)
            })}      
            <Button btnType="Success" disabled={!this.state.formValid} clicked={this.orderHandler}>ORDER</Button>
        </form> 
        )
        if(this.props.loading)
        {
            form = <Spinner/>
        }
        return(
            <div className={classes.ContactData}>
                <h4 style={{padding:'10px'}}>Contact Data</h4>
               {form}
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return {
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        loading:state.order.loading
    }}

const mapDispatchToProps = dispatch =>{
    return{
    onOrderBurger: (orderData)=>dispatch(actions.purchaseBurger(orderData))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData, axios));