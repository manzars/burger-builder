import * as actionTypes from '../actions/actionTypes'

const initialState = {
    loading: false,
    error: null,
    idToken: null,
    localId: null,
    authRedirectPath: '/'
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case(actionTypes.AUTH_START):
            return{
                ...state,
                loading: true
            }
        case (actionTypes.AUTH_SUCCESS):
            return {
                ...state,
                loading: false,
                idToken: action.idToken,
                localId: action.localId,
                error: null
            }
        case (actionTypes.AUTH_FAIL):
            return {
                ...state,
                loading: false,
                error: action.error,
                idToken: null,
                localId: null
            }
        case (actionTypes.AUTH_LOGOUT):
            return{
                ...state,
                loading: false,
                idToken: null,
                localId: null,
                error: null
            }
        case (actionTypes.SET_AUTH_REDIRECT_PATH):
            return {
                ...state,
                authRedirectPath: action.path
            }
        default:
            return state
    }
}


export default reducer