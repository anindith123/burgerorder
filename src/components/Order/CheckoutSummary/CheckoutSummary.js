import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';
import {Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

const checkoutSummary = (props) => {
 
    return (
        <div className = 'contianer'>
        <div className={classes.CheckoutSummary} style={{margin:props.center}}>
            <h1 style={{width: '100%', margin: '0px auto '}}>We hope it tastes well!</h1>
            <div style={{ margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <div>
            <Button 
                btnType="Danger"
                clicked={props.checkoutCancelled}>CANCEL</Button>
            <Button 
                btnType="Success"
                clicked={props.checkoutContinued}>CONTINUE</Button>
                </div>
        </div>
        </div>
    );
}

export default checkoutSummary;