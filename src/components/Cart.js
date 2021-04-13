import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class Cart extends Component{

    render() {
              
        let cartItems = this.props.items.length ?
            (  
                this.props.items.map(item => {
                    return(
                            <li className={`bg-white border-2 border-blue-500 rounded-xl px-8 py-6 mb-2 cursor-pointer shadow hover:shadow-xl transition duration-300 ease-in-out`} key={item.id}>
                                <div className="text-center">
                                    <h3 className="mb-3 text-xl font-semibold text-purple-600">{item.name}</h3>
                                    <p>Unit Price: ${parseFloat(item.price).toFixed(2)}</p> 
                                    <p>
                                        Quantity: {item.quantity} 
                                    </p>
                                    <p>Total Item Price: ${parseFloat(item.price * item.quantity).toFixed(2)}</p>
                                </div>        
                            </li>
                    )
                })
            ):

             (
                <div className="mx-auto">
                    <p className="text-1xl text-red-600 font-extrabold mb-8 text-center">Nothing In Cart</p>
                    <Link to="/"><button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 m-1 rounded">Continue Shopping</button></Link>
                </div>
             )
       return(
            <div className="pt-8 flex flex-col bg-gradient-to-b from-blue-300 via-purple-200 to-white h-screen">
                <h1 className="mx-auto text-4xl text-purple-600 font-semibold mb-8 italic tracking-tight">Your Cart</h1>
                {(this.props.total === 0) ? <div></div> : <Link to="/" className="mx-auto"><button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 m-1 rounded">Continue Shopping</button></Link>}
                <ul className={(this.props.total === 0) ? `grid grid-cols-1 gap-8 pt-16 mx-8` : `grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 mx-8`}>
                    {cartItems}
                </ul>
                <div>
                    <h2 className={`text-4xl font-bold text-gray-800 mt-8 text-center`}>{ (this.props.total === 0) ? "" : `Grand Total: $${parseFloat(this.props.total).toFixed(2)}` }</h2>   
                </div>  
            </div>
       )
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.cartItems,
        total: state.total
    }
}

export default connect(mapStateToProps)(Cart)