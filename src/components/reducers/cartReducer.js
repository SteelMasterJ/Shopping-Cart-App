import { ADD_TO_CART } from '../actions/action-types/constActions';
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
    cartItems:[
        {id: 1, name: "Brown eggs", type: "dairy", price: 28.1, quantity: 1},
    ],
    total: 28.1

}

const cartReducer= (state = initState, action) => {

    //MainPage Action Logic
    if(action.type === ADD_TO_CART){
        let cartItem = state.items.find(item => item.id === action.id)
        //check if the action id exists in the cartItems
        let existed_item = state.cartItems.find(item => action.id === item.id)
        if(existed_item)
        {
            cartItem.quantity += 1 
            return{
                ...state,
                total: state.total + cartItem.price 
                }
        }
        else{
            cartItem.quantity = 1;
            //calculating the total
            let newTotal = state.total + cartItem.price 
            
            return{
                ...state,
                cartItems: [...state.cartItems, cartItem],
                total : newTotal
            }
            
        }
    }
    else{
        return state
    }

}

export default cartReducer;