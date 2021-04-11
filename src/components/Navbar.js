
import React from 'react';

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between flex-wrap bg-gradient-to-r from-purple-500 via-purple-600 to-blue-500 p-6">
            <div className="flex items-center flex-no-shrink text-white mr-6">
                <svg className="mr-2" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M13.5 18c-.828 0-1.5.672-1.5 1.5 0 .829.672 1.5 1.5 1.5s1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm-3.5 1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm13.257-14.5h-1.929l-3.473 12h-13.239l-4.616-11h2.169l3.776 9h10.428l3.432-12h4.195l-.743 2zm-13.537 4.183l-2.325-2.183-1.395 1.435 3.746 3.565 6.559-6.592-1.422-1.408-5.163 5.183z"/></svg>
                <span className="font-semibold text-xl tracking-tight">Shopping Cart</span>
            </div>
            <div className="w-full block flex-end lg:flex lg:items-center lg:w-auto">
                <div className="text-md lg:flex-grow">
                    <a href="/" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-200 mr-4">
                        Shop
                    </a>
                    <a href="cart" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-200 mr-4">
                        My Cart
                    </a>
                </div>
            </div>
        </nav>
    )
}


export default Navbar;