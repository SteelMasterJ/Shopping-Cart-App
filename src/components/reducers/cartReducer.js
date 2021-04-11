import { ADD_TO_CART, SUBTRACT_FROM_CART } from '../actions/action-types/constActions';
// import { SUBTRACT_FROM_CART } from '../actions/action-types/constActions';


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
    //MainPage Action Logic
    if(action.type === ADD_TO_CART) {
        let cartItem = state.saleItems.find(item => item.id === action.id)
        // console.log("cartItem = " + JSON.stringify(cartItem));

        //check if the action id exists in the cartItems
        let existedItem = state.cartItems.find(item => action.id === item.id)
        // console.log("existedItem = " + JSON.stringify(existedItem));
        if(existedItem)
        {
            cartItem.quantity += 1
            return {
                ...state,
                total: state.total + cartItem.price 
                }
        }
        else {
            cartItem.quantity = 1;
            //calculating the total
            let newTotal = state.total + cartItem.price 
            return {
                ...state,
                cartItems: [...state.cartItems, cartItem],
                total : newTotal
            }
            
        }
    }
    if(action.type=== SUBTRACT_FROM_CART) {  
        let addedItem = state.cartItems.find(item => item.id === action.id) 
        //if the qt == 0 then it should be removed
        if (!(addedItem)) {
            return state
        } else if (addedItem.quantity === 1) {
            let newItems = state.cartItems.filter(item => item.id !== action.id)
            let newTotal = state.total - addedItem.price
            return {
                ...state,
                cartItems: newItems,
                total: newTotal
            }
        } else {
            addedItem.quantity -= 1
            let newTotal = state.total - addedItem.price
            return {
                ...state,
                total: newTotal
            }
        }
        
    }
    else {
        return state
    }

}

export default cartReducer;