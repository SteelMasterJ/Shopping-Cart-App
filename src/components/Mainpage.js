import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToCart } from './actions/cartActions'
import { subtractFromCart } from './actions/cartActions'
import axios from 'axios';


class MainPage extends Component {

    constructor() {
        super();
        this.state = {
          forSaleItems: [],
          error: '',
          searchValue: '',
          searchedItems: '',
          showAllItems: true
        };
      }

    handleAdd = (id, name, price) => {
        // console.log(id);
        this.props.addToCart(id, name, price); 
    }

    handleSubtract = (id) => {
        // console.log(id);
        this.props.subtractFromCart(id); 
    }

    handleSearchSubmit = (e) => {
        e.preventDefault();
        let results = [];
        let query = this.state.searchValue;
        for (var i=0 ; i < this.state.forSaleItems.length ; i++) {
            if (this.state.forSaleItems[i].name.toString().toLowerCase() === query.toString().toLowerCase()) {
                results.push(this.state.forSaleItems[i]);
            }
        }
        let searchedItemList = results.map( item => {
            return (
                <tr key={item.id}>
                    <td className="bg-blue-200 border-2 border-collapse border-blue-500 text-center">{item.name}</td>
                    <td className="bg-blue-200 border-2 border-collapse border-blue-500 text-center">{item.type}</td>
                    <td className="bg-blue-200 border-2 border-collapse border-blue-500 text-center">{parseFloat(item.price).toFixed(2)}</td>
                    <td className="bg-blue-200 border-2 border-collapse border-blue-500">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-1 rounded" onClick={()=>{this.handleAdd(item.id, item.name, item.price)}}>+</button>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-1 rounded" onClick={()=>{this.handleSubtract(item.id)}}>-</button>
                    </td>
                </tr>
            )
        })
        console.log(results);
        this.setState({
            searchedItems: searchedItemList,
            showAllItems: false
        })
    }

    handleSearchValueChange = (evt) => {
        const event = evt.target;
        console.log("handle search change fired");
        this.setState({
            searchValue: event.value,
            showAllItems: true
        })
    }

    componentDidMount() {
        console.log("componentdidMount");
        // Simple GET request using axios, then setting the state
        //Since mocki is having issues here are the 2 urls for copy/paste: https://my-json-server.typicode.com/steelmasterj/myjsonserver/data
        //Since mocki is having issues here are the 2 urls for copy/paste: https://api.mocki.io/v1/b8bead03
        axios.get('https://my-json-server.typicode.com/steelmasterj/myjsonserver/data')
            .then(response => {
                console.log(response);
                this.setState({
                    forSaleItems: response.data,
                    error: ''
                })
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
                this.setState({
                    error: "error fetching data"
                })
            });
    }

    render() {
        // console.log(this.props.saleItems);

        let saleItemList = this.state.forSaleItems.map( item => {
            return (
                <tr key={item.id}>
                    <td className="bg-blue-200 border-2 border-collapse border-blue-500 text-center">{item.name}</td>
                    <td className="bg-blue-200 border-2 border-collapse border-blue-500 text-center">{item.type}</td>
                    <td className="bg-blue-200 border-2 border-collapse border-blue-500 text-center">{parseFloat(item.price).toFixed(2)}</td>
                    <td className="bg-blue-200 border-2 border-collapse border-blue-500">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-1 rounded" onClick={()=>{this.handleAdd(item.id, item.name, item.price)}}>+</button>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-1 rounded" onClick={()=>{this.handleSubtract(item.id)}}>-</button>
                    </td>
                </tr>
            )
        })

        let searchedItemShowList = this.state.searchedItems;

        return (
            <div className="pt-8 flex flex-col bg-blue-200 h-screen">
                <h1 className="mx-auto text-4xl text-purple-600 font-extrabold mb-8">Items Available Today</h1>
                <form 
                    onSubmit={this.handleSearchSubmit}
                >
                    <input 
                    className="h-8 w-64 mx-auto block my-4 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring"
                    type="search" 
                    name="search"
                    onChange={this.handleSearchValueChange}
                    placeholder="Search"
                    aria-label="Search"
                    required
                    />
                </form>
                {(this.state.error) ? <p className={`mx-auto text-red-500`}>Error Fetching data! :(</p> : <div></div>}
                {(this.state.showAllItems === false && !this.state.searchedItemList) ? <p className={`mx-auto text-red-500`}>No Results :( Try Searching Again</p> : <div></div>}
                <table className="table-fixed bg-blue-200 border-4 border-collapse border-blue-500 mx-4 flex-auto">
                    <thead>
                        <tr>
                        <th className="w-1/2 bg-blue-200 border-4 border-collapse border-blue-500">Name</th>
                        <th className="w-1/4 bg-blue-200 border-4 border-collapse border-blue-500">Category</th>
                        <th className="w-1/4 bg-blue-200 border-4 border-collapse border-blue-500">Price</th>
                        <th className="w-8 bg-blue-200 border-4 border-collapse border-blue-500">Add/Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(this.state.showAllItems) ? saleItemList : searchedItemShowList}
                        {/* <tr>
                            <td className="bg-blue-200 border-2 border-collapse border-blue-500 text-center">Intro to CSS</td>
                            <td className="bg-blue-200 border-2 border-collapse border-blue-500 text-center">Adam</td>
                            <td className="bg-blue-200 border-2 border-collapse border-blue-500 text-center">858</td>
                            <td className="bg-blue-200 border-2 border-collapse border-blue-500">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-1 rounded">+</button>
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-1 rounded">-</button>
                            </td>
                        </tr>
                        <tr className="bg-blue-200">
                            <td className="bg-blue-200 border-2 border-collapse border-blue-500 text-center">A Long and Winding Tour of the History of UI Frameworks and Tools and the Impact on Design</td>
                            <td className="bg-blue-200 border-2 border-collapse border-blue-500 text-center">Adam</td>
                            <td className="bg-blue-200 border-2 border-collapse border-blue-500 text-center">112</td>
                            <td className="bg-blue-200 border-2 border-collapse border-blue-500">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-1 rounded">+</button>
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-1 rounded">-</button>
                            </td>
                        </tr>
                        <tr>
                            <td className="bg-blue-200 border-2 border-collapse border-blue-500 text-center">Intro to JavaScript</td>
                            <td className="bg-blue-200 border-2 border-collapse border-blue-500 text-center">Chris</td>
                            <td className="bg-blue-200 border-2 border-collapse border-blue-500 text-center">1,280</td>
                            <td className="bg-blue-200 border-2 border-collapse border-blue-500">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-1 rounded">+</button>
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-1 rounded">-</button>
                            </td>
                        </tr> */}
                    </tbody>
                </table>
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (id, name, price) => {dispatch(addToCart(id, name, price))},
        subtractFromCart: (id) => {dispatch(subtractFromCart(id))},
    }
}


export default connect(null, mapDispatchToProps)(MainPage)