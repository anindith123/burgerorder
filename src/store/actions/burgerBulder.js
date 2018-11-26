import * as actionTypes from './actionsTypes'
import axios from '../../axios-orders'

export const addIngredirent = (name) =>{
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName:name
    };
}

export const removeIngredirent = (name) =>{
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName:name
    };
}

export const setIngredients = (ingredients1)=>{
return {
    type:actionTypes.SET_INGREDIENTS,
    ingredients:ingredients1
}
}

export const fetchIngredientsFailed = ()=>{
return {
    type:actionTypes.FETCH_INGREDIENTS_FAILE
}
}

export const initIngredients = () =>{
    return dispatch=>{
        axios.get('https://react-my-burger-6796e.firebaseio.com/ingredients.json')
        .then(response=>{
          dispatch(setIngredients(response.data));
        })
        .catch(error=>{
        dispatch(fetchIngredientsFailed());
        })
    }
}