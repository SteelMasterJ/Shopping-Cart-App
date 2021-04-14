import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToCart } from './actions/cartActions'
import { subtractFromCart } from './actions/cartActions'
import { Link } from 'react-router-dom';
import axios from 'axios';


class MainPage extends Component {

    constructor() {
        super();
        this.state = {
          forSaleItems: [],
          error: '',
          searchValue: '',
          searchedItems: '',
          showAllItems: true,
          matchFound: false,
          loading: true
        };
      }


    //Function to handle adding items to the cart when the + button is clicked  
    handleAdd = (id, name, price) => {
        // console.log(id);
        this.props.addToCart(id, name, price); 
    }

    //Function to handle subtracting items from the cart when the - is clicked
    handleSubtract = (id) => {
        // console.log(id);
        this.props.subtractFromCart(id); 
    }

    //function to handle when the search bar is submitted, 
    //this function prevents the page from reloading then will 
    //hide items if their name doesnt exactly match the search string.
    handleSearchSubmit = (e) => {
        e.preventDefault();
        let results = [];
        let query = this.state.searchValue;
        let searchedItemList;
        for (let i=0 ; i < this.state.forSaleItems.length ; i++) {
            if (this.state.forSaleItems[i].name.toString().toLowerCase().includes(query.toString().toLowerCase())) {
                results.push(this.state.forSaleItems[i]);
            }
        }
        if (results.length > 0) {
            searchedItemList = results.map( item => {
                return (
                    <li className={`bg-white border-2 border-blue-500 rounded-xl px-8 py-6 mb-2 cursor-pointer shadow hover:shadow-xl transition duration-300 ease-in-out`} key={item.id}>
                        <div className="text-center">
                            <h3 className="mb-3 text-xl font-semibold text-purple-600">{item.name}</h3>
                            <p>Unit Price: ${parseFloat(item.price).toFixed(2)}</p> 
                            <p>
                                Category: {item.type} 
                            </p>
                            <div className="flex justify-center">
                            <button className="bg-purple-700 hover:bg-purple-900 shadow hover:shadow-xl text-white font-bold py-2 px-4 my-2 mx-3 rounded border-2 border-blue-500" onClick={()=>{this.handleAdd(item.id, item.name, item.price)}}>+</button>
                            <button className="bg-purple-600 hover:bg-purple-900 shadow hover:shadow-xl text-white font-bold py-2 px-4 my-2 mx-3 rounded border-2 border-blue-400" onClick={()=>{this.handleSubtract(item.id)}}>-</button>
                            </div>
                        </div>        
                    </li>
                )
            })
        }
        // console.log("search fired, results: " + this.state.searchedItems);
        this.setState({
            searchedItems: searchedItemList,
            showAllItems: false
        })

    }

    //function that resets the dropdown when searchvalues are entered to prevent confusing UI
    resetDropdown = () => {    
        let dropdownElement = document.getElementsByTagName("select")[0];
        // console.log("resetdrropdown fired: " + dropdownElement.value);
        dropdownElement.value = "Select Category";
    }

    //function that resets the search input field when the dropdown is changed prevent confusing UI
    resetSearch = () => {
        let searchElement = document.getElementsByTagName("input")[0];
        // console.log(searchElement);
        searchElement.value = "";
    }

    //function that adjusts the search value, updates the state to show all items, and triggers resetDropdown
    handleSearchValueChange = (evt) => {
        const event = evt.target;
        // console.log("handle search change fired");
        this.resetDropdown();
        this.setState({
            searchValue: event.value,
            showAllItems: true
        })
    }

    //function that adjusts the search value, updates the state to show items in that category or
    //show all items, and triggers resetSearch
    handleDropdownValueChange = (evt) => {
        const event = evt.target;
        this.resetSearch();
        // console.log(event.value);
        if (event.value === "Select Category") {
            this.setState ({
                showAllItems: true
            })
        } else {
            let results = [];
            let query = event.value;
            let searchedItemList;
            for (let i=0 ; i < this.state.forSaleItems.length ; i++) {
                if (this.state.forSaleItems[i].type.toString().toLowerCase() === query.toString().toLowerCase()) {
                    results.push(this.state.forSaleItems[i]);
                }
            }
            if (results.length > 0) {
                searchedItemList = results.map( item => {
                    return (
                        <li className={`bg-white border-2 border-blue-500 rounded-xl px-8 py-6 mb-2 cursor-pointer shadow hover:shadow-xl transition duration-300 ease-in-out`} key={item.id}>
                            <div className="text-center">
                                <h3 className="mb-3 text-xl font-semibold text-purple-600">{item.name}</h3>
                                <p>Unit Price: ${parseFloat(item.price).toFixed(2)}</p> 
                                <p>
                                    Category: {item.type} 
                                </p>
                                <div className="flex justify-center">
                                <button className="bg-purple-700 hover:bg-purple-900 shadow hover:shadow-xl text-white font-bold py-2 px-4 my-2 mx-3 rounded border-2 border-blue-500" onClick={()=>{this.handleAdd(item.id, item.name, item.price)}}>+</button>
                            <button className="bg-purple-600 hover:bg-purple-900 shadow hover:shadow-xl text-white font-bold py-2 px-4 my-2 mx-3 rounded border-2 border-blue-400" onClick={()=>{this.handleSubtract(item.id)}}>-</button>
                                </div>
                            </div>        
                        </li>
                    )
                })
            }
            this.setState({
                searchedItems: searchedItemList,
                showAllItems: false
            })
        }
    }

