//Add to Cart Action

export const addToCart = (id) => {
    return {
        type: ADD_TO_CART,
         id }
}

//Subtract from Cart Action

export const subtractFromCart = (id) => {
    return {
        type: SUBTRACT_FROM_CART,
         id }
}