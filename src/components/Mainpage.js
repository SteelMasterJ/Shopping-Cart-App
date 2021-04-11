import React, { Component } from 'react';
import { connect } from 'react-redux';


class MainPage extends Component {

    handleAdd = (id) => {
        // console.log(id);
        this.props.addToCart(id); 
    }

    handleSubtract = (id) => {
        // console.log(id);
        this.props.subtractFromCart(id); 
    }

    render() {
        // console.log(this.props.saleItems);

        let saleItemList = this.props.saleItems.map( item => {
            return (
                <tr>
                    <td className="bg-blue-200 border-2 border-collapse border-blue-500 text-center">{item.name}</td>
                    <td className="bg-blue-200 border-2 border-collapse border-blue-500 text-center">{item.type}</td>
                    <td className="bg-blue-200 border-2 border-collapse border-blue-500 text-center">{item.price}</td>
                    <td className="bg-blue-200 border-2 border-collapse border-blue-500">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-1 rounded" onClick={()=>{this.handleAdd(item.id)}}>+</button>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-1 rounded" onClick={()=>{this.handleSubtract(item.id)}}>-</button>
                    </td>
                </tr>
            )
        })

        return (
            <div className="pt-8 flex flex-col bg-blue-200 h-screen">
                <h1 className="mx-auto text-4xl text-purple-600 font-extrabold mb-8">Items Available Today</h1>
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
                        {saleItemList}
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

const mapStateToProps = (state) => {
    return {
        saleItems: state.saleItems
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         addToCart: (id) => {dispatch(addToCart(id))},
//         subtractFromCart: (id) => {dispatch(subtractFromCart(id))},
//     }
// }


export default connect(mapStateToProps)(MainPage)