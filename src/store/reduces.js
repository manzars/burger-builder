import * as actionTypes from './actions'

const ingredient_price = {
    salad: 20,
    bacon: 80,
    cheese: 60,
    meat: 100
}

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 40
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
                totalPrice: state.totalPrice + ingredient_price[action.ingredientName]
            }
        case (actionTypes.REMOVE_INGREDIENT):
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - ingredient_price[action.ingredientName]
            }
        default:
            return state
    }
}

export default reducer