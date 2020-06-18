import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart())
        axios.post("/orders.json?auth=" + token, orderData)
        .then(response => {
            dispatch(purchaseBurgerSuccess(response.data.name, orderData))
        })
        .catch(error => {
            dispatch(purchaseBurgerFail(error))
        })
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDER_START
    }
}

export const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: orders
    }
}

export const fetchOrderFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDER_FAIL,
        error: error
    }
}

export const fetchOrder = (token, localId) => {
    return dispatch => {
        dispatch(fetchOrderStart())
        const queryParam = '?auth=' + token + '&orderBy="localId"&equalTo="' + localId + '"'

        //https://burger-builder-51303.firebaseio.com/orders.json?auth=eyJhbGciOiJSUzI1NiIsImtpZCI6ImMzZjI3NjU0MmJmZmU0NWU5OGMyMGQ2MDNlYmUyYmExMTc2ZWRhMzMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYnVyZ2VyLWJ1aWxkZXItNTEzMDMiLCJhdWQiOiJidXJnZXItYnVpbGRlci01MTMwMyIsImF1dGhfdGltZSI6MTU5MjUyMDk2MiwidXNlcl9pZCI6IkRwd1JrSzhyM1RjZ1BFMGt2NXoybDNqSTNVNzMiLCJzdWIiOiJEcHdSa0s4cjNUY2dQRTBrdjV6MmwzakkzVTczIiwiaWF0IjoxNTkyNTIwOTYyLCJleHAiOjE1OTI1MjQ1NjIsImVtYWlsIjoibWFuQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJtYW5AZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.TLobOmho3rxYsf8UlrTMz19XfPrP8JK9r58Hwxf0Jh2CXJQHTqrrfmGkKEXsrQs8oOX2V1GFb5h_tfSsc3hQTL-3yV5U0OmrTans_444_Zsv40M3wPC5uh7PYOYW8UnO8yBD0aO_93LDLIdzEocZeayEt1Y-lco3UkbzfGaiyodNHA99of6dbP-2JFnrnZWB1Jd1T6NmS9zuZ3u_J0pVHt7tG-sey_gh2OBLY_D8cIUVxAVCB4aHOGDDtkuEjBanPWsOJOwb7RbrsqHbkLpNUyhR94GHfU2cMV8kBcWTZnTU7nBfIZIPpxgy0yzvxVZ5UzSLg3828MEFhIvkXKZNQg&"userId"&equalTo="DpwRkK8r3TcgPE0kv5z2l3jI3U73"
        axios.get("/orders.json" + queryParam)
        .then(response => {
            let fetchedData = []
            for (let key in response.data){
                fetchedData.push({
                    ...response.data[key],
                    id: key
                })
            }
            dispatch(fetchOrderSuccess(fetchedData))
        })
        .catch(err => {
            dispatch(fetchOrderFail(err))
        })
    }
}
