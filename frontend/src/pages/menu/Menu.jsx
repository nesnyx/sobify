import { CirclePlus, Trash2, ShoppingCart, X } from 'lucide-react';
import { useState } from 'react';

export default function Menu() {
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);

    const products = [
        { name: "Barobbo", category: "Food", price: 12.00, items: 64, sold: 8 },
        { name: "Burger", category: "Food", price: 8.00, items: 84, sold: 20 },
        { name: "Batagor", category: "Food", price: 6.00, items: 34, sold: 3 },
        { name: "Cireng", category: "Food", price: 12.00, items: 64, sold: 8 },
        { name: "Chicken", category: "Food", price: 16.00, items: 210, sold: 20 },
        { name: "Katsu", category: "Food", price: 2.00, items: 34, sold: 33 },
        { name: "Fish & Chips", category: "Food", price: 12.00, items: 64, sold: 8 },
        { name: "Gyoza", category: "Food", price: 29.00, items: 17, sold: 10 },
        { name: "Vegetable", category: "Food", price: 3.00, items: 102, sold: 54 },
        { name: "Kopi", category: "Drinks", price: 12.00, items: 54, sold: 43 },
        { name: "Cappucino", category: "Drink", price: 12.00, items: 120, sold: 50 },
        { name: "Creamy", category: "Drink", price: 30.00, items: 400, sold: 240 },
        { name: "Latte", category: "Drink", price: 34.00, items: 432, sold: 300 },
        { name: "Cola", category: "Drink", price: 6.00, items: 500, sold: 320 },
        { name: "Sprite", category: "Drink", price: 6.00, items: 500, sold: 320 },
    ];

    const addToCart = (product) => {
        const existingItem = cart.find(item => item.name === product.name);

        if (existingItem) {
            setCart(cart.map(item =>
                item.name === product.name
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    const removeFromCart = (productName) => {
        setCart(cart.filter(item => item.name !== productName));
    };

    const updateQuantity = (productName, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(productName);
        } else {
            setCart(cart.map(item =>
                item.name === productName
                    ? { ...item, quantity: newQuantity }
                    : item
            ));
        }
    };

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Menu Section */}
            <div className={`flex-1 overflow-y-auto p-6 ${showCart ? 'hidden md:block' : 'block'}`}>
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Menu</h1>
                    <p className="text-gray-500">Pilih produk yang ingin ditambahkan ke cart</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map((product, index) => (
                        <div key={index} className="flex flex-col rounded-xl bg-white shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                                    <span className="inline-block px-2 py-0.5 text-xs font-medium bg-blue-50 text-blue-700 rounded-full mt-1">
                                        {product.category}
                                    </span>
                                </div>
                                <button
                                    onClick={() => addToCart(product)}
                                    className="text-gray-400 hover:text-blue-600 focus:outline-none cursor-pointer transition-colors"
                                >
                                    <CirclePlus size={24} />
                                </button>
                            </div>

                            <div className="text-2xl font-bold text-indigo-600 mb-2">${product.price.toFixed(2)}</div>

                            <div className="mt-auto pt-2 border-t border-gray-200">
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>Stock: {product.items}</span>
                                    <span>Terjual: {product.sold}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Cart Button (Mobile) */}
            <button
                onClick={() => setShowCart(!showCart)}
                className="md:hidden fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
            >
                <ShoppingCart size={24} />
                {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                        {totalItems}
                    </span>
                )}
            </button>

            {/* Cart Section */}
            <div className={`w-full md:w-96 bg-white border-l border-gray-200 flex flex-col ${showCart ? 'flex' : 'hidden md:flex'}`}>
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <ShoppingCart size={20} />
                        Cart
                    </h2>
                    <button
                        onClick={() => setShowCart(false)}
                        className="md:hidden text-gray-400 hover:text-gray-600"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    {cart.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                            <ShoppingCart size={48} />
                            <p className="mt-4">Cart kosong</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {cart.map((item, index) => (
                                <div key={index} className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h4 className="font-semibold text-gray-800">{item.name}</h4>
                                            <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.name)}
                                            className="text-red-400 hover:text-red-600 transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => updateQuantity(item.name, item.quantity - 1)}
                                            className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                                        >
                                            −
                                        </button>
                                        <span className="flex-1 text-center font-semibold">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.name, item.quantity + 1)}
                                            className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>

                                    <div className="mt-3 text-right font-bold text-indigo-600">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="p-6 border-t border-gray-200 bg-gray-50">
                        <div className="space-y-3 mb-4">
                            <div className="flex justify-between text-gray-600">
                                <span>Jumlah Item:</span>
                                <span className="font-semibold">{totalItems}</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold text-gray-800 pb-3 border-b border-gray-200">
                                <span>Total:</span>
                                <span className="text-indigo-600">${totalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                        <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}