    //fires on page load to ensure items are up to date.
    componentDidMount() {
        // Simple GET request using axios, then setting the state
        //Since mocki is having issues here is the myJSONserver link: https://my-json-server.typicode.com/steelmasterj/myjsonserver/data
        //Since mocki is having issues here is the original mocki link: https://api.mocki.io/v1/b8bead03
        axios.get('https://my-json-server.typicode.com/steelmasterj/myjsonserver/data')
            .then(response => {
                // console.log(response);
                this.setState({
                    forSaleItems: response.data,
                    error: '',
                    loading: false
                })
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
                this.setState({
                    error: "error fetching data",
                    loading: false
                })
            });
    }

    render() {
        // console.log(this.props.saleItems);

        //variable used to create table rows for each item returned from the API
        let saleItemList = this.state.forSaleItems.map( item => {
            return (
                <li className={`bg-white border-2 border-blue-500 rounded-xl px-8 py-6 mb-2 cursor-pointer shadow hover:shadow-xl transition duration-300 ease-in-out`} key={item.id}>
                    <div className="text-center">
                        <h3 className="mb-3 text-xl font-semibold text-purple-600">{item.name}</h3>
                        <p>Unit Price: ${parseFloat(item.price).toFixed(2)}</p> 
                        <p>
                            Category: {item.type} 
                        </p>
                        <div className="flex justify-center">
                            <button className="bg-purple-700 hover:bg-purple-900 shadow hover:shadow-xl text-white font-bold py-2 px-4 my-2 mx-3 rounded border-2 border-blue-500" onClick={()=>{this.handleAdd(item.id, item.name, item.price)}}>+</button>
                            <button className="bg-purple-600 hover:bg-purple-900 shadow hover:shadow-xl text-white font-bold py-2 px-4 my-2 mx-3 rounded border-2 border-blue-400" onClick={()=>{this.handleSubtract(item.id)}}>-</button>
                        </div>
                    </div>        
                </li>
            )
        })

        //variable that is used to hold values of items that fit search or dropdown filters
        let searchedItemShowList = this.state.searchedItems;

        return (
            <div className="pt-8 flex flex-col bg-gradient-to-b from-blue-300 via-purple-200 to-white h-screen">
                <h1 className="mx-auto text-4xl text-purple-600 font-semibold mb-8 italic tracking-tight">Items Available Today</h1>
                {(this.props.total > 0) ? 
                    <p className={`mx-auto text-purple-600 text-2xl`}>Current Grand Total: ${parseFloat(this.props.total).toFixed(2)}</p>
                     : 
                    <div></div>
                }
                {(this.props.total > 0) ? 
                    <Link to="/cart" className="mx-auto"><button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 m-1 rounded">Go To Your Cart</button></Link>
                     : 
                    <div></div>
                }
                {((this.state.showAllItems === false) && (!this.state.searchedItems)) ? <p className={`mx-auto text-red-500`}>No Results :( Try Searching Again</p> : <div></div>}
                <div className="flex sm:flex-row flex-col gap-6">
                    <div className="mx-auto sm:ml-auto">
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
                    </div>
                    <div className="mx-auto sm:mr-auto">
                        <form>
                            <div className="text-center">
                                <select
                                    className="h-8 w-64 mx-auto my-4 rounded border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 shadow"
                                    name="meet-time" 
                                    id="meet-time"
                                    onChange={this.handleDropdownValueChange}
                                >
                                    <option value="Select Category">Select Category</option>
                                    <option value="Bakery">Bakery</option>
                                    <option value="Dairy">Dairy</option>
                                    <option value="Fruit">Fruit</option>
                                    <option value="Meat">Meat</option>
                                    <option value="Vegan">Vegan</option>
                                    <option value="Vegetable">Vegetable</option>
                                </select>
                            </div>
                        </form>
                    </div>
                </div>
                {(this.state.error) ? <p className={`mx-auto text-red-500`}>Error Fetching data! :(</p> : <div></div>}
                {(this.state.loading === false) ?                 
                    <ul className={`grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 mx-8`}>
                        {(this.state.showAllItems) ? saleItemList : searchedItemShowList}
                    </ul> :
                    <p className="mx-auto">Loading items...</p>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        total: state.total
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (id, name, price) => {dispatch(addToCart(id, name, price))},
        subtractFromCart: (id) => {dispatch(subtractFromCart(id))},
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MainPage)