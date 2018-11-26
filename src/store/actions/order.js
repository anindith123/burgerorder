import * as actionTypes from  './actionsTypes'
import axios from '../../axios-orders'

export const purchaseBurgerSuccess = (id,orderData)=>{
    return {
        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId : id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error)=>{
return {
        type:actionTypes.PURCHASE_BURGER_FAIL,
        error:error    
    }
}

export const purchaseBurgerStart =()=>{
    return{
        type: actionTypes.PURCHASE_BURGER_START

    }
}

export const purchaseBurger = (orderData) =>{
    return dispatch=>{
        dispatch(purchaseBurgerStart())
        axios.post( '/orders.json', orderData ).then( response => {
            console.log("********",response.data,"*****",orderData);
       dispatch(purchaseBurgerSuccess(response.data,orderData)) 
        } ).catch( error => {
            console.log("###########",error)
         dispatch(purchaseBurgerFail(error))   
        } );
    };
}


export const purchaseInit=()=>{
    return{
        type:actionTypes.PURCHASE_INIT
    }
}


export const fetchOrdersSucces = (orders) =>{
    return{
        type:actionTypes.FETCH_ORDERS_SUCCESS,
        orders:orders
    }
}


export const fetchOrdersFail = (error)=>{
    return {
        type:actionTypes.PURCHASE_BURGER_FAIL,
        error:error
    }
}

export const fetchOrdersStart =()=>{
    return{
        type: actionTypes.FETCH_ORDERS_INIT
    }
}


export const fetchOrders = () =>{
    console.log("insode fetch orders")
    return dispatch =>{
      
        axios.get('/orders.json').then(res =>{
            const fetchedOrders=[];
            for(let key in res.data){
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                })
            }
            dispatch(fetchOrdersSucces(fetchedOrders))
        }).catch(err=>{
            dispatch(fetchOrdersFail());
        })
    }
}