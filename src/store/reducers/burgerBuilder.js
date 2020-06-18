import * as actionTypes from '../actions/actionTypes'

const ingredient_price = {
    salad: 20,
    bacon: 80,
    cheese: 60,
    meat: 100
}

const initialState = {
    ingredients: null,
    totalPrice: 40,
    error: false,
    building: false
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case (actionTypes.ADD_INGREDIENT):
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + ingredient_price[action.ingredientName],
                building: true
            }
        case (actionTypes.REMOVE_INGREDIENT):
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - ingredient_price[action.ingredientName],
                building: true
            }
        case (actionTypes.SET_INGREDIENTS):
            return {
                ...state,
                ingredients: action.ingredients,
                error: false,
                totalPrice: 40,
                building: false
            }
        case (actionTypes.FETCH_INGREDIENT_FAILED):
            return {
                ...state,
                error: true
            }
        default:
            return state
    }
}

export default reducer