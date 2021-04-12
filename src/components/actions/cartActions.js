import { ADD_TO_CART, SUBTRACT_FROM_CART, ADD_ITEMS_TO_STATE } from './action-types/constActions'

//Add to Cart Action

export const addToCart = (id, name, price) => {
    return {
        type: ADD_TO_CART,
        id,
        name,
        price
    }
}

//Subtract from Cart Action

export const subtractFromCart = (id) => {
    return {
        type: SUBTRACT_FROM_CART,
         id }
}

export const addItemsToState = (items) => {
    return {
        type: ADD_ITEMS_TO_STATE,
        items
    }
}