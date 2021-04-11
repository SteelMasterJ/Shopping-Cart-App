const initState = {
    saleItems: [
         {id: 1, name: "Brown eggs", type: "dairy", price: 28.1},
         {id: 2, name: "Watermelon", type: "fruit", price: 29.45},
         {id: 3, name: "Asparagus", type: "vegetable", price: 18.95},
         {id: 4, name: "Green smoothie", type: "dairy", price: 17.68},
         {id: 5, name: "Raw legums", type: "vegetable", price: 17.11},
         {id: 6, name: "Baking cake", type: "dairy", price: 11.14},
    ],
    cartItems:[],
    total: 0

}

const cartReducer= (state = initState, action) => {
    
    return state;

}

export default cartReducer;