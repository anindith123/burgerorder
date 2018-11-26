import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom";
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData'
import Spinner from '../../components/UI/Spinner/Spinner'
import {connect} from 'react-redux';
import * as actions   from '../../store/actions/index';
class Checkout extends Component {

    state = { center:'0px 600px'}

    checkoutCancelledHandler = ()=>{
        this.props.history.goBack();
    }
    checkoutContinuedHandler = ()=>{
        this.props.history.replace('/checkout/contact-data');
        this.setState({center:'0px 100px'})
    }

    render() {
        let summary = <Redirect to="/"/>
        if(this.props.ings)
        {
            console.log("**************jhgrkjnhr")
            summary = (<div>
            <CheckoutSummary 
            center = {this.state.center}
            ingredients={this.props.ings}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
            />
            <Route path={this.props.match.url+'/contact-data'} component={ContactData} />
            </div>
            )  
        }

        return summary;
        
    }
}
const mapStateToProps=state=>{
    return {
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        purchased:state.order.purchased
    }
}



export default connect(mapStateToProps)(Checkout);