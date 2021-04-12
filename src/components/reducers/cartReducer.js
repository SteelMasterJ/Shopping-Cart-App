import { ADD_TO_CART, SUBTRACT_FROM_CART } from '../actions/action-types/constActions';


const initState = {
    cartItems:[],
    total: 0

}

//function to create new cartItems and push them into the state array
const createCartItem = function(id, name, price) {
    return ({
        id: id,
        name: name,
        price: price,
        quantity: 0,
    })
}

const cartReducer= (state = initState, action) => {
    //MainPage Action Logic

    //if + button is clicked
    if(action.type === ADD_TO_CART) {
        //match a for sale item id with the clicked item id
        let cartItem = createCartItem(action.id, action.name, action.price)

        //check if the clicked item id exists in the cartItems
        console.log(action.id);
        let existedItem = state.cartItems.find(item => action.id === item.id)

        //if there is an item already in the cart with the clicked item id, just add 1 to that item's quantity, else add new clicked item to cart.
        if(existedItem) {
            console.log("existed item id = " + existedItem.id);
            existedItem.quantity += 1
            return {
                ...state,
                total: state.total + cartItem.price 
                }
        } else {
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

    //if - button is clicked
    if(action.type === SUBTRACT_FROM_CART) {  
        //match a sale item id with the clicked item id
        let addedItem = state.cartItems.find(item => item.id === action.id) 

        //if there is no added item match(meaning quantity is 0) then do nothing
        //else if there is 1 then remove that item from the cart
        //else finally if the quantity of the clicked item is more than 1 just remove 1 from it's quantity
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
    //if anything else happens, do nothing
    else {
        return state
    }

}

export default cartReducer